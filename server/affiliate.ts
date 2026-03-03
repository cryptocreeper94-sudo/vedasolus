import crypto from "crypto";
import { db } from "./db";
import { users, affiliateReferrals, affiliateCommissions } from "@shared/schema";
import { eq, and, sql, count, desc } from "drizzle-orm";
import { createTrustStamp } from "./hallmark";

const COMMISSION_TIERS = [
  { name: "diamond", minReferrals: 50, rate: 0.20 },
  { name: "platinum", minReferrals: 30, rate: 0.175 },
  { name: "gold", minReferrals: 15, rate: 0.15 },
  { name: "silver", minReferrals: 5, rate: 0.125 },
  { name: "base", minReferrals: 0, rate: 0.10 },
];

export function generateUniqueHash(): string {
  return crypto.randomBytes(12).toString("hex");
}

export async function ensureUserHash(userId: string): Promise<string> {
  const [user] = await db.select().from(users).where(eq(users.id, userId));
  if (!user) throw new Error("User not found");

  if (user.uniqueHash) return user.uniqueHash;

  const hash = generateUniqueHash();
  await db.update(users).set({ uniqueHash: hash }).where(eq(users.id, userId));
  return hash;
}

async function getConvertedCount(userId: string): Promise<number> {
  const [result] = await db
    .select({ count: count() })
    .from(affiliateReferrals)
    .where(
      and(
        eq(affiliateReferrals.referrerId, userId),
        eq(affiliateReferrals.status, "converted")
      )
    );
  return result?.count || 0;
}

export function getTierForCount(converted: number): { name: string; rate: number } {
  for (const tier of COMMISSION_TIERS) {
    if (converted >= tier.minReferrals) return tier;
  }
  return COMMISSION_TIERS[COMMISSION_TIERS.length - 1];
}

function getNextTier(currentTierName: string): { name: string; minReferrals: number; rate: number } | null {
  const idx = COMMISSION_TIERS.findIndex((t) => t.name === currentTierName);
  if (idx <= 0) return null;
  return COMMISSION_TIERS[idx - 1];
}

export async function getAffiliateDashboard(userId: string) {
  const uniqueHash = await ensureUserHash(userId);
  const convertedCount = await getConvertedCount(userId);
  const tier = getTierForCount(convertedCount);
  const nextTier = getNextTier(tier.name);

  const referrals = await db
    .select()
    .from(affiliateReferrals)
    .where(eq(affiliateReferrals.referrerId, userId))
    .orderBy(desc(affiliateReferrals.createdAt))
    .limit(50);

  const commissions = await db
    .select()
    .from(affiliateCommissions)
    .where(eq(affiliateCommissions.referrerId, userId))
    .orderBy(desc(affiliateCommissions.createdAt))
    .limit(50);

  const totalReferrals = referrals.length;
  const pendingReferrals = referrals.filter((r) => r.status === "pending").length;

  const pendingEarnings = commissions
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + parseFloat(c.amount), 0);

  const paidEarnings = commissions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + parseFloat(c.amount), 0);

  return {
    uniqueHash,
    referralLink: `https://vedasolus.tlid.io/ref/${uniqueHash}`,
    tier: tier.name,
    tierRate: tier.rate,
    nextTier: nextTier
      ? { name: nextTier.name, referralsNeeded: nextTier.minReferrals - convertedCount }
      : null,
    stats: {
      totalReferrals,
      convertedReferrals: convertedCount,
      pendingReferrals,
      pendingEarnings: pendingEarnings.toFixed(2),
      paidEarnings: paidEarnings.toFixed(2),
    },
    referrals,
    commissions,
    tiers: COMMISSION_TIERS.map((t) => ({
      ...t,
      active: t.name === tier.name,
    })),
  };
}

export async function getAffiliateLink(userId: string) {
  const uniqueHash = await ensureUserHash(userId);
  return {
    uniqueHash,
    links: {
      vedasolus: `https://vedasolus.tlid.io/ref/${uniqueHash}`,
      trusthub: `https://trusthub.tlid.io/ref/${uniqueHash}`,
      trustvault: `https://trustvault.tlid.io/ref/${uniqueHash}`,
      thevoid: `https://thevoid.tlid.io/ref/${uniqueHash}`,
    },
  };
}

export async function trackReferral(referralHash: string, platform: string = "vedasolus") {
  const [referrer] = await db
    .select()
    .from(users)
    .where(eq(users.uniqueHash, referralHash));

  if (!referrer) {
    return { tracked: false, error: "Invalid referral hash" };
  }

  const [referral] = await db
    .insert(affiliateReferrals)
    .values({
      referrerId: referrer.id,
      referralHash,
      platform,
      status: "pending",
    })
    .returning();

  return { tracked: true, referralId: referral.id };
}

export async function convertReferral(referredUserId: string, referralHash: string) {
  const [referral] = await db
    .select()
    .from(affiliateReferrals)
    .where(
      and(
        eq(affiliateReferrals.referralHash, referralHash),
        eq(affiliateReferrals.status, "pending")
      )
    )
    .orderBy(desc(affiliateReferrals.createdAt))
    .limit(1);

  if (!referral) return null;

  const [updated] = await db
    .update(affiliateReferrals)
    .set({
      referredUserId,
      status: "converted",
      convertedAt: new Date(),
    })
    .where(eq(affiliateReferrals.id, referral.id))
    .returning();

  await createTrustStamp({
    userId: referral.referrerId,
    category: "affiliate-referral-converted",
    data: {
      referralId: referral.id,
      referredUserId,
      platform: referral.platform,
    },
  });

  return updated;
}

export async function requestPayout(userId: string) {
  const pendingCommissions = await db
    .select()
    .from(affiliateCommissions)
    .where(
      and(
        eq(affiliateCommissions.referrerId, userId),
        eq(affiliateCommissions.status, "pending")
      )
    );

  const totalAmount = pendingCommissions.reduce(
    (sum, c) => sum + parseFloat(c.amount),
    0
  );

  if (totalAmount < 10) {
    return { success: false, error: "Minimum payout is 10 SIG" };
  }

  for (const commission of pendingCommissions) {
    await db
      .update(affiliateCommissions)
      .set({ status: "processing" })
      .where(eq(affiliateCommissions.id, commission.id));
  }

  await createTrustStamp({
    userId,
    category: "affiliate-payout-request",
    data: {
      amount: totalAmount.toFixed(2),
      currency: "SIG",
      commissionsCount: pendingCommissions.length,
    },
  });

  return {
    success: true,
    amount: totalAmount.toFixed(2),
    currency: "SIG",
    commissionsCount: pendingCommissions.length,
  };
}

export async function createCommissionForPurchase(userId: string, purchaseAmount: number) {
  const referrals = await db
    .select()
    .from(affiliateReferrals)
    .where(
      and(
        eq(affiliateReferrals.referredUserId, userId),
        eq(affiliateReferrals.status, "converted")
      )
    )
    .limit(1);

  if (referrals.length === 0) return null;

  const referral = referrals[0];
  const convertedCount = await getConvertedCount(referral.referrerId);
  const tier = getTierForCount(convertedCount);
  const commissionAmount = (purchaseAmount * tier.rate).toFixed(2);

  const [commission] = await db
    .insert(affiliateCommissions)
    .values({
      referrerId: referral.referrerId,
      referralId: referral.id,
      amount: commissionAmount,
      currency: "SIG",
      tier: tier.name,
      status: "pending",
    })
    .returning();

  await createTrustStamp({
    userId: referral.referrerId,
    category: "purchase",
    data: {
      referralId: referral.id,
      commissionAmount,
      tier: tier.name,
      purchaseAmount,
    },
  });

  return commission;
}

export { COMMISSION_TIERS };

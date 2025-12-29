import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface FreeTier {
  name: string;
  price: number;
  features: string[];
}

interface PaidTier {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyPriceId: string | null;
  yearlyPriceId: string | null;
  features: string[];
}

export const SUBSCRIPTION_TIERS: {
  seeker: FreeTier;
  practitioner_path: PaidTier;
  healers_circle: PaidTier;
  masters_journey: PaidTier;
} = {
  seeker: {
    name: 'Seeker',
    price: 0,
    features: [
      'Basic health tracking (limited)',
      'Dosha quiz & basic profile',
      '3 meditation sessions',
      'Community access (read-only)',
    ],
  },
  practitioner_path: {
    name: 'Practitioner Path',
    monthlyPrice: 999,
    yearlyPrice: 7999,
    monthlyPriceId: process.env.STRIPE_PRACTITIONER_MONTHLY_PRICE_ID || null,
    yearlyPriceId: process.env.STRIPE_PRACTITIONER_YEARLY_PRICE_ID || null,
    features: [
      'Unlimited health tracking',
      'Full meditation library',
      'Personalized daily insights',
      'Streak tracking & achievements',
      'Community participation',
      'Health records storage (5 files)',
    ],
  },
  healers_circle: {
    name: "Healer's Circle",
    monthlyPrice: 1999,
    yearlyPrice: 14999,
    monthlyPriceId: process.env.STRIPE_HEALERS_MONTHLY_PRICE_ID || null,
    yearlyPriceId: process.env.STRIPE_HEALERS_YEARLY_PRICE_ID || null,
    features: [
      'Everything in Practitioner Path',
      'Practitioner marketplace access',
      '1 free consultation/month',
      'Priority booking',
      'Unlimited messaging',
      'Blockchain-verified health records',
      'AI health recommendations',
    ],
  },
  masters_journey: {
    name: "Master's Journey",
    monthlyPrice: 3999,
    yearlyPrice: 29999,
    monthlyPriceId: process.env.STRIPE_MASTERS_MONTHLY_PRICE_ID || null,
    yearlyPriceId: process.env.STRIPE_MASTERS_YEARLY_PRICE_ID || null,
    features: [
      "Everything in Healer's Circle",
      'Unlimited practitioner consultations',
      'Personal wellness coach',
      'Custom program creation',
      'Priority support',
      'Early access to features',
      'Family sharing (up to 5)',
    ],
  },
};

type PaidTierKey = 'practitioner_path' | 'healers_circle' | 'masters_journey';

export async function createCheckoutSession(
  userId: string,
  tier: PaidTierKey,
  billingCycle: 'monthly' | 'yearly',
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  const tierConfig = SUBSCRIPTION_TIERS[tier];

  const priceId = billingCycle === 'monthly' 
    ? tierConfig.monthlyPriceId 
    : tierConfig.yearlyPriceId;

  if (!priceId) {
    const unitAmount = billingCycle === 'monthly' 
      ? tierConfig.monthlyPrice 
      : tierConfig.yearlyPrice;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      metadata: { userId, tier, billingCycle },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `VedaSolus ${tierConfig.name}`,
              description: tierConfig.features.slice(0, 3).join(', '),
            },
            unit_amount: unitAmount,
            recurring: {
              interval: billingCycle === 'monthly' ? 'month' : 'year',
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session.url!;
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    metadata: { userId, tier, billingCycle },
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session.url!;
}

export async function createPractitionerPayment(
  userId: string,
  practitionerId: string,
  amount: number,
  description: string,
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    metadata: { userId, practitionerId, type: 'consultation' },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Practitioner Consultation',
            description,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session.url!;
}

export async function getCustomerPortalUrl(customerId: string, returnUrl: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session.url;
}

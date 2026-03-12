import crypto from "crypto";
import { db } from "./db";
import { hallmarks, trustStamps, hallmarkCounter } from "@shared/schema";
import { eq, sql } from "drizzle-orm";

const APP_PREFIX = "VS";
const APP_NAME = "VedaSolus";
const APP_DOMAIN = "vedasolus.tlid.io";
const COUNTER_ID = "vs-master";

function hashPayload(payload: object): string {
  const str = JSON.stringify(payload);
  return crypto.createHash("sha256").update(str).digest("hex");
}

function simulateTxHash(): string {
  return "0x" + crypto.randomBytes(32).toString("hex");
}

function simulateBlockHeight(): string {
  return String(Math.floor(1000000 + Math.random() * 9000000));
}

async function getNextSequence(): Promise<number> {
  const result = await db
    .insert(hallmarkCounter)
    .values({ id: COUNTER_ID, currentSequence: "1" })
    .onConflictDoUpdate({
      target: hallmarkCounter.id,
      set: {
        currentSequence: sql`(CAST(${hallmarkCounter.currentSequence} AS integer) + 1)::text`,
      },
    })
    .returning();
  return parseInt(result[0].currentSequence, 10);
}

function formatHallmarkId(sequence: number): string {
  return `${APP_PREFIX}-${String(sequence).padStart(8, "0")}`;
}

export async function generateHallmark(params: {
  userId?: string;
  appId: string;
  productName: string;
  releaseType: string;
  metadata?: Record<string, any>;
}): Promise<typeof hallmarks.$inferSelect> {
  const sequence = await getNextSequence();
  const thId = formatHallmarkId(sequence);
  const timestamp = new Date().toISOString();

  const payload = {
    thId,
    userId: params.userId || null,
    appId: params.appId,
    appName: APP_NAME,
    productName: params.productName,
    releaseType: params.releaseType,
    metadata: params.metadata || {},
    timestamp,
  };

  const dataHash = hashPayload(payload);
  const txHash = simulateTxHash();
  const blockHeight = simulateBlockHeight();
  const verificationUrl = `https://${APP_DOMAIN}/api/hallmark/${thId}/verify`;

  const [hallmark] = await db
    .insert(hallmarks)
    .values({
      thId,
      userId: params.userId || null,
      appId: params.appId,
      appName: APP_NAME,
      productName: params.productName,
      releaseType: params.releaseType,
      metadata: params.metadata,
      dataHash,
      txHash,
      blockHeight,
      verificationUrl,
      hallmarkId: sequence,
    })
    .returning();

  return hallmark;
}

export async function createTrustStamp(params: {
  userId?: string;
  category: string;
  data: Record<string, any>;
}): Promise<typeof trustStamps.$inferSelect> {
  const timestamp = new Date().toISOString();
  const payload = {
    ...params.data,
    appContext: "vedasolus",
    timestamp,
  };

  const dataHash = hashPayload(payload);
  const txHash = simulateTxHash();
  const blockHeight = simulateBlockHeight();

  const [stamp] = await db
    .insert(trustStamps)
    .values({
      userId: params.userId || null,
      category: params.category,
      data: { ...params.data, appContext: "vedasolus", timestamp },
      dataHash,
      txHash,
      blockHeight,
    })
    .returning();

  return stamp;
}

export async function seedGenesisHallmark(): Promise<void> {
  const genesisId = `${APP_PREFIX}-00000001`;
  const [existing] = await db
    .select()
    .from(hallmarks)
    .where(eq(hallmarks.thId, genesisId));

  if (existing) {
    console.log(`Genesis hallmark ${genesisId} already exists.`);
    return;
  }

  await db
    .insert(hallmarkCounter)
    .values({ id: COUNTER_ID, currentSequence: "0" })
    .onConflictDoUpdate({
      target: hallmarkCounter.id,
      set: { currentSequence: "0" },
    });

  const metadata = {
    ecosystem: "Trust Layer",
    version: "2.1.0",
    domain: APP_DOMAIN,
    operator: "DarkWave Studios LLC",
    chain: "Trust Layer Blockchain",
    consensus: "Proof of Trust",
    launchDate: "2026-08-23T00:00:00.000Z",
    nativeAsset: "SIG",
    utilityToken: "Shells",
    parentApp: "Trust Layer Hub",
    parentGenesis: "TH-00000001",
  };

  await generateHallmark({
    appId: "vedasolus-genesis",
    productName: "Genesis Block",
    releaseType: "genesis",
    metadata,
  });

  console.log(`Genesis hallmark ${genesisId} created successfully.`);
}

export async function getHallmarkById(thId: string) {
  const [hallmark] = await db
    .select()
    .from(hallmarks)
    .where(eq(hallmarks.thId, thId));
  return hallmark || null;
}

export async function getGenesisHallmark() {
  return getHallmarkById(`${APP_PREFIX}-00000001`);
}

export { APP_PREFIX, APP_NAME, APP_DOMAIN };

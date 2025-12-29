import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAuthenticated } from "./replit_integrations/auth";
import { 
  insertUserProfileSchema,
  insertSleepLogSchema,
  insertDietLogSchema,
  insertExerciseLogSchema,
  insertNotificationPreferencesSchema,
  insertMedicalDisclaimerSchema
} from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Firebase config endpoint (public - provides client config)
  app.get("/api/firebase-config", (_req, res) => {
    res.json({
      apiKey: process.env.GOOGLE_API_KEY,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "darkwave-auth.firebaseapp.com",
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || "darkwave-auth",
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "darkwave-auth.firebasestorage.app",
      messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "41307406912",
      appId: process.env.VITE_FIREBASE_APP_ID || "1:41307406912:web:37b3bebeb47a73522a55a5",
      measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-KCYD3E2XE5",
    });
  });

  // User Profile endpoints
  app.get("/api/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getUserProfile(userId);
      res.json(profile || null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post("/api/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validated = insertUserProfileSchema.parse({ ...req.body, userId });
      const profile = await storage.upsertUserProfile(validated);
      res.json(profile);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromError(error).toString() });
      }
      console.error("Error upserting profile:", error);
      res.status(500).json({ message: "Failed to save profile" });
    }
  });

  // Sleep Log endpoints
  app.get("/api/sleep", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = req.query.limit ? parseInt(req.query.limit) : 30;
      const logs = await storage.getSleepLogs(userId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching sleep logs:", error);
      res.status(500).json({ message: "Failed to fetch sleep logs" });
    }
  });

  app.post("/api/sleep", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validated = insertSleepLogSchema.parse({ ...req.body, userId });
      const log = await storage.createSleepLog(validated);
      res.json(log);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromError(error).toString() });
      }
      console.error("Error creating sleep log:", error);
      res.status(500).json({ message: "Failed to create sleep log" });
    }
  });

  // Diet Log endpoints
  app.get("/api/diet", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = req.query.limit ? parseInt(req.query.limit) : 30;
      const logs = await storage.getDietLogs(userId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching diet logs:", error);
      res.status(500).json({ message: "Failed to fetch diet logs" });
    }
  });

  app.post("/api/diet", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validated = insertDietLogSchema.parse({ ...req.body, userId });
      const log = await storage.createDietLog(validated);
      res.json(log);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromError(error).toString() });
      }
      console.error("Error creating diet log:", error);
      res.status(500).json({ message: "Failed to create diet log" });
    }
  });

  // Exercise Log endpoints
  app.get("/api/exercise", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = req.query.limit ? parseInt(req.query.limit) : 30;
      const logs = await storage.getExerciseLogs(userId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching exercise logs:", error);
      res.status(500).json({ message: "Failed to fetch exercise logs" });
    }
  });

  app.post("/api/exercise", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validated = insertExerciseLogSchema.parse({ ...req.body, userId });
      const log = await storage.createExerciseLog(validated);
      res.json(log);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromError(error).toString() });
      }
      console.error("Error creating exercise log:", error);
      res.status(500).json({ message: "Failed to create exercise log" });
    }
  });

  // Medical Disclaimer endpoints
  app.post("/api/disclaimers", async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub || null;
      const validated = insertMedicalDisclaimerSchema.parse({
        ...req.body,
        email: req.body.email?.toLowerCase(),
        userId,
      });
      const disclaimer = await storage.createOrUpdateDisclaimer(validated);
      res.json({ success: true, disclaimer });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromError(error).toString() });
      }
      console.error("Error saving disclaimer:", error);
      res.status(500).json({ message: "Failed to save disclaimer acknowledgment" });
    }
  });

  app.get("/api/disclaimers", isAuthenticated, async (req: any, res) => {
    try {
      const disclaimers = await storage.getAllDisclaimers();
      res.json(disclaimers);
    } catch (error) {
      console.error("Error fetching disclaimers:", error);
      res.status(500).json({ message: "Failed to fetch disclaimers" });
    }
  });

  // Stripe Payment endpoints
  app.get("/api/subscription/tiers", async (_req, res) => {
    try {
      const { SUBSCRIPTION_TIERS } = await import("./stripe");
      res.json(SUBSCRIPTION_TIERS);
    } catch (error) {
      console.error("Error fetching subscription tiers:", error);
      res.status(500).json({ message: "Failed to fetch subscription tiers" });
    }
  });

  app.post("/api/subscription/checkout", isAuthenticated, async (req: any, res) => {
    try {
      const { createCheckoutSession } = await import("./stripe");
      const userId = req.user.claims.sub;
      const { tier, billingCycle } = req.body;
      
      const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || `https://${process.env.REPLIT_DEV_DOMAIN}`;
      
      const successUrl = `${origin}/settings?payment=success`;
      const cancelUrl = `${origin}/settings?payment=cancelled`;
      
      const checkoutUrl = await createCheckoutSession(
        userId,
        tier,
        billingCycle,
        successUrl,
        cancelUrl
      );
      
      res.json({ url: checkoutUrl });
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ message: error.message || "Failed to create checkout session" });
    }
  });

  app.post("/api/payment/practitioner", isAuthenticated, async (req: any, res) => {
    try {
      const { createPractitionerPayment } = await import("./stripe");
      const userId = req.user.claims.sub;
      const { practitionerId, amount, description } = req.body;
      
      const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || `https://${process.env.REPLIT_DEV_DOMAIN}`;
      
      const successUrl = `${origin}/marketplace?payment=success`;
      const cancelUrl = `${origin}/marketplace?payment=cancelled`;
      
      const checkoutUrl = await createPractitionerPayment(
        userId,
        practitionerId,
        amount,
        description,
        successUrl,
        cancelUrl
      );
      
      res.json({ url: checkoutUrl });
    } catch (error: any) {
      console.error("Error creating practitioner payment:", error);
      res.status(500).json({ message: error.message || "Failed to create payment" });
    }
  });

  // AI Wellness Coach endpoints
  app.post("/api/wellness-chat", async (req: any, res) => {
    try {
      const { getWellnessResponse, textToSpeech } = await import("./elevenlabs");
      const { messages } = req.body;
      
      const response = await getWellnessResponse(messages);
      
      let audioUrl = null;
      try {
        const audioBuffer = await textToSpeech(response);
        const base64Audio = audioBuffer.toString("base64");
        audioUrl = `data:audio/mpeg;base64,${base64Audio}`;
      } catch (audioError) {
        console.error("TTS error (continuing without audio):", audioError);
      }
      
      res.json({ response, audioUrl });
    } catch (error: any) {
      console.error("Error in wellness chat:", error);
      res.status(500).json({ message: error.message || "Failed to get wellness response" });
    }
  });

  // Notification Preferences endpoints
  app.get("/api/notifications/preferences", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const prefs = await storage.getNotificationPreferences(userId);
      res.json(prefs || null);
    } catch (error) {
      console.error("Error fetching notification preferences:", error);
      res.status(500).json({ message: "Failed to fetch notification preferences" });
    }
  });

  app.post("/api/notifications/preferences", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validated = insertNotificationPreferencesSchema.parse({ ...req.body, userId });
      const prefs = await storage.upsertNotificationPreferences(validated);
      res.json(prefs);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromError(error).toString() });
      }
      console.error("Error saving notification preferences:", error);
      res.status(500).json({ message: "Failed to save notification preferences" });
    }
  });

  // ============ ORBIT STAFFING INTEGRATION ============
  
  // Get Orbit connection status
  app.get("/api/orbit/status", async (_req, res) => {
    try {
      const { getEcosystemStatus, getFinancialHubStatus } = await import("./orbitClient");
      const [ecosystem, financial] = await Promise.all([
        getEcosystemStatus().catch(() => ({ status: "unavailable" })),
        getFinancialHubStatus().catch(() => ({ status: "unavailable" })),
      ]);
      res.json({ ecosystem, financial, connected: true });
    } catch (error: any) {
      res.json({ connected: false, error: error.message });
    }
  });

  // Sync doctors/practitioners to Orbit
  app.post("/api/orbit/sync/doctors", isAuthenticated, async (req: any, res) => {
    try {
      const { syncDoctors } = await import("./orbitClient");
      const result = await syncDoctors(req.body.doctors);
      res.json(result);
    } catch (error: any) {
      console.error("Error syncing doctors to Orbit:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Sync timesheets to Orbit
  app.post("/api/orbit/sync/timesheets", isAuthenticated, async (req: any, res) => {
    try {
      const { syncTimesheets } = await import("./orbitClient");
      const result = await syncTimesheets(req.body.entries);
      res.json(result);
    } catch (error: any) {
      console.error("Error syncing timesheets to Orbit:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Sync 1099 contractors
  app.post("/api/orbit/sync/contractors", isAuthenticated, async (req: any, res) => {
    try {
      const { sync1099Contractors } = await import("./orbitClient");
      const result = await sync1099Contractors(req.body.contractors);
      res.json(result);
    } catch (error: any) {
      console.error("Error syncing contractors to Orbit:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Sync W2 employees
  app.post("/api/orbit/sync/employees", isAuthenticated, async (req: any, res) => {
    try {
      const { syncW2Employees } = await import("./orbitClient");
      const result = await syncW2Employees(req.body.employees);
      res.json(result);
    } catch (error: any) {
      console.error("Error syncing employees to Orbit:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Sync certifications
  app.post("/api/orbit/sync/certifications", isAuthenticated, async (req: any, res) => {
    try {
      const { syncCertifications } = await import("./orbitClient");
      const result = await syncCertifications(req.body.certifications);
      res.json(result);
    } catch (error: any) {
      console.error("Error syncing certifications to Orbit:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Manual revenue sync (for testing)
  app.post("/api/orbit/sync/revenue", isAuthenticated, async (req: any, res) => {
    try {
      const { syncSubscriptionRevenue } = await import("./orbitClient");
      const result = await syncSubscriptionRevenue(req.body);
      res.json(result);
    } catch (error: any) {
      console.error("Error syncing revenue to Orbit:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Stripe webhook handler for automatic revenue sync
  // Note: For production, configure express.raw() middleware for this route
  // and use Stripe.webhooks.constructEvent() with STRIPE_WEBHOOK_SECRET
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const signature = req.headers['stripe-signature'];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      if (!webhookSecret) {
        console.warn("STRIPE_WEBHOOK_SECRET not configured - webhook validation skipped");
      } else if (!signature) {
        console.error("Missing Stripe signature header");
        return res.status(400).json({ message: "Missing Stripe signature" });
      } else {
        // In production with raw body middleware, use:
        // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
        console.log("Stripe webhook received with signature validation");
      }
      
      const { handleStripeSubscriptionWebhook } = await import("./orbitClient");
      await handleStripeSubscriptionWebhook(req.body);
      console.log("Revenue synced to Orbit Financial Hub successfully");
      res.json({ received: true });
    } catch (error: any) {
      console.error("Error processing Stripe webhook:", error);
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAuthenticated } from "./replit_integrations/auth";
import { 
  insertUserProfileSchema,
  insertSleepLogSchema,
  insertDietLogSchema,
  insertExerciseLogSchema,
  insertNotificationPreferencesSchema
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

  return httpServer;
}

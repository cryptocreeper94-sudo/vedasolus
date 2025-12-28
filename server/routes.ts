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

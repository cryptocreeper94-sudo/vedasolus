import type { Express } from "express";
import { db } from "./db";
import { seoPages, insertSeoPageSchema } from "@shared/schema";
import { eq } from "drizzle-orm";
import { isEmailAuthenticated as isAuthenticated } from "./email-auth";

export function registerSeoRoutes(app: Express) {

  app.get("/api/seo/pages", async (_req, res) => {
    try {
      const pages = await db.select().from(seoPages).orderBy(seoPages.route);
      res.json(pages);
    } catch (error: any) {
      console.error("Error fetching SEO pages:", error);
      res.status(500).json({ message: "Failed to fetch SEO pages" });
    }
  });

  app.get("/api/seo/pages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [page] = await db.select().from(seoPages).where(eq(seoPages.id, id));
      if (!page) {
        return res.status(404).json({ message: "SEO page not found" });
      }
      res.json(page);
    } catch (error: any) {
      console.error("Error fetching SEO page:", error);
      res.status(500).json({ message: "Failed to fetch SEO page" });
    }
  });

  app.get("/api/seo/route", async (req, res) => {
    try {
      const route = req.query.route as string;
      if (!route) {
        return res.status(400).json({ message: "Route query parameter is required" });
      }
      const [page] = await db.select().from(seoPages).where(eq(seoPages.route, route));
      if (!page) {
        return res.status(404).json({ message: "SEO config not found for route" });
      }
      res.json(page);
    } catch (error: any) {
      console.error("Error fetching SEO config by route:", error);
      res.status(500).json({ message: "Failed to fetch SEO config" });
    }
  });

  app.post("/api/seo/pages", isAuthenticated, async (req: any, res) => {
    try {
      const validated = insertSeoPageSchema.parse(req.body);
      const [created] = await db.insert(seoPages).values(validated).returning();
      res.json(created);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.message });
      }
      console.error("Error creating SEO page:", error);
      res.status(500).json({ message: "Failed to create SEO page" });
    }
  });

  app.put("/api/seo/pages/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const [updated] = await db
        .update(seoPages)
        .set({ ...req.body, updatedAt: new Date() })
        .where(eq(seoPages.id, id))
        .returning();
      if (!updated) {
        return res.status(404).json({ message: "SEO page not found" });
      }
      res.json(updated);
    } catch (error: any) {
      console.error("Error updating SEO page:", error);
      res.status(500).json({ message: "Failed to update SEO page" });
    }
  });

  app.delete("/api/seo/pages/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const [deleted] = await db
        .delete(seoPages)
        .where(eq(seoPages.id, id))
        .returning();
      if (!deleted) {
        return res.status(404).json({ message: "SEO page not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting SEO page:", error);
      res.status(500).json({ message: "Failed to delete SEO page" });
    }
  });
}

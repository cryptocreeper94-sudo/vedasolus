import type { Express } from "express";
import { db } from "./db";
import { analyticsSessions, analyticsPageViews, analyticsEvents } from "@shared/schema";
import { eq, desc, sql, count, countDistinct, gte, and } from "drizzle-orm";

export function registerAnalyticsRoutes(app: Express) {

  app.post("/api/analytics/session", async (req, res) => {
    try {
      const { sessionId, visitorId, userAgent, referrer, landingPage, device, browser, os, country, city, utmSource, utmMedium, utmCampaign } = req.body;
      const [session] = await db.insert(analyticsSessions).values({
        id: sessionId || undefined,
        visitorId,
        userAgent,
        referrer,
        landingPage,
        device,
        browser,
        os,
        country,
        city,
        utmSource,
        utmMedium,
        utmCampaign,
      }).returning();
      res.json(session);
    } catch (error: any) {
      console.error("Error creating analytics session:", error);
      res.status(500).json({ message: "Failed to create analytics session" });
    }
  });

  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const { sessionId, visitorId, route, title, referrer } = req.body;
      await db.insert(analyticsPageViews).values({
        sessionId,
        visitorId,
        route,
        title,
        referrer,
      });
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error tracking page view:", error);
      res.status(500).json({ message: "Failed to track page view" });
    }
  });

  app.post("/api/analytics/event", async (req, res) => {
    try {
      const { sessionId, visitorId, eventName, eventCategory, eventLabel, eventValue, route, metadata } = req.body;
      await db.insert(analyticsEvents).values({
        sessionId,
        visitorId,
        eventName,
        eventCategory,
        eventLabel,
        eventValue,
        route,
        metadata,
      });
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error tracking event:", error);
      res.status(500).json({ message: "Failed to track event" });
    }
  });

  app.post("/api/analytics/session/:id/end", async (req, res) => {
    try {
      const { id } = req.params;
      await db.update(analyticsSessions)
        .set({ endedAt: new Date() })
        .where(eq(analyticsSessions.id, id));
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error ending session:", error);
      res.status(500).json({ message: "Failed to end session" });
    }
  });

  app.get("/api/analytics/summary", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const dateFilter = sql`NOW() - INTERVAL '1 day' * ${days}`;

      const [pageViewsResult] = await db
        .select({ total: count() })
        .from(analyticsPageViews)
        .where(gte(analyticsPageViews.viewedAt, dateFilter));

      const [visitorsResult] = await db
        .select({ total: countDistinct(analyticsSessions.visitorId) })
        .from(analyticsSessions)
        .where(gte(analyticsSessions.startedAt, dateFilter));

      const [sessionsResult] = await db
        .select({ total: count() })
        .from(analyticsSessions)
        .where(gte(analyticsSessions.startedAt, dateFilter));

      const [durationResult] = await db
        .select({
          avg: sql<number>`COALESCE(AVG(EXTRACT(EPOCH FROM (${analyticsSessions.endedAt} - ${analyticsSessions.startedAt}))), 0)`,
        })
        .from(analyticsSessions)
        .where(and(
          gte(analyticsSessions.startedAt, dateFilter),
          sql`${analyticsSessions.endedAt} IS NOT NULL`
        ));

      const bounceData = await db
        .select({
          sessionId: analyticsPageViews.sessionId,
          pageCount: count(),
        })
        .from(analyticsPageViews)
        .innerJoin(analyticsSessions, eq(analyticsPageViews.sessionId, analyticsSessions.id))
        .where(gte(analyticsSessions.startedAt, dateFilter))
        .groupBy(analyticsPageViews.sessionId);

      const totalWithPages = bounceData.length;
      const bouncedSessions = bounceData.filter(s => s.pageCount === 1).length;
      const bounceRate = totalWithPages > 0 ? (bouncedSessions / totalWithPages) * 100 : 0;

      const [activeResult] = await db
        .select({ total: count() })
        .from(analyticsSessions)
        .where(gte(analyticsSessions.startedAt, sql`NOW() - INTERVAL '5 minutes'`));

      res.json({
        totalPageViews: pageViewsResult?.total || 0,
        uniqueVisitors: visitorsResult?.total || 0,
        totalSessions: sessionsResult?.total || 0,
        avgSessionDuration: Math.round(Number(durationResult?.avg) || 0),
        bounceRate: Math.round(bounceRate * 100) / 100,
        activeUsers: activeResult?.total || 0,
      });
    } catch (error: any) {
      console.error("Error fetching analytics summary:", error);
      res.status(500).json({ message: "Failed to fetch analytics summary" });
    }
  });

  app.get("/api/analytics/realtime", async (_req, res) => {
    try {
      const [result] = await db
        .select({ total: count() })
        .from(analyticsSessions)
        .where(and(
          gte(analyticsSessions.startedAt, sql`NOW() - INTERVAL '5 minutes'`),
          sql`${analyticsSessions.endedAt} IS NULL`
        ));
      res.json({ activeVisitors: result?.total || 0 });
    } catch (error: any) {
      console.error("Error fetching realtime data:", error);
      res.status(500).json({ message: "Failed to fetch realtime data" });
    }
  });

  app.get("/api/analytics/traffic", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const dateFilter = sql`NOW() - INTERVAL '1 day' * ${days}`;

      const traffic = await db
        .select({
          date: sql<string>`DATE(${analyticsPageViews.viewedAt})`.as("date"),
          pageViews: count(),
          visitors: countDistinct(analyticsPageViews.visitorId),
        })
        .from(analyticsPageViews)
        .where(gte(analyticsPageViews.viewedAt, dateFilter))
        .groupBy(sql`DATE(${analyticsPageViews.viewedAt})`)
        .orderBy(sql`DATE(${analyticsPageViews.viewedAt})`);

      res.json(traffic);
    } catch (error: any) {
      console.error("Error fetching traffic data:", error);
      res.status(500).json({ message: "Failed to fetch traffic data" });
    }
  });

  app.get("/api/analytics/pages", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const dateFilter = sql`NOW() - INTERVAL '1 day' * ${days}`;

      const pages = await db
        .select({
          route: analyticsPageViews.route,
          views: count(),
        })
        .from(analyticsPageViews)
        .where(gte(analyticsPageViews.viewedAt, dateFilter))
        .groupBy(analyticsPageViews.route)
        .orderBy(desc(count()))
        .limit(20);

      res.json(pages);
    } catch (error: any) {
      console.error("Error fetching pages data:", error);
      res.status(500).json({ message: "Failed to fetch pages data" });
    }
  });

  app.get("/api/analytics/referrers", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const dateFilter = sql`NOW() - INTERVAL '1 day' * ${days}`;

      const referrers = await db
        .select({
          referrer: analyticsSessions.referrer,
          count: count(),
        })
        .from(analyticsSessions)
        .where(and(
          gte(analyticsSessions.startedAt, dateFilter),
          sql`${analyticsSessions.referrer} IS NOT NULL AND ${analyticsSessions.referrer} != ''`
        ))
        .groupBy(analyticsSessions.referrer)
        .orderBy(desc(count()))
        .limit(20);

      res.json(referrers);
    } catch (error: any) {
      console.error("Error fetching referrers data:", error);
      res.status(500).json({ message: "Failed to fetch referrers data" });
    }
  });

  app.get("/api/analytics/devices", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const dateFilter = sql`NOW() - INTERVAL '1 day' * ${days}`;

      const devices = await db
        .select({
          device: analyticsSessions.device,
          count: count(),
        })
        .from(analyticsSessions)
        .where(gte(analyticsSessions.startedAt, dateFilter))
        .groupBy(analyticsSessions.device)
        .orderBy(desc(count()));

      res.json(devices);
    } catch (error: any) {
      console.error("Error fetching devices data:", error);
      res.status(500).json({ message: "Failed to fetch devices data" });
    }
  });

  app.get("/api/analytics/browsers", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const dateFilter = sql`NOW() - INTERVAL '1 day' * ${days}`;

      const browsers = await db
        .select({
          browser: analyticsSessions.browser,
          count: count(),
        })
        .from(analyticsSessions)
        .where(gte(analyticsSessions.startedAt, dateFilter))
        .groupBy(analyticsSessions.browser)
        .orderBy(desc(count()));

      res.json(browsers);
    } catch (error: any) {
      console.error("Error fetching browsers data:", error);
      res.status(500).json({ message: "Failed to fetch browsers data" });
    }
  });

  app.get("/api/analytics/geo", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const dateFilter = sql`NOW() - INTERVAL '1 day' * ${days}`;

      const geo = await db
        .select({
          country: analyticsSessions.country,
          count: count(),
        })
        .from(analyticsSessions)
        .where(gte(analyticsSessions.startedAt, dateFilter))
        .groupBy(analyticsSessions.country)
        .orderBy(desc(count()));

      res.json(geo);
    } catch (error: any) {
      console.error("Error fetching geo data:", error);
      res.status(500).json({ message: "Failed to fetch geo data" });
    }
  });

  app.get("/api/analytics/events", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const dateFilter = sql`NOW() - INTERVAL '1 day' * ${days}`;

      const events = await db
        .select()
        .from(analyticsEvents)
        .where(gte(analyticsEvents.createdAt, dateFilter))
        .orderBy(desc(analyticsEvents.createdAt))
        .limit(100);

      res.json(events);
    } catch (error: any) {
      console.error("Error fetching events data:", error);
      res.status(500).json({ message: "Failed to fetch events data" });
    }
  });
}

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, serial, date, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Export auth models (required for Replit Auth integration)
export * from "./models/auth";

// User Profiles - Extended health data
export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  location: text("location"),
  heightCm: integer("height_cm"),
  weightKg: integer("weight_kg"),
  dateOfBirth: date("date_of_birth"),
  doshaType: text("dosha_type"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  updatedAt: true,
}).extend({
  displayName: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  heightCm: z.number().nullable().optional(),
  weightKg: z.number().nullable().optional(),
  dateOfBirth: z.string().nullable().optional(),
  doshaType: z.string().nullable().optional(),
});

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;

// Sleep Logs
export const sleepLogs = pgTable("sleep_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  hoursSlept: integer("hours_slept"),
  quality: integer("quality"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSleepLogSchema = createInsertSchema(sleepLogs).omit({
  id: true,
  createdAt: true,
}).extend({
  hoursSlept: z.number().nullable().optional(),
  quality: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type InsertSleepLog = z.infer<typeof insertSleepLogSchema>;
export type SleepLog = typeof sleepLogs.$inferSelect;

// Diet Logs
export const dietLogs = pgTable("diet_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  mealType: text("meal_type"),
  items: text("items").array(),
  calories: integer("calories"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDietLogSchema = createInsertSchema(dietLogs).omit({
  id: true,
  createdAt: true,
}).extend({
  mealType: z.string().nullable().optional(),
  items: z.array(z.string()).nullable().optional(),
  calories: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type InsertDietLog = z.infer<typeof insertDietLogSchema>;
export type DietLog = typeof dietLogs.$inferSelect;

// Exercise Logs
export const exerciseLogs = pgTable("exercise_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  activityType: text("activity_type"),
  durationMinutes: integer("duration_minutes"),
  intensity: text("intensity"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExerciseLogSchema = createInsertSchema(exerciseLogs).omit({
  id: true,
  createdAt: true,
}).extend({
  activityType: z.string().nullable().optional(),
  durationMinutes: z.number().nullable().optional(),
  intensity: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type InsertExerciseLog = z.infer<typeof insertExerciseLogSchema>;
export type ExerciseLog = typeof exerciseLogs.$inferSelect;

// Heart Rate Logs
export const heartRateLogs = pgTable("heart_rate_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  bpm: integer("bpm").notNull(),
  context: text("context"), // resting, active, post-exercise, morning, evening
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHeartRateLogSchema = createInsertSchema(heartRateLogs).omit({
  id: true,
  createdAt: true,
}).extend({
  bpm: z.number().min(30).max(220),
  context: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type InsertHeartRateLog = z.infer<typeof insertHeartRateLogSchema>;
export type HeartRateLog = typeof heartRateLogs.$inferSelect;

// Notification Preferences
export const notificationPreferences = pgTable("notification_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  appointmentReminders: boolean("appointment_reminders").default(true),
  dailyWisdom: boolean("daily_wisdom").default(true),
  marketplaceUpdates: boolean("marketplace_updates").default(true),
  systemAlerts: boolean("system_alerts").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertNotificationPreferencesSchema = createInsertSchema(notificationPreferences).omit({
  id: true,
  updatedAt: true,
});

export type InsertNotificationPreferences = z.infer<typeof insertNotificationPreferencesSchema>;
export type NotificationPreferences = typeof notificationPreferences.$inferSelect;

// Practitioners for marketplace
export const practitioners = pgTable("practitioners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  title: text("title").notNull(),
  specialty: text("specialty").notNull(),
  location: text("location"),
  bio: text("bio"),
  modalities: text("modalities").array(),
  verified: boolean("verified").default(false),
  rating: integer("rating").default(0),
  reviewCount: integer("review_count").default(0),
  hourlyRate: integer("hourly_rate"),
  availableRemote: boolean("available_remote").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPractitionerSchema = createInsertSchema(practitioners).omit({
  id: true,
  createdAt: true,
});

export type InsertPractitioner = z.infer<typeof insertPractitionerSchema>;
export type Practitioner = typeof practitioners.$inferSelect;

// Appointments/Bookings
export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  practitionerId: varchar("practitioner_id").notNull().references(() => practitioners.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  time: text("time").notNull(),
  duration: integer("duration").default(60),
  status: text("status").default("pending"),
  notes: text("notes"),
  paymentStatus: text("payment_status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// User Achievements
export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  earnedAt: timestamp("earned_at").defaultNow(),
  progress: integer("progress").default(0),
  target: integer("target").default(1),
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  earnedAt: true,
});

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

// User Streaks
export const streaks = pgTable("streaks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastActivityDate: date("last_activity_date"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertStreakSchema = createInsertSchema(streaks).omit({
  id: true,
  updatedAt: true,
});

export type InsertStreak = z.infer<typeof insertStreakSchema>;
export type Streak = typeof streaks.$inferSelect;

// Messages
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  receiverId: varchar("receiver_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Meditation Sessions
export const meditationSessions = pgTable("meditation_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const insertMeditationSessionSchema = createInsertSchema(meditationSessions).omit({
  id: true,
  completedAt: true,
});

export type InsertMeditationSession = z.infer<typeof insertMeditationSessionSchema>;
export type MeditationSession = typeof meditationSessions.$inferSelect;

// Health Records (for ingestion)
export const healthRecords = pgTable("health_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  source: text("source"),
  data: jsonb("data"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const insertHealthRecordSchema = createInsertSchema(healthRecords).omit({
  id: true,
  uploadedAt: true,
});

export type InsertHealthRecord = z.infer<typeof insertHealthRecordSchema>;
export type HealthRecord = typeof healthRecords.$inferSelect;

// Medical Disclaimer Acknowledgments
export const medicalDisclaimers = pgTable("medical_disclaimers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  marketingOptIn: boolean("marketing_opt_in").default(false),
  acknowledgedAt: timestamp("acknowledged_at").defaultNow(),
  source: text("source").default("web"),
});

export const insertMedicalDisclaimerSchema = createInsertSchema(medicalDisclaimers).omit({
  id: true,
  acknowledgedAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  marketingOptIn: z.boolean().optional().default(false),
  userId: z.string().nullable().optional(),
  source: z.string().optional(),
});

export type InsertMedicalDisclaimer = z.infer<typeof insertMedicalDisclaimerSchema>;
export type MedicalDisclaimer = typeof medicalDisclaimers.$inferSelect;

// Analytics Sessions
export const analyticsSessions = pgTable("analytics_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  visitorId: varchar("visitor_id").notNull(),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  landingPage: text("landing_page"),
  device: text("device"),
  browser: text("browser"),
  os: text("os"),
  country: text("country"),
  city: text("city"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  startedAt: timestamp("started_at").defaultNow(),
  endedAt: timestamp("ended_at"),
});

export const insertAnalyticsSessionSchema = createInsertSchema(analyticsSessions).omit({
  id: true,
  startedAt: true,
});

export type InsertAnalyticsSession = z.infer<typeof insertAnalyticsSessionSchema>;
export type AnalyticsSession = typeof analyticsSessions.$inferSelect;

// Analytics Page Views
export const analyticsPageViews = pgTable("analytics_page_views", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  visitorId: varchar("visitor_id").notNull(),
  route: text("route").notNull(),
  title: text("title"),
  referrer: text("referrer"),
  timeSpent: integer("time_spent"),
  viewedAt: timestamp("viewed_at").defaultNow(),
});

export const insertAnalyticsPageViewSchema = createInsertSchema(analyticsPageViews).omit({
  id: true,
  viewedAt: true,
});

export type InsertAnalyticsPageView = z.infer<typeof insertAnalyticsPageViewSchema>;
export type AnalyticsPageView = typeof analyticsPageViews.$inferSelect;

// Analytics Events
export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id"),
  visitorId: varchar("visitor_id"),
  eventName: text("event_name").notNull(),
  eventCategory: text("event_category"),
  eventLabel: text("event_label"),
  eventValue: integer("event_value"),
  route: text("route"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

// SEO Pages
export const seoPages = pgTable("seo_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  route: text("route").notNull().unique(),
  title: text("title"),
  description: text("description"),
  keywords: text("keywords"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),
  canonicalUrl: text("canonical_url"),
  robots: text("robots"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSeoPageSchema = createInsertSchema(seoPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSeoPage = z.infer<typeof insertSeoPageSchema>;
export type SeoPage = typeof seoPages.$inferSelect;

// Marketing Posts
export const marketingPosts = pgTable("marketing_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  platform: text("platform").default("facebook"),
  hashtags: text("hashtags").array(),
  targetSite: text("target_site"),
  category: text("category"),
  tone: text("tone"),
  cta: text("cta"),
  season: text("season"),
  isActive: boolean("is_active").default(true),
  usageCount: integer("usage_count").default(0),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMarketingPostSchema = createInsertSchema(marketingPosts).omit({
  id: true,
  createdAt: true,
});

export type InsertMarketingPost = z.infer<typeof insertMarketingPostSchema>;
export type MarketingPost = typeof marketingPosts.$inferSelect;

// Marketing Images
export const marketingImages = pgTable("marketing_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  filePath: text("file_path"),
  category: text("category"),
  subject: text("subject"),
  style: text("style"),
  season: text("season"),
  quality: text("quality"),
  altText: text("alt_text"),
  isActive: boolean("is_active").default(true),
  usageCount: integer("usage_count").default(0),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMarketingImageSchema = createInsertSchema(marketingImages).omit({
  id: true,
  createdAt: true,
});

export type InsertMarketingImage = z.infer<typeof insertMarketingImageSchema>;
export type MarketingImage = typeof marketingImages.$inferSelect;

// Social Integrations
export const socialIntegrations = pgTable("social_integrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  facebookPageId: text("facebook_page_id"),
  facebookPageAccessToken: text("facebook_page_access_token"),
  facebookConnected: boolean("facebook_connected").default(false),
  facebookPageName: text("facebook_page_name"),
  instagramAccountId: text("instagram_account_id"),
  instagramConnected: boolean("instagram_connected").default(false),
  instagramUsername: text("instagram_username"),
  twitterConnected: boolean("twitter_connected").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSocialIntegrationSchema = createInsertSchema(socialIntegrations).omit({
  id: true,
  updatedAt: true,
});

export type InsertSocialIntegration = z.infer<typeof insertSocialIntegrationSchema>;
export type SocialIntegration = typeof socialIntegrations.$inferSelect;

// Scheduled Posts
export const scheduledPosts = pgTable("scheduled_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(),
  content: text("content").notNull(),
  status: text("status").default("pending"),
  externalPostId: text("external_post_id"),
  error: text("error"),
  marketingPostId: varchar("marketing_post_id"),
  postedAt: timestamp("posted_at"),
  impressions: integer("impressions").default(0),
  reach: integer("reach").default(0),
  clicks: integer("clicks").default(0),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  shares: integer("shares").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertScheduledPostSchema = createInsertSchema(scheduledPosts).omit({
  id: true,
  createdAt: true,
});

export type InsertScheduledPost = z.infer<typeof insertScheduledPostSchema>;
export type ScheduledPost = typeof scheduledPosts.$inferSelect;

// Content Bundles
export const contentBundles = pgTable("content_bundles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageId: varchar("image_id"),
  messageId: varchar("message_id"),
  imageUrl: text("image_url"),
  message: text("message"),
  platform: text("platform"),
  status: text("status").default("draft"),
  postType: text("post_type"),
  targetAudience: text("target_audience"),
  budgetRange: text("budget_range"),
  ctaButton: text("cta_button"),
  scheduledDate: timestamp("scheduled_date"),
  postedAt: timestamp("posted_at"),
  impressions: integer("impressions").default(0),
  reach: integer("reach").default(0),
  clicks: integer("clicks").default(0),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  shares: integer("shares").default(0),
  saves: integer("saves").default(0),
  leads: integer("leads").default(0),
  conversions: integer("conversions").default(0),
  spend: integer("spend").default(0),
  revenue: integer("revenue").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContentBundleSchema = createInsertSchema(contentBundles).omit({
  id: true,
  createdAt: true,
});

export type InsertContentBundle = z.infer<typeof insertContentBundleSchema>;
export type ContentBundle = typeof contentBundles.$inferSelect;

// Ad Campaigns
export const adCampaigns = pgTable("ad_campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  objective: text("objective"),
  status: text("status").default("draft"),
  dailyBudget: integer("daily_budget"),
  totalBudget: integer("total_budget"),
  targeting: jsonb("targeting"),
  creativeImageUrl: text("creative_image_url"),
  creativeText: text("creative_text"),
  headline: text("headline"),
  ctaType: text("cta_type"),
  metaCampaignId: text("meta_campaign_id"),
  metaAdSetId: text("meta_ad_set_id"),
  metaAdId: text("meta_ad_id"),
  impressions: integer("impressions").default(0),
  reach: integer("reach").default(0),
  clicks: integer("clicks").default(0),
  spend: integer("spend").default(0),
  conversions: integer("conversions").default(0),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAdCampaignSchema = createInsertSchema(adCampaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertAdCampaign = z.infer<typeof insertAdCampaignSchema>;
export type AdCampaign = typeof adCampaigns.$inferSelect;

// Practitioner Inquiries (lead capture for practitioners/teledoc providers)
export const practitionerInquiries = pgTable("practitioner_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  modality: text("modality").notNull(),
  licenseNumber: text("license_number"),
  yearsExperience: integer("years_experience"),
  interestedInTeledoc: boolean("interested_in_teledoc").default(false),
  state: text("state"),
  country: text("country"),
  message: text("message"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPractitionerInquirySchema = createInsertSchema(practitionerInquiries).omit({
  id: true,
  status: true,
  createdAt: true,
}).extend({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().nullable().optional(),
  modality: z.string().min(1, "Please select a modality"),
  licenseNumber: z.string().nullable().optional(),
  yearsExperience: z.number().nullable().optional(),
  interestedInTeledoc: z.boolean().optional().default(false),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
});

export type InsertPractitionerInquiry = z.infer<typeof insertPractitionerInquirySchema>;
export type PractitionerInquiry = typeof practitionerInquiries.$inferSelect;

// Import users from auth models for references
import { users } from "./models/auth";

// ============ TRUST LAYER HALLMARK SYSTEM ============

export const hallmarks = pgTable("hallmarks", {
  id: serial("id").primaryKey(),
  thId: text("th_id").unique().notNull(),
  userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
  appId: text("app_id").notNull(),
  appName: text("app_name").notNull(),
  productName: text("product_name").notNull(),
  releaseType: text("release_type").notNull(),
  metadata: jsonb("metadata"),
  dataHash: text("data_hash").notNull(),
  txHash: text("tx_hash"),
  blockHeight: text("block_height"),
  qrCodeSvg: text("qr_code_svg"),
  verificationUrl: text("verification_url"),
  hallmarkId: integer("hallmark_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Hallmark = typeof hallmarks.$inferSelect;
export type InsertHallmark = typeof hallmarks.$inferInsert;

export const trustStamps = pgTable("trust_stamps", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
  category: text("category").notNull(),
  data: jsonb("data"),
  dataHash: text("data_hash").notNull(),
  txHash: text("tx_hash"),
  blockHeight: text("block_height"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TrustStamp = typeof trustStamps.$inferSelect;
export type InsertTrustStamp = typeof trustStamps.$inferInsert;

export const hallmarkCounter = pgTable("hallmark_counter", {
  id: text("id").primaryKey(),
  currentSequence: text("current_sequence").notNull().default("0"),
});

// ============ AFFILIATE & REFERRAL SYSTEM ============

export const affiliateReferrals = pgTable("affiliate_referrals", {
  id: serial("id").primaryKey(),
  referrerId: varchar("referrer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  referredUserId: varchar("referred_user_id").references(() => users.id, { onDelete: "set null" }),
  referralHash: text("referral_hash").notNull(),
  platform: text("platform").notNull().default("vedasolus"),
  status: text("status").notNull().default("pending"),
  convertedAt: timestamp("converted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AffiliateReferral = typeof affiliateReferrals.$inferSelect;
export type InsertAffiliateReferral = typeof affiliateReferrals.$inferInsert;

export const affiliateCommissions = pgTable("affiliate_commissions", {
  id: serial("id").primaryKey(),
  referrerId: varchar("referrer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  referralId: integer("referral_id").references(() => affiliateReferrals.id),
  amount: text("amount").notNull(),
  currency: text("currency").default("SIG"),
  tier: text("tier").default("base"),
  status: text("status").default("pending"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AffiliateCommission = typeof affiliateCommissions.$inferSelect;
export type InsertAffiliateCommission = typeof affiliateCommissions.$inferInsert;

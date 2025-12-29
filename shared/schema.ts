import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
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

// Import users from auth models for references
import { users } from "./models/auth";

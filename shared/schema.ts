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

// Import users from auth models for references
import { users } from "./models/auth";

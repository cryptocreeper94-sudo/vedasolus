import { 
  userProfiles, sleepLogs, dietLogs, exerciseLogs, notificationPreferences, medicalDisclaimers,
  type UserProfile, type InsertUserProfile,
  type SleepLog, type InsertSleepLog,
  type DietLog, type InsertDietLog,
  type ExerciseLog, type InsertExerciseLog,
  type NotificationPreferences, type InsertNotificationPreferences,
  type MedicalDisclaimer, type InsertMedicalDisclaimer
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User Profile
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  upsertUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  
  // Sleep Logs
  getSleepLogs(userId: string, limit?: number): Promise<SleepLog[]>;
  createSleepLog(log: InsertSleepLog): Promise<SleepLog>;
  
  // Diet Logs
  getDietLogs(userId: string, limit?: number): Promise<DietLog[]>;
  createDietLog(log: InsertDietLog): Promise<DietLog>;
  
  // Exercise Logs
  getExerciseLogs(userId: string, limit?: number): Promise<ExerciseLog[]>;
  createExerciseLog(log: InsertExerciseLog): Promise<ExerciseLog>;
  
  // Notification Preferences
  getNotificationPreferences(userId: string): Promise<NotificationPreferences | undefined>;
  upsertNotificationPreferences(prefs: InsertNotificationPreferences): Promise<NotificationPreferences>;
  
  // Medical Disclaimers
  createOrUpdateDisclaimer(data: InsertMedicalDisclaimer): Promise<MedicalDisclaimer>;
  getDisclaimerByEmail(email: string): Promise<MedicalDisclaimer | undefined>;
  getAllDisclaimers(): Promise<MedicalDisclaimer[]>;
}

export class DatabaseStorage implements IStorage {
  // User Profile
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
    return profile;
  }

  async upsertUserProfile(profileData: InsertUserProfile): Promise<UserProfile> {
    const [profile] = await db
      .insert(userProfiles)
      .values(profileData)
      .onConflictDoUpdate({
        target: userProfiles.userId,
        set: {
          ...profileData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return profile;
  }

  // Sleep Logs
  async getSleepLogs(userId: string, limit: number = 30): Promise<SleepLog[]> {
    return await db
      .select()
      .from(sleepLogs)
      .where(eq(sleepLogs.userId, userId))
      .orderBy(desc(sleepLogs.date))
      .limit(limit);
  }

  async createSleepLog(logData: InsertSleepLog): Promise<SleepLog> {
    const [log] = await db.insert(sleepLogs).values(logData).returning();
    return log;
  }

  // Diet Logs
  async getDietLogs(userId: string, limit: number = 30): Promise<DietLog[]> {
    return await db
      .select()
      .from(dietLogs)
      .where(eq(dietLogs.userId, userId))
      .orderBy(desc(dietLogs.date))
      .limit(limit);
  }

  async createDietLog(logData: InsertDietLog): Promise<DietLog> {
    const [log] = await db.insert(dietLogs).values(logData).returning();
    return log;
  }

  // Exercise Logs
  async getExerciseLogs(userId: string, limit: number = 30): Promise<ExerciseLog[]> {
    return await db
      .select()
      .from(exerciseLogs)
      .where(eq(exerciseLogs.userId, userId))
      .orderBy(desc(exerciseLogs.date))
      .limit(limit);
  }

  async createExerciseLog(logData: InsertExerciseLog): Promise<ExerciseLog> {
    const [log] = await db.insert(exerciseLogs).values(logData).returning();
    return log;
  }

  // Notification Preferences
  async getNotificationPreferences(userId: string): Promise<NotificationPreferences | undefined> {
    const [prefs] = await db
      .select()
      .from(notificationPreferences)
      .where(eq(notificationPreferences.userId, userId));
    return prefs;
  }

  async upsertNotificationPreferences(prefsData: InsertNotificationPreferences): Promise<NotificationPreferences> {
    const [prefs] = await db
      .insert(notificationPreferences)
      .values(prefsData)
      .onConflictDoUpdate({
        target: notificationPreferences.userId,
        set: {
          ...prefsData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return prefs;
  }

  // Medical Disclaimers
  async createOrUpdateDisclaimer(data: InsertMedicalDisclaimer): Promise<MedicalDisclaimer> {
    const [disclaimer] = await db
      .insert(medicalDisclaimers)
      .values(data)
      .onConflictDoUpdate({
        target: medicalDisclaimers.email,
        set: {
          name: data.name,
          marketingOptIn: data.marketingOptIn,
          acknowledgedAt: new Date(),
          userId: data.userId,
        },
      })
      .returning();
    return disclaimer;
  }

  async getDisclaimerByEmail(email: string): Promise<MedicalDisclaimer | undefined> {
    const [disclaimer] = await db
      .select()
      .from(medicalDisclaimers)
      .where(eq(medicalDisclaimers.email, email.toLowerCase()));
    return disclaimer;
  }

  async getAllDisclaimers(): Promise<MedicalDisclaimer[]> {
    return await db
      .select()
      .from(medicalDisclaimers)
      .orderBy(desc(medicalDisclaimers.acknowledgedAt));
  }
}

export const storage = new DatabaseStorage();

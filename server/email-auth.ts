// Email authentication routes
import { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users, signupSchema, loginSchema, verifyEmailSchema } from "@shared/schema";
import { eq } from "drizzle-orm";
import { sendVerificationEmail } from "./resend-client";
import { fromError } from "zod-validation-error";

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function setupEmailAuth(app: Express) {
  // Signup - creates unverified account and sends verification email
  app.post("/api/auth/signup", async (req: Request, res: Response) => {
    try {
      const validated = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await db.select().from(users).where(eq(users.email, validated.email)).limit(1);
      if (existingUser.length > 0) {
        if (existingUser[0].emailVerified) {
          return res.status(400).json({ message: "An account with this email already exists" });
        }
        // Resend verification for unverified account
        const code = generateVerificationCode();
        const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        
        await db.update(users).set({
          verificationCode: code,
          verificationExpires: expires,
          updatedAt: new Date(),
        }).where(eq(users.email, validated.email));
        
        await sendVerificationEmail(validated.email, code, existingUser[0].firstName || "there");
        return res.json({ message: "Verification email resent", email: validated.email });
      }
      
      // Hash password
      const passwordHash = await bcrypt.hash(validated.password, 12);
      const code = generateVerificationCode();
      const expires = new Date(Date.now() + 15 * 60 * 1000);
      
      // Create user
      const [newUser] = await db.insert(users).values({
        email: validated.email,
        passwordHash,
        firstName: validated.firstName,
        lastName: validated.lastName || null,
        emailVerified: false,
        verificationCode: code,
        verificationExpires: expires,
      }).returning();
      
      // Send verification email
      await sendVerificationEmail(validated.email, code, validated.firstName);
      
      res.json({ message: "Account created. Please check your email to verify.", email: validated.email });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromError(error).toString() });
      }
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  // Verify email with code
  app.post("/api/auth/verify", async (req: Request, res: Response) => {
    try {
      const validated = verifyEmailSchema.parse(req.body);
      
      const [user] = await db.select().from(users).where(eq(users.email, validated.email)).limit(1);
      
      if (!user) {
        return res.status(400).json({ message: "Account not found" });
      }
      
      if (user.emailVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }
      
      if (user.verificationCode !== validated.code) {
        return res.status(400).json({ message: "Invalid verification code" });
      }
      
      if (user.verificationExpires && new Date() > user.verificationExpires) {
        return res.status(400).json({ message: "Verification code expired. Please request a new one." });
      }
      
      // Mark as verified
      await db.update(users).set({
        emailVerified: true,
        verificationCode: null,
        verificationExpires: null,
        updatedAt: new Date(),
      }).where(eq(users.email, validated.email));
      
      // Create session
      (req.session as any).userId = user.id;
      
      res.json({ 
        message: "Email verified successfully",
        user: {
          id: user.id,
          email: user.email,
          name: [user.firstName, user.lastName].filter(Boolean).join(" ") || null,
          picture: user.profileImageUrl,
        }
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromError(error).toString() });
      }
      console.error("Verify error:", error);
      res.status(500).json({ message: "Verification failed" });
    }
  });

  // Resend verification code
  app.post("/api/auth/resend-verification", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
      
      if (!user) {
        return res.status(400).json({ message: "Account not found" });
      }
      
      if (user.emailVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }
      
      const code = generateVerificationCode();
      const expires = new Date(Date.now() + 15 * 60 * 1000);
      
      await db.update(users).set({
        verificationCode: code,
        verificationExpires: expires,
        updatedAt: new Date(),
      }).where(eq(users.email, email));
      
      await sendVerificationEmail(email, code, user.firstName || "there");
      
      res.json({ message: "Verification code sent" });
    } catch (error) {
      console.error("Resend verification error:", error);
      res.status(500).json({ message: "Failed to resend verification" });
    }
  });

  // Login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const validated = loginSchema.parse(req.body);
      
      const [user] = await db.select().from(users).where(eq(users.email, validated.email)).limit(1);
      
      if (!user || !user.passwordHash) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      const validPassword = await bcrypt.compare(validated.password, user.passwordHash);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      if (!user.emailVerified) {
        // Send new verification code
        const code = generateVerificationCode();
        const expires = new Date(Date.now() + 15 * 60 * 1000);
        
        await db.update(users).set({
          verificationCode: code,
          verificationExpires: expires,
        }).where(eq(users.email, validated.email));
        
        await sendVerificationEmail(validated.email, code, user.firstName || "there");
        
        return res.status(403).json({ 
          message: "Email not verified. A new verification code has been sent.",
          requiresVerification: true,
          email: validated.email
        });
      }
      
      // Create session
      (req.session as any).userId = user.id;
      
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: [user.firstName, user.lastName].filter(Boolean).join(" ") || null,
          picture: user.profileImageUrl,
        }
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: fromError(error).toString() });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Get current user
  app.get("/api/auth/user", async (req: Request, res: Response) => {
    const userId = (req.session as any)?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    res.json({
      id: user.id,
      email: user.email,
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || null,
      picture: user.profileImageUrl,
    });
  });

  // Logout
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
}

// Middleware to check if user is authenticated
export function isEmailAuthenticated(req: Request, res: Response, next: NextFunction) {
  const userId = (req.session as any)?.userId;
  
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  // Add user info to request
  (req as any).user = { claims: { sub: userId } };
  next();
}

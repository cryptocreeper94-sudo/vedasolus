import admin from "firebase-admin";
import type { Express, RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { authStorage } from "./replit_integrations/auth/storage";

let firebaseInitialized = false;

function initializeFirebase() {
  if (firebaseInitialized) return;
  
  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || "darkwave-auth",
    });
  }
  
  firebaseInitialized = true;
}

export function getFirebaseSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  });
}

export async function setupFirebaseAuth(app: Express) {
  initializeFirebase();
  app.set("trust proxy", 1);
  app.use(getFirebaseSession());

  app.post("/api/auth/firebase-login", async (req: any, res) => {
    try {
      const { idToken } = req.body;
      
      if (!idToken) {
        return res.status(400).json({ message: "ID token required" });
      }

      const decodedToken = await admin.auth().verifyIdToken(idToken);
      
      await authStorage.upsertUser({
        id: decodedToken.uid,
        email: decodedToken.email || null,
        firstName: decodedToken.name?.split(" ")[0] || null,
        lastName: decodedToken.name?.split(" ").slice(1).join(" ") || null,
        profileImageUrl: decodedToken.picture || null,
      });

      req.session.user = {
        id: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        expires_at: decodedToken.exp,
      };

      res.json({ success: true, user: req.session.user });
    } catch (error: any) {
      console.error("Firebase auth error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  });

  app.get("/api/auth/user", (req: any, res) => {
    if (req.session?.user) {
      return res.json(req.session.user);
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  app.post("/api/auth/logout", (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });
}

export const isFirebaseAuthenticated: RequestHandler = async (req: any, res, next) => {
  if (req.session?.user) {
    const now = Math.floor(Date.now() / 1000);
    if (now <= req.session.user.expires_at) {
      return next();
    }
  }
  
  res.status(401).json({ message: "Unauthorized" });
};

import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let initPromise: Promise<void> | null = null;

async function initFirebase(): Promise<void> {
  if (app) return;
  
  const response = await fetch("/api/firebase-config");
  const config = await response.json();
  
  app = initializeApp(config);
  auth = getAuth(app);
}

export async function getFirebaseApp(): Promise<FirebaseApp> {
  if (!initPromise) {
    initPromise = initFirebase();
  }
  await initPromise;
  return app!;
}

export async function getFirebaseAuth(): Promise<Auth> {
  if (!initPromise) {
    initPromise = initFirebase();
  }
  await initPromise;
  return auth!;
}

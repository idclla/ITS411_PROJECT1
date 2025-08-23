// auth.ts
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from "firebase/auth";

// 🔑 Firebase config extracted from google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyDoh6KJRzPZXFVABTlOZU4Qlo59hki8V_k",
  authDomain: "its411projectlacson.firebaseapp.com",
  projectId: "its411projectlacson",
  storageBucket: "its411projectlacson.firebasestorage.app",
  messagingSenderId: "744987062194",
  appId: "1:744987062194:android:0e08a1eb5c834736943eab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Register new user with Email/Password
 */
export const register = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Login user with Email/Password
 */
export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Logout user
 */
export const logout = async () => {
  return await signOut(auth);
};

/**
 * Subscribe to auth state changes (runs whenever user logs in/out)
 */
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Export auth instance if needed
export { auth };


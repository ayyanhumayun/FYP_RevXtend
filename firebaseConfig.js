import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPnISJoJ-ylzZLxWEFLYvAF4hDIY-SXUs",
  authDomain: "revxtend.firebaseapp.com",
  projectId: "revxtend",
  storageBucket: "revxtend.firebasestorage.app",
  messagingSenderId: "377579345103",
  appId: "1:377579345103:web:59bdb78292889d242313ba",
  measurementId: "G-8BXBGR433V",
};

// Initialize Firebase App and Auth only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Persist Auth state
});

export { app, auth };  // Export both app and auth

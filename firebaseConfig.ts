// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHdF8tAosmT_M99V2NLyaKYeASaW8Kd4s",
  authDomain: "lovely-56d33.firebaseapp.com",
  projectId: "lovely-56d33",
  storageBucket: "lovely-56d33.firebasestorage.app",
  messagingSenderId: "208972261524",
  appId: "1:208972261524:web:16d9697b6bd09b56aaac81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth (the thing Login.tsx needs)
export const auth = getAuth(app);

// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp( {
  apiKey: "AIzaSyDHdF8tAosmT_M99V2NLyaKYeASaW8Kd4s",
  authDomain: "lovely-56d33.firebaseapp.com",
  projectId: "lovely-56d33",
  storageBucket: "lovely-56d33.firebasestorage.app",
  messagingSenderId: "208972261524",
  appId: "1:208972261524:web:16d9697b6bd09b56aaac81",
});

export const db = getFirestore(app);


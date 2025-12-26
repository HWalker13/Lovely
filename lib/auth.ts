import { app } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});













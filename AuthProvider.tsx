import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { getPartnerProfile } from "./lib/api";

type AppStatus =
  | "loading"
  | "unauthenticated"
  | "needsOnboarding"
  | "ready";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  status: AppStatus;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  status: "loading",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<AppStatus>("loading");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      // 🔒 HARD GUARD: no user, no backend call
      if (!firebaseUser) {
        setUser(null);
        setStatus("unauthenticated");
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      setStatus("loading");

      try {
        const result = await getPartnerProfile(firebaseUser);

        if (!result.exists) {
          setStatus("needsOnboarding");
        } else {
          setStatus("ready");
        }
      } catch (err: any) {
        if (err?.status === 401) {
          setStatus("unauthenticated");
        } else {
          console.error("Failed to fetch partner profile:", err);
        }
      } finally {
        setLoading(false);
      }
    });

    return unsub;
  }, []);

  console.log("AUTH PROVIDER:", { user, loading, status });

  return (
    <AuthContext.Provider value={{ user, loading, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





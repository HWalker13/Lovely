import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getPartnerProfile } from "@/lib/api";
import { auth } from "@/lib/auth";

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
    let mounted = true;

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      // 🔒 HARD GUARD — NO USER, NO BACKEND CALLS
      if (!firebaseUser) {
        setUser(null);
        setStatus("unauthenticated");
        setLoading(false);
        return;
      }

      // User exists → begin authenticated flow
      setUser(firebaseUser);
      setStatus("loading");
      setLoading(true);

      try {
        // ✅ Only called when user is guaranteed to exist
        const result = await getPartnerProfile(firebaseUser);

        if (!mounted) return;

        if (result.exists) {
          setStatus("ready");
        } else {
          setStatus("needsOnboarding");
        }
      } catch (err: any) {
        if (!mounted) return;

        // Only treat auth failures as unauthenticated
        if (err?.status === 401) {
          console.warn("[AUTH] Backend rejected token");
          setStatus("unauthenticated");
        } else {
          console.error("[AUTH] Failed to fetch partner profile:", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

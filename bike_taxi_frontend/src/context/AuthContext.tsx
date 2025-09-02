"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setAuthTokenGetter } from "@/lib/api";

type User = { id?: number | string; name?: string; email?: string; role?: "user" | "driver" | string };

type AuthState = {
  token: string | null;
  user: User | null;
};

type Ctx = {
  auth: AuthState | null;
  setAuth: (s: AuthState) => void;
  logout: () => void;
};

const AuthContext = createContext<Ctx>({
  auth: null,
  setAuth: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<AuthState | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("bt.auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setAuthState(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    setAuthTokenGetter(() => auth?.token || null);
    if (auth) localStorage.setItem("bt.auth", JSON.stringify(auth));
    else localStorage.removeItem("bt.auth");
  }, [auth]);

  const setAuth = (s: AuthState) => setAuthState(s);
  const logout = () => setAuthState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

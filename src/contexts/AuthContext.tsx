import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
  full_name?: string;
  interests?: string[];
  skill_self_score?: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  pendingEmail: string | null;
  onboardingData: {
    interests: string[];
    skill_self_score: number;
  };
}

interface AuthContextType extends AuthState {
  setPendingEmail: (email: string) => void;
  login: (token: string, userId: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setOnboardingInterests: (interests: string[]) => void;
  setOnboardingScore: (score: number) => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: sessionStorage.getItem("aidigest_token"),
    user: null,
    pendingEmail: null,
    onboardingData: { interests: [], skill_self_score: 5 },
  });
  const [loading, setLoading] = useState(!!sessionStorage.getItem("aidigest_token"));

  useEffect(() => {
    if (state.token && !state.user) {
      api.getMe(state.token)
        .then((user) => {
          setState((s) => ({ ...s, user }));
        })
        .catch(() => {
          sessionStorage.removeItem("aidigest_token");
          setState((s) => ({ ...s, token: null }));
        })
        .finally(() => setLoading(false));
    }
  }, [state.token, state.user]);

  const setPendingEmail = useCallback((email: string) => {
    setState((s) => ({ ...s, pendingEmail: email }));
  }, []);

  const login = useCallback((token: string, userId: string) => {
    sessionStorage.setItem("aidigest_token", token);
    setState((s) => ({ ...s, token, user: s.user ? s.user : { id: userId, email: s.pendingEmail || "" } }));
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("aidigest_token");
    setState({ token: null, user: null, pendingEmail: null, onboardingData: { interests: [], skill_self_score: 5 } });
  }, []);

  const setUser = useCallback((user: User) => {
    setState((s) => ({ ...s, user }));
  }, []);

  const setOnboardingInterests = useCallback((interests: string[]) => {
    setState((s) => ({ ...s, onboardingData: { ...s.onboardingData, interests } }));
  }, []);

  const setOnboardingScore = useCallback((score: number) => {
    setState((s) => ({ ...s, onboardingData: { ...s.onboardingData, skill_self_score: score } }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setPendingEmail,
        login,
        logout,
        setUser,
        setOnboardingInterests,
        setOnboardingScore,
        isAuthenticated: !!state.token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

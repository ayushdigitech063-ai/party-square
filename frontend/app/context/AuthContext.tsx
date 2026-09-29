"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface AuthContextType {
  admin: AdminUser | null;
  login: (userData: AdminUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  admin: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("adminUser");
    if (stored) {
      try {
        setAdmin(JSON.parse(stored));
      } catch {
        localStorage.removeItem("adminUser");
      }
    }
    setLoaded(true);
  }, []);

  const login = (userData: AdminUser) => {
    setAdmin(userData);
    localStorage.setItem("adminUser", JSON.stringify(userData));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminUser");
  };

  if (!loaded) return null;

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

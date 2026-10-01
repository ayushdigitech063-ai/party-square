"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt?: string;
  token: string;
}

interface AuthContextType {
  user: UserProfile | null;
  admin: UserProfile | null;
  login: (userData: UserProfile) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isUserAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  admin: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  isUserAuthenticated: false,
  isAdmin: false,
  isSuperAdmin: false,
  isLoginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check both logged in customer and admin user
    const storedUser = localStorage.getItem("party_user") || localStorage.getItem("adminUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("party_user");
        localStorage.removeItem("adminUser");
      }
    }
    setLoaded(true);
  }, []);

  const login = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem("party_user", JSON.stringify(userData));
    if (userData.role === "admin" || userData.role === "superadmin") {
      localStorage.setItem("adminUser", JSON.stringify(userData));
    }
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("party_user");
    localStorage.removeItem("adminUser");
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  if (!loaded) return null;

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  const isSuperAdmin = user?.role === "superadmin";

  return (
    <AuthContext.Provider
      value={{
        user,
        admin: isAdmin ? user : null,
        login,
        logout,
        isAuthenticated: !!user,
        isUserAuthenticated: !!user,
        isAdmin,
        isSuperAdmin,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

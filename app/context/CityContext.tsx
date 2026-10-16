"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchCities, CityItem } from "@/app/lib/api";

const DEFAULT_CITY_NAMES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "Faridabad",
  "Ghaziabad",
  "Gurugram",
  "Jaipur",
  "Kolkata",
  "Lucknow",
  "Mangalore",
  "Mysore",
  "Noida",
  "Pune",
  "Thane",
];

interface CityContextType {
  selectedCity: string;
  setSelectedCity: (cityName: string) => void;
  cities: CityItem[];
  cityNames: string[];
  loadingCities: boolean;
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  refreshCities: () => Promise<void>;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState<string>("Delhi");
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  // Initialize selectedCity from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("party_selected_city");
      if (saved) {
        setSelectedCityState(saved);
      }
    } catch (e) {
      console.warn("Could not read city from localStorage", e);
    }
  }, []);

  // Fetch active cities from database
  const loadCities = async () => {
    try {
      setLoadingCities(true);
      const data = await fetchCities(false);
      if (Array.isArray(data) && data.length > 0) {
        setCities(data);
      } else {
        // Fallback default objects
        setCities(
          DEFAULT_CITY_NAMES.map((name, i) => ({
            _id: `default-${i}`,
            name,
            isActive: true,
            isPopular: i < 6,
            order: i,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load cities from API:", err);
      setCities(
        DEFAULT_CITY_NAMES.map((name, i) => ({
          _id: `default-${i}`,
          name,
          isActive: true,
          isPopular: i < 6,
          order: i,
        }))
      );
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    loadCities();
  }, []);

  const setSelectedCity = (cityName: string) => {
    if (!cityName) return;
    setSelectedCityState(cityName);
    try {
      localStorage.setItem("party_selected_city", cityName);
      if (typeof document !== "undefined") {
        document.cookie = `party_selected_city=${encodeURIComponent(cityName)}; path=/; max-age=31536000`;
      }
    } catch (e) {
      console.warn("Could not save city to localStorage", e);
    }
  };

  const cityNames = cities.length > 0 ? cities.map((c) => c.name) : DEFAULT_CITY_NAMES;

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        cities,
        cityNames,
        loadingCities,
        isCityModalOpen,
        setIsCityModalOpen,
        refreshCities: loadCities,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_URL } from "@/config";

export interface CityItem {
  _id?: string;
  name: string;
  state?: string;
  icon?: string;
  isActive?: boolean;
  isPopular?: boolean;
  order?: number;
}

interface CityContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  cities: string[];
  cityObjects: CityItem[];
  isCityModalOpen: boolean;
  openCityModal: () => void;
  closeCityModal: () => void;
  selectCityAndClose: (city: string) => void;
  isLoadingCities: boolean;
  refreshCities: () => Promise<void>;
  preloaderFinished: boolean;
  setPreloaderFinished: (finished: boolean) => void;
}

const FALLBACK_CITIES = [
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

const CityContext = createContext<CityContextType>({
  selectedCity: "Delhi",
  setSelectedCity: () => {},
  cities: FALLBACK_CITIES,
  cityObjects: [],
  isCityModalOpen: false,
  openCityModal: () => {},
  closeCityModal: () => {},
  selectCityAndClose: () => {},
  isLoadingCities: false,
  refreshCities: async () => {},
  preloaderFinished: false,
  setPreloaderFinished: () => {},
});

export const useCity = () => useContext(CityContext);

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState<string>("Delhi");
  const [cities, setCities] = useState<string[]>(FALLBACK_CITIES);
  const [cityObjects, setCityObjects] = useState<CityItem[]>([]);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  // Fetch active cities from API
  const fetchCities = async () => {
    try {
      setIsLoadingCities(true);
      const res = await fetch(`${API_URL}/api/cities`);
      if (res.ok) {
        const data: CityItem[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCityObjects(data);
          const cityNames = data.map((c) => c.name);
          setCities(cityNames);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not load dynamic cities from backend, using default list.", e);
    } finally {
      setIsLoadingCities(false);
    }
  };

  useEffect(() => {
    fetchCities();

    // Check localStorage for saved city
    if (typeof window !== "undefined") {
      const savedCity = localStorage.getItem("selectedCity");
      if (savedCity) {
        setSelectedCityState(savedCity);
      }
    }
  }, []);

  // When preloader finishes, check if first time visitor (no city chosen yet)
  useEffect(() => {
    if (preloaderFinished && !hasPrompted) {
      if (typeof window !== "undefined") {
        const hasSelectedCity = localStorage.getItem("hasSelectedCity");
        if (!hasSelectedCity) {
          // Open city modal automatically after preloader finishes
          setIsCityModalOpen(true);
          setHasPrompted(true);
        }
      }
    }
  }, [preloaderFinished, hasPrompted]);

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCity", city);
    }
  };

  const selectCityAndClose = (city: string) => {
    setSelectedCityState(city);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCity", city);
      localStorage.setItem("hasSelectedCity", "true");
    }
    setIsCityModalOpen(false);
  };

  const openCityModal = () => setIsCityModalOpen(true);
  const closeCityModal = () => setIsCityModalOpen(false);

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        cities,
        cityObjects,
        isCityModalOpen,
        openCityModal,
        closeCityModal,
        selectCityAndClose,
        isLoadingCities,
        refreshCities: fetchCities,
        preloaderFinished,
        setPreloaderFinished,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

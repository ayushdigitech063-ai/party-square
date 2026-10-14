"use client";

import { useEffect } from "react";
import { useCity } from "@/app/context/CityContext";

interface Props {
  cityName: string;
}

export default function CitySync({ cityName }: Props) {
  const { selectedCity, setSelectedCity } = useCity();

  useEffect(() => {
    if (cityName && (!selectedCity || selectedCity.toLowerCase() !== cityName.toLowerCase())) {
      setSelectedCity(cityName);
    }
  }, [cityName, selectedCity, setSelectedCity]);

  return null;
}

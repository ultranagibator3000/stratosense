"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic import (Leaflet only works client-side)
const Map = dynamic(() => import("./components/Map"), { ssr: false });

export interface AirQualityData {
  city: string;
  lat: number;
  lon: number;
  no2: number;
  o3: number;
  pm25: number;
  pm10: number;
}

export default function Home() {
  const [data, setData] = useState<AirQualityData | null>(null);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 text-center text-2xl font-bold shadow">
        NASA TEMPO Air Quality Dashboard
      </header>

      {/* Map */}
      <div className="flex-grow">
        <Map setData={setData} />
      </div>

      {/* Info Card */}
      {data && (
        <div className="bg-white shadow p-4 fixed bottom-4 left-1/2 transform -translate-x-1/2 rounded-lg max-w-md w-[90%]">
          <h2 className="font-semibold text-lg mb-2">{data.city}</h2>
          <p>NO₂: {data.no2}</p>
          <p>O₃: {data.o3}</p>
          <p>PM2.5: {data.pm25}</p>
          <p>PM10: {data.pm10}</p>
        </div>
      )}
    </main>
  );
}

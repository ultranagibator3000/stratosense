"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AirQualityData } from "./types/airQuality";

// Dynamically load the map client-side only
const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default function Home() {
  const [data, setData] = useState<AirQualityData | null>(null);

  return (
      <main className="min-h-screen flex flex-col items-center bg-gray-50">
          {/* Header */}
          <header className="bg-blue-700 text-white p-4 text-center text-2xl font-bold shadow w-full">
              NASA TEMPO Air Quality Dashboard
          </header>

          {/* Section: Map */}
          <section className="mt-8 w-full flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4">Air Quality Overview</h2>
              <Map setData={setData}/>
          </section>

          {/* Info Card */}
          {data && (
              <div className="bg-white shadow p-4 mt-6 rounded-lg max-w-md w-[90%]">
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

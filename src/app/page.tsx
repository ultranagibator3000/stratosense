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
          <head>
              <link
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                  rel="stylesheet"
                  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                  crossOrigin="anonymous"
              />
          </head>
          {/* Header */}
          <header className="bg-blue-700 text-white p-4 text-center text-2xl font-bold shadow w-full">
              NASA TEMPO Air Quality Dashboard dkjnvlkvlkdsjvlkdlkvn
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
          <script
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
              crossOrigin="anonymous"
          ></script>
      </main>
  );
}

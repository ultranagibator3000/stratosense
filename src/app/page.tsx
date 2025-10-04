"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AirQualityData } from "./types/airQuality";

// Dynamically load the map client-side only
const Map = dynamic(() => import("./components/Map"), { ssr: false });

function getAQILevel(pm25: number, pm10: number) {
    // Берем худший показатель
    const aqi = Math.max(pm25, pm10);

    if (aqi <= 50) {
        return { level: "Good", advice: "Air quality is good. You can enjoy outdoor activities." };
    } else if (aqi <= 100) {
        return { level: "Moderate", advice: "Air quality is acceptable. Sensitive individuals should limit prolonged outdoor exertion." };
    } else if (aqi <= 150) {
        return { level: "Unhealthy for Sensitive Groups", advice: "Children, elderly, and people with heart or lung conditions should reduce outdoor activity." };
    } else if (aqi <= 200) {
        return { level: "Unhealthy", advice: "Wear a mask outdoors, avoid prolonged activity, and keep windows closed." };
    } else if (aqi <= 300) {
        return { level: "Very Unhealthy", advice: "Avoid going outside. Use air purifiers indoors if available." };
    } else {
        return { level: "Hazardous", advice: "Health alert: everyone may experience serious health effects. Stay indoors at all costs." };
    }
}

function getMedicalAdvice(data: AirQualityData) {
    if (!data) return "";

    const { pm25, pm10 } = data;
    const { level, advice } = getAQILevel(pm25, pm10);

    return `${level} – ${advice}`;
}

export default function Home() {
    const [data, setData] = useState<AirQualityData | null>(null);

    useEffect(() => {
        // вместо API сразу подставляем mock данные
        const sampleData: AirQualityData = {
            no2: 40,
            o3: 90,
            pm25: 160,
            pm10: 120,
            predictedNo2: 50,
            predictedO3: 100,
            predictedPm25: 170,
            predictedPm10: 130,
        };
        setData(sampleData);
    }, []);

    return (
        <main className="w-100">
            {/* Header */}
            <header className="mb-5">
                <div className="w-100 p-4 text-center shadow-lg">
                    <h1><i>StratoSense</i></h1>
                </div>
            </header>

            {/* Section: Map */}
            <div className="w-75 m-auto">
                <div className="w-100 text-center">
                    <h2>Air Quality Live Map</h2>
                </div>
                <Map setData={setData}/>
            </div>

            {/* Info Card */}
            {data && (
                <div className="m-auto w-75 d-flex">
                    <div className="row py-4 w-100">
                        <div className="col-6 p-4">
                            <h2 className="text-center">Live data</h2>
                            <p className="fs-3">NO₂: {data.no2} ppm</p>
                            <p className="fs-3">O₃: {data.o3} ppm</p>
                            <p className="fs-3">PM2.5: {data.pm25} μ/m^3</p>
                            <p className="fs-3">PM10: {data.pm10} μ/m^3</p>
                        </div>
                        <div className="col-6 p-4">
                            <h2 className="text-center">Predicted data</h2>
                            <p className="fs-3">NO₂: {data.predictedNo2} ppm</p>
                            <p className="fs-3">O₃: {data.predictedO3} ppm</p>
                            <p className="fs-3">PM2.5: {data.predictedPm25} μ/m^3</p>
                            <p className="fs-3">PM10: {data.predictedPm10} μ/m^3</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Medical Advice */}
            {data && (
                <div className="my-5 w-75 m-auto p-4">
                    <h2>Medical Advice</h2>
                    <p className="fs-4">{getMedicalAdvice(data)}</p>
                </div>
            )}
        </main>
    );
}
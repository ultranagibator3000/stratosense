import { NextResponse } from "next/server";

export async function GET() {

  const sample = [
    { city: "New York", lat: 40.7128, lon: -74.006, no2: 18, o3: 22, pm25: 12, pm10: 25 },
    { city: "Los Angeles", lat: 34.0522, lon: -118.2437, no2: 25, o3: 30, pm25: 20, pm10: 35 },
    { city: "Chicago", lat: 41.8781, lon: -87.6298, no2: 15, o3: 18, pm25: 10, pm10: 22 },
  ];

  return NextResponse.json(sample);
}

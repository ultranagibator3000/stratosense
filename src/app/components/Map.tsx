"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { AirQualityData } from "../types/airQuality";

// Fix default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  setData: (data: AirQualityData) => void;
}

export default function Map({ setData }: MapProps) {
  const [markers, setMarkers] = useState<AirQualityData[]>([]);

  useEffect(() => {
    fetch("/api/tempo")
      .then((res) => res.json())
      .then((data) => setMarkers(data))
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={[39, -95]} // Center of USA
      zoom={4}
      className="h-[400px] w-[80%] mx-auto rounded-lg shadow-md border"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((point, idx) => (
        <Marker
          key={idx}
          position={[point.lat, point.lon]}
          eventHandlers={{
            click: () => setData(point),
          }}
        >
          <Popup>
            <strong>{point.city}</strong>
            <br />
            NO₂: {point.no2}
            <br />
            O₃: {point.o3}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

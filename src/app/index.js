import { useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

export default function Home() {
  const [info, setInfo] = useState(null);

  const cities = [
    { name: "Los Angeles", lat: 34.05, lon: -118.25 },
    { name: "New York", lat: 40.71, lon: -74.01 },
    { name: "kjfhlifhjkshkshx", lat: 29.76, lon: -95.36 },
  ];

  const handleClick = async (city) => {
    const res = await fetch(
      `https://api.nasa.gov/planetary/earth/assets?lon=${city.lon}&lat=${city.lat}&date=2023-09-01&dim=0.1&api_key=DEMO_KEY`
    );
    const data = await res.json();
    setInfo({ city: city.name, data });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[39, -95]} zoom={4} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap'
        />

        {cities.map((city, i) => (
          <Marker
            key={i}
            position={[city.lat, city.lon]}
            eventHandlers={{ click: () => handleClick(city) }}
          >
            <Popup>
              <strong>{city.name}</strong><br />
              {info?.city === city.name && info.data?.url ? (
                <>
                  <img src={info.data.url} alt="NASA image" width="200" />
                  <p>Imagery date: {info.data.date}</p>
                </>
              ) : (
                <p>Click to load NASA satellite image</p>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

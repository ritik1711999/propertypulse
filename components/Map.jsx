"use client";
import { useEffect, useState } from "react";
import getGeocode from "@/app/actions/getGeocode";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Spinner from "./Spinner";

function Map({ propertyloc }) {
  const [position, setPosition] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getGeocodeData = async () => {
      const geoCodeInfo = await getGeocode(propertyloc);
      console.log("geoCodeing________", geoCodeInfo);
      setPosition(geoCodeInfo);
      setLoading(false);
    };

    getGeocodeData();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return position.length > 0 ? (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}></Marker>
    </MapContainer>
  ) : (
    <p>Unable to fetch location</p>
  );
}

export default Map;

import React from "react";
import "./GoogleMaps.scss";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import mapstyles from "./mapStyles";
export default function GoogleMapsElement() {
  const options = {
    styles: mapstyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };
  const center = {
    lat: 45.5316,
    lng: -122.6668,
  };
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB9QBa0YuuN4CBb-4CMOs3JExZnsZ5juv0",
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className="GoogleMaps">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
      />
    </div>
  );
}

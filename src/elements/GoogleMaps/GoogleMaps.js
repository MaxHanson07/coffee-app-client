import React, { useCallback, useEffect, useRef, useState } from "react";
import "./GoogleMaps.scss";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
export default function GoogleMapsElement() {
  const [selectedState, setSelectedState] = useState(null);
  const [markersState, setMarkersState] = useState([
    {
      id: 1,
      title: "Proud Mary",
      lat: 45.558861,
      lng: -122.644432,
    },
  ]);

  useEffect(() => {
    setSelectedState();
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: 45.5316,
    lng: -122.6668,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <>
      <div className="GoogleMaps">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {markersState.map((marker) => {
            return (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => setSelectedState(marker)}
              />
            );
          })}
        </GoogleMap>
      </div>
      <div className="Info">
        {!selectedState ? null : <p>{selectedState.title}</p>}
      </div>
    </>
  );
}

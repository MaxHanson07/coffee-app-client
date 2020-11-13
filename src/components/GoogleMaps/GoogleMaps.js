import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import SearchBar from "../SearchBar/SearchBar";
import "./GoogleMaps.scss";
import Info from "../Info/Info";

const libraries = ["places"];
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

export default function GoogleMapsElement() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [userLocation, setUserLocation] = useState(null);
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

    if (!navigator.geolocation) {
      return;
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation(position);
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const handleMarkerOnClick = (marker) => {
    setSelectedState(marker);
    const lat = marker.lat;
    const lng = marker.lng;
    panTo({ lat, lng });
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <>
      <SearchBar panTo={panTo} />
      <div className="GoogleMaps">
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {!userLocation ? null : (
            <Marker
              key={userLocation.coords.latitude}
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              position={{
                lat: userLocation.coords.latitude,
                lng: userLocation.coords.longitude,
              }}
            />
          )}
          {markersState.map((marker) => {
            return (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerOnClick(marker)}
              />
            );
          })}
        </GoogleMap>
      </div>
      <div className="Info">
        {!selectedState ? null : <p>{selectedState.title}</p>}
      </div>
      <Info />
    </>
  );
}

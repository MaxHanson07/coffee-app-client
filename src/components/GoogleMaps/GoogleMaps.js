import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import SearchBar from "../SearchBar/SearchBar";
import Info from "../Info/Info";
import CustomMarker from "../../Images/googlemarker.png";
import "./GoogleMaps.scss";
import API from "../../utils/API";

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
  const [markersState, setMarkersState] = useState(null);

  useEffect(() => {
    setSelectedState();

    API.getAllCafes()
      .then((res) => {
        setMarkersState(res.data);
      })
      .catch((err) => console.log(err));

    if (!navigator.geolocation) {
      return;
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation(position);

        setTimeout(function () {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }, 10);
      });
    }
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
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
                key={marker._id}
                icon={CustomMarker}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerOnClick(marker)}
              />
            );
          })}
        </GoogleMap>
      </div>

      {!selectedState ? (
        markersState.map((marker) => {
          if (marker.is_featured === true) {
            return (
              <Info
                key={marker._id}
                id={marker._id}
                name={marker.name}
                image_url={marker.photos[0].photo_url}
                address={marker.formatted_address}
                website={marker.website}
                instagram_link={marker.instagram_url}
                phone={marker.formatted_phone_number}
                roaster={marker.roasters}
                likes={marker.likes}
              />
            );
          }
        })
      ) : (
        <Info
          key={selectedState._id}
          id={selectedState._id}
          name={selectedState.name}
          image_url={selectedState.photos[0].photo_url}
          address={selectedState.formatted_address}
          website={selectedState.website}
          instagram_link={selectedState.instagram_url}
          phone={selectedState.formatted_phone_number}
          roaster={selectedState.roasters}
          likes={selectedState.likes}
        />
      )}
    </>
  );
}

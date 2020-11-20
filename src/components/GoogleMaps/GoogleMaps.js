import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import SearchBar from "../SearchBar/SearchBar";
import Info from "../Info/Info";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
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
  borderRadius: "10px",
  width: "100%",
  height: "100%",
};
const center = {
  lat: 45.5316,
  lng: -122.6668,
};

export default function GoogleMapsElement(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [markersState, setMarkersState] = useState([]);
  const [selectedOn, setSelectedOn] = useState(true);
  const [featured, setFeatured] = useState(null);

  const getCafes = useRef(() => {});
  getCafes.current = async () => {
    try {
      const { data } = await API.getAllCafes();
      setMarkersState(data);
      getUserLocation();
    } catch (err) {}
  };

  useEffect(() => {
    getCafes.current();
  }, []);

  const getFeatured = useRef(() => {});
  getFeatured.current = () => {
    const featured = markersState.find((marker) => marker.is_featured === true);
    setFeatured(featured);
  };

  useEffect(() => {
    getFeatured.current();
  }, [markersState]);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current?.panTo({ lat, lng });
    mapRef.current?.setZoom(13);
  }, []);

  const handleMarkerOnClick = (marker) => {
    setSelectedOn(true);
    setSelectedState(marker);
    const lat = marker.lat;
    const lng = marker.lng;
    panTo({ lat, lng });
  };

  const getUserLocation = () => {
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
  };

  const onMapClick = useCallback((e) => {
    setSelectedOn(false);
  }, []);
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <>
      <SearchBar panTo={panTo} />
      <ProfileInfo
        profileState={props.profileState}
        handleCafeClick={handleMarkerOnClick}
      />
      <div className="GoogleMaps">
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
          onClick={onMapClick}
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

      {!featured && !selectedState ? null : !selectedState ? (
        <Info
          className={selectedOn === true ? "Info" : "Info hide"}
          key={featured._id}
          id={featured._id}
          name={featured.name}
          image_url={!featured.photos ? null : featured.photos[0].photo_url}
          address={featured.formatted_address}
          website={featured.website}
          instagram_link={featured.instagram_url}
          phone={featured.formatted_phone_number}
          likes={featured.likes}
          roasterName={!featured.roasters[0] ? null : featured.roasters[0].name}
          roasterLink={
            !featured.roasters[0] ? null : featured.roasters[0].website
          }
          profileState={props.profileState}
        />
      ) : (
        <Info
          className={selectedOn === true ? "Info" : "Info hide"}
          key={selectedState._id}
          id={selectedState._id}
          name={selectedState.name}
          image_url={
            !selectedState.photos ? null : selectedState.photos[0].photo_url
          }
          address={selectedState.formatted_address}
          website={selectedState.website}
          instagram_link={selectedState.instagram_url}
          phone={selectedState.formatted_phone_number}
          likes={selectedState.likes}
          roasterName={
            !selectedState.roasters[0] ? null : selectedState.roasters[0].name
          }
          roasterLink={
            !selectedState.roasters[0]
              ? null
              : selectedState.roasters[0].website
          }
          profileState={props.profileState}
        />
      )}
    </>
  );
}

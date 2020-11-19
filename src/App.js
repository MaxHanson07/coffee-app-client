import React, { useState } from "react";
import GoogleMapsElement from "./components/GoogleMaps/GoogleMaps";
import "./App.scss";
import Header from "./components/Header/Header";
import Request from "./components/Request/Request";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";

function App() {
  const [profileState, setProfileState] = useState({
    user_id: "",
    name: "",
    photo_url: "",
    email: "",
    liked_cafes: "",
    isLoggedIn: false,
  });

  return (
    <div className="App">
      <Header
        isLoggedIn={profileState.isLoggedIn}
        setProfileState={setProfileState}
      />
      <ProfileInfo profileState={profileState} />
      <GoogleMapsElement />
    </div>
  );
}

export default App;

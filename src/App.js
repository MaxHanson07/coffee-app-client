import React, { useState } from "react";
import GoogleMapsElement from "./components/GoogleMaps/GoogleMaps";
import "./App.scss";
import Header from "./components/Header/Header";

function App() {
  const [profileState, setProfileState] = useState({
    user_id: "",
    name: "",
    photo_url: "",
    email: "",
    check_ins: [],
    isLoggedIn: false,
  });

  return (
    <div className="App">
      <Header
        isLoggedIn={profileState.isLoggedIn}
        setProfileState={setProfileState}
      />
      <GoogleMapsElement profileState={profileState} />
    </div>
  );
}

export default App;

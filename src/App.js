import React, { useState } from "react";
import GoogleMapsElement from "./components/GoogleMaps/GoogleMaps";
import "./SCSS/resets.scss";
import "./SCSS/App.scss";
import Header from "./components/Header/Header";
import Request from "./components/Request/Request";
import API from "./utils/API"

import { GoogleLogin, GoogleLogout } from 'react-google-login';

function App() {

  const [profileState, setProfileState] = useState({
    user_id: "",
    name: "",
    photo_url: "",
    email: "",
    isLoggedIn: false
  })

  const clientId =
    '280932498066-hj1erov9gsausin5g9v06g8j90md2egm.apps.googleusercontent.com';

  const onSuccess = async (res) => {
    console.log('Login Success: currentUser:', res);
    try {
      let userData = await API.login({ tokenId: res.tokenId })
      setProfileState({
        user_id: userData.user_id,
        name: userData.name,
        photo_url: userData.photo_url,
        email: userData.email,
        isLoggedIn: true
      })
      // fetchUserData()
    } catch (err) {
      console.error(err)
    }
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const logOutSuccess = () => {
    console.log("Logged out!")
  }

  return (
    <div className="App">
      <Header />
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={logOutSuccess}
      />
      <GoogleMapsElement />
      <Request />
    </div>
  );
}

export default App;

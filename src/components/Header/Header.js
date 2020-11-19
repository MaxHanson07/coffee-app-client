import React from "react";
import Logo from "../../Images/logo.png";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn"
import "./Header.scss";


export default function Header({ isLoggedIn, setProfileState }) {
  return (
    <>
      <header>
        <img className="logo" src={Logo} alt="Coffee App Logo" />
        <GoogleSignIn
          isLoggedIn={isLoggedIn}
          setProfileState={setProfileState}
        />
      </header>
    </>
  );
}

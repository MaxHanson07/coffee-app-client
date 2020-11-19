import React from "react"
import { GoogleLogout } from 'react-google-login';


export default function Logout({ setProfileState }) {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const logOutSuccess = () => {
        setProfileState({
            user_id: "",
            name: "",
            photo_url: "",
            email: "",
            liked_cafes: [],
            isLoggedIn: false
        })
    }

    return (
        <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logOutSuccess}
        />
    )
}
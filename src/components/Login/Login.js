import React from "react"
import { GoogleLogin } from 'react-google-login';
import API from "../../utils/API"

export default function Login({ setProfileState }) {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    console.log(clientId)

    const onSuccess = async (res) => {
        try {
            let { data } = await API.login({ tokenId: res.tokenId })
            setProfileState({
                user_id: data.user_id,
                name: data.name,
                photo_url: data.photo_url,
                email: data.email,
                liked_cafes: data.favorite_cafes,
                isLoggedIn: true
            })
        } catch (err) {
            console.error(err)
        }
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={true}
        />
    )
}
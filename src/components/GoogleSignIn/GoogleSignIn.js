import React from "react"
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import API from "../../utils/API"

export default function GoogleSignIn({ isLoggedIn, setProfileState }) {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const onSuccess = async (res) => {
        try {
            let { data } = await API.login({ tokenId: res.tokenId })
            setProfileState({
                user_id: data.user_id,
                name: data.name,
                photo_url: data.photo_url,
                email: data.email,
                check_ins: data.check_ins,
                isLoggedIn: true
            })
        } catch (err) {
            console.error(err)
        }
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };

    const logOutSuccess = () => {
        setProfileState({
            user_id: "",
            name: "",
            photo_url: "",
            email: "",
            check_ins: [],
            isLoggedIn: false
        })
    }

    return (
        <div className="signIn">
            {
                !isLoggedIn ? (
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        render={renderProps => (
                            <button className="signInBtn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <img src="google.svg" style={{height: "20px"}}></img>
                                <span>  Login</span>
                            </button>
                        )}
                        cookiePolicy={'single_host_origin'}
                        style={{ marginTop: '100px' }}
                        isSignedIn={true}
                    />) : (
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Logout"
                            onLogoutSuccess={logOutSuccess}
                            render={renderProps => (
                                <button className="signInBtn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <img src="google.svg" style={{height: "20px"}}></img>
                                    <span>  Logout</span>
                                </button>
                            )}
                        />
                    )
            }
        </div>
    )
}
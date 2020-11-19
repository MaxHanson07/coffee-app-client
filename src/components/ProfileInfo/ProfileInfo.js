import React from "react";
import "./ProfileInfo.scss";

export default function ProfileInfo({profileState}) {
  
  return (
    <>
      {profileState.isLoggedIn ? (
        <div className="profile-info">
        <h4>{profileState.name}</h4>
        <img className="profile-img" src={profileState.photo_url} alt="profile" />
      </div>
        ) : null}
    </>
  );
}

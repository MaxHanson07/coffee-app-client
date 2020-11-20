import React from "react";
import Button from "../Button/Button";
import "./ProfileInfo.scss";

export default function ProfileInfo({ profileState, handleCafeClick }) {
  // Removes duplicate cafes
  let check_ins = [...profileState.check_ins].reduce(function (
    accumulator,
    current
  ) {
    if (checkIfAlreadyExist(current)) {
      return accumulator;
    } else {
      return accumulator.concat([current]);
    }

    function checkIfAlreadyExist(currentVal) {
      return accumulator.some(function (item) {
        return item.cafe_id.name === currentVal.cafe_id.name;
      });
    }
  },
  []);

  if (check_ins.length > 3) {
    check_ins = check_ins.slice(check_ins.length - 4, check_ins.length - 1);
  }

  return (
    <>
      {profileState.isLoggedIn ? (
        <div className="profile-info">
          <img
            className="profile-img"
            src={profileState.photo_url}
            alt="profile"
          />
          <h4>{profileState.name}</h4>
          <div className="recentCafes">
            <h5>Your recent cafes</h5>
            {check_ins.map((check_in) => {
              return (
                <Button
                  className="recentCafeBtn"
                  key={check_in.timestamp}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCafeClick(check_in.cafe_id);
                  }}
                  name={check_in.cafe_id.name}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}

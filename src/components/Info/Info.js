import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
  faGlobe,
  faPhone,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import API from "../../utils/API";
import "./Info.scss";

export default function Info(props) {
  const [liked, setLiked] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(true);
  const [success, setSuccess] = useState(false);

  // Check if Check In should be displayed. Check again every time state changes, or at least every minute
  const checkCheckIn = useRef(() => {});
  checkCheckIn.current = () => {
    let lastCheckIn = localStorage.getItem("checkIn" + props.id);
    if (lastCheckIn) {
      if (Date.now() - lastCheckIn < 36e5) {
        setCanCheckIn(false);
      } else {
        localStorage.removeItem("checkIn" + props.id);
        setCanCheckIn(true);
      }
    } else {
      setCanCheckIn(true);
    }
    setTimeout(checkCheckIn.current, 2000);
  };

  useEffect(() => {
    checkCheckIn.current();
  }, [props, canCheckIn]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isLiked === false) {
      setLiked(liked + 1);
      setIsLiked(true);
      API.addLike(props.id, { likeValue: liked });
    }

    if (isLiked === true) {
      return;
    }
  };

  const checkIn = async (cafe_id, user_id) => {
    try {
      localStorage.setItem("checkIn" + cafe_id, Date.now());
      let data = {
        user_id: user_id,
        date: Date.now(),
      };
      await API.checkIn(cafe_id, data);
      setCanCheckIn(false);
      setSuccess(true);
      setTimeout(function () {
        setSuccess(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className={props.className}>
        <h4>{props.name}</h4>
        {!props.image_url ? null : (
          <img className="cafe-img" src={props.image_url} alt={props.name} />
        )}
        <div className="Response">
          {success === true ? <p>Checked In!</p> : null}
        </div>
        <div className="check-like">
          <div className="like">
            <h5>Likes:</h5>
            <p>{liked}</p>
            <Button
              className="likeBtn"
              onClick={handleFormSubmit}
              name={<FontAwesomeIcon icon={faThumbsUp} size="1x" />}
            />
          </div>
          {props.profileState?.isLoggedIn && canCheckIn ? (
            <div className="checkedIn">
              <button
                className="recentCafeBtn"
                onClick={(e) => {
                  e.preventDefault();
                  checkIn(props.id, props.profileState.user_id);
                }}
              >
                <FontAwesomeIcon icon={faCheck} size="1x" />
                &nbsp;Check in
              </button>
            </div>
          ) : null}
        </div>

        <div className="address">
          <h5>Address</h5>
          <p>{props.address}</p>
        </div>
        <div className="connect">
          <h5>Connect</h5>
          <ul>
            {!props.website ? null : (
              <li>
                <a href={props.website} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGlobe} size="1x" /> Website
                </a>
              </li>
            )}
            {!props.instagram_link ? null : (
              <li>
                <a
                  href={"https://www.instagram.com/" + props.instagram_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagramSquare} size="1x" />{" "}
                  {props.instagram_link}
                </a>
              </li>
            )}
            {!props.phone ? null : (
              <li>
                <FontAwesomeIcon icon={faPhone} size="1x" /> {props.phone}
              </li>
            )}
          </ul>
        </div>
        <div className="roaster">
          <h5>Roaster</h5>
          <h4>
            <a href={props.roasterLink} rel="noreferrer" target="_blank">
              {props.roasterName}
            </a>
          </h4>
        </div>
      </div>
      <Footer />
    </>
  );
}

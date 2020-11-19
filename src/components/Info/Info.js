import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
  faGlobe,
  faPhone,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import API from "../../utils/API";
import "./Info.scss";

export default function Info(props) {
  const [liked, setLiked] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(true);

  // Check if Check In should be displayed. Check again every time state changes, or at least every minute
  useEffect(() => {
    checkCheckIn()
  }, [props, canCheckIn])

  function checkCheckIn() {
    let lastCheckIn = localStorage.getItem("checkIn" + props.id)
    if (lastCheckIn) {
      if (Date.now() - lastCheckIn < 36e5) {
        setCanCheckIn(false)
      } else {
        localStorage.removeItem("checkIn" + props.id)
        setCanCheckIn(true)
      }
    } else {
      setCanCheckIn(true)
    }
    setTimeout(checkCheckIn, 2000)
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (isLiked === false) {
      setLiked(props.likes + 1);
      setIsLiked(true);
      API.addLike(props.id, { likeValue: liked });
    }

    if (isLiked === true) {
      return;
    }
  }

  async function checkIn(cafe_id, user_id) {
    try {
      localStorage.setItem("checkIn" + cafe_id, Date.now())
      let data = {
        user_id: user_id,
        date: Date.now()
      }
      await API.checkIn(cafe_id, data)
      setCanCheckIn(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className="Info">
        <h4>{props.name}</h4>
        {!props.image_url ? null : (
          <img className="cafe-img" src={props.image_url} alt={props.name} />
        )}
        <div className="likes">
          <h5>Likes:</h5>
          <p>{liked}</p>
          <button className="likeBtn" onClick={handleFormSubmit}>
            <FontAwesomeIcon icon={faThumbsUp} size="1x" />
          </button>
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
            {props.profileState?.isLoggedIn && canCheckIn ? (
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    checkIn(props.id, props.profileState.user_id)
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} size="1x" /> Check in
                  </a>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="roaster">
          <h5>Roaster</h5>
          <h4>{props.roaster}</h4>
        </div>
      </div>
      <Footer />
    </>
  );
}

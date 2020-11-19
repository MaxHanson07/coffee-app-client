import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faPhone,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Footer from "../Footer/Footer";
import API from "../../utils/API";
import "./Info.scss";

export default function Info(props) {
  const [liked, setLiked] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);

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

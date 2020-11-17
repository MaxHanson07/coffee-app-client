import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Footer from "../Footer/Footer";
import "./Info.scss";
import Button from "../Button/Button";
import API from "../../utils/API";

export default function Info(props) {
  return (
    <>
      <div className="Info">
        <h4>{props.name}</h4>
        {!props.image_url ? null : (
          <img className="cafe-img" src={props.image_url} alt={props.name} />
        )}
        <div className="hours">
          <h5>Likes</h5>
          <ul>
            <li>{props.likes}</li>
          </ul>
        </div>
        <div className="BtnDiv">
            <>
              <Button
                className="Btn"
                name="Like"
                onClick={()=>{API.addLike(props._id).catch((err) => console.log(err))}}
              />
            </>
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

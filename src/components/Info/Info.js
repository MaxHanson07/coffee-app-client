import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Footer from "../Footer/Footer";
import "./Info.scss";

export default function Info() {
  return (
    <>
      <div className="Info">
        <h4>Proud Mary</h4>
        <img
          className="cafe-img"
          src="https://cdn.broadsheet.com.au/cache/e7/a6/e7a6716835c26b25c7da5f63a2a241f9.jpg"
          alt="Proud Mary Portland OR"
        />
        <div className="hours">
          <h5>Hours</h5>
          <ul>
            <li>EveryDay 8-4pm</li>
          </ul>
        </div>
        <div className="address">
          <h5>Address</h5>
          <p>2012 NE Alberta St, Portland, OR 97211</p>
        </div>
        <div className="connect">
          <h5>Connect</h5>
          <ul>
            <li>
              <a
                href="https://proudmarycoffee.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGlobe} size="1x" /> Website
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/proudmaryusa/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagramSquare} size="1x" />{" "}
                proudmaryusa
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} size="1x" /> +1 503-208-3475
            </li>
          </ul>
        </div>
        <div className="roaster">
          <h5>Roaster</h5>
          <h4>Proud Mary</h4>
        </div>
      </div>
      <Footer />
    </>
  );
}

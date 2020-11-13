import React from "react";
import "./Info.scss";

export default function Info() {
  return (
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
              website
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/proudmaryusa/"
              target="_blank"
              rel="noreferrer"
            >
              @proudmary
            </a>
          </li>
          <li>+1 503-208-3475</li>
        </ul>
      </div>
    </div>
  );
}

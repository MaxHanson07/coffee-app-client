import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../Button/Button";
import Request from "../Request/Request";
import Logo from "../../Images/logo.png";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn"
import "./Header.scss";
import Modal from "../Modal/Modal";

<<<<<<< HEAD
export default function Header() {
  const [show, setShow] = useState(false);

=======

export default function Header({ isLoggedIn, setProfileState }) {
>>>>>>> main
  return (
    <>
      <header>
        <img className="logo" src={Logo} alt="Coffee App Logo" />
<<<<<<< HEAD
      </header>
      <div className="Btns">
        <Button
          className="addRequestBtn"
          name={
            <FontAwesomeIcon className="icon" icon={faPlusCircle} size="2x" />
          }
          onClick={() => setShow(!show)}
        />
      </div>
      <Modal open={show} onClose={() => setShow(false)}>
        <Request />
      </Modal>
=======
        <GoogleSignIn
          isLoggedIn={isLoggedIn}
          setProfileState={setProfileState}
        />
      </header>
>>>>>>> main
    </>
  );
}

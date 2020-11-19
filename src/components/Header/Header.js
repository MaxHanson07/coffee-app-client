import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../Button/Button";
import Request from "../Request/Request";
import Logo from "../../Images/logo.png";
import "./Header.scss";
import Modal from "../Modal/Modal";

export default function Header() {
  const [show, setShow] = useState(false);

  return (
    <header>
      <img className="logo" src={Logo} alt="Coffee App Logo" />

      <Button
        className="addRequestBtn"
        name={
          <FontAwesomeIcon className="icon" icon={faPlusCircle} size="2x" />
        }
        onClick={() => setShow(!show)}
      />
      <Modal open={show} onClose={() => setShow(false)}>
        <Request />
      </Modal>
    </header>
  );
}

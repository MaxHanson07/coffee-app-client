import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Button from "../Button/Button";
import "./Modal.scss";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal">
      <Button
        className="X"
        name={<FontAwesomeIcon icon={faTimesCircle} size="2x" />}
        onClick={onClose}
      />
      {children}
    </div>
  );
}

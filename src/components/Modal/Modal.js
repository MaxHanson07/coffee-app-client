import React from "react";
import Button from "../Button/Button";
import "./Modal.scss";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal">
      {children}

      <Button name="Close" onClick={onClose} />
    </div>
  );
}

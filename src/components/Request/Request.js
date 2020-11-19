import React, { useState } from "react";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import API from "../../utils/API";
import "./Request.scss";

export default function Request() {
  const [inputState, setInputState] = useState({
    email: "",
    cafe: "",
    address: "",
    notes: "",
  });

  const [success, setSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputState({ ...inputState, [name]: value });
  };

  async function handleFormSubmit(event) {
    try {
      event.preventDefault();
      API.createRequest({
        email: inputState.email,
        cafe_name: inputState.cafe,
        cafe_address: inputState.address,
        notes: inputState.notes,
      });

      setSuccess(true);
    } catch (err) {
      console.log(err);
    }

    setInputState({
      email: "",
      cafe: "",
      address: "",
      notes: "",
    });

    setTimeout(function () {
      setSuccess(false);
    }, 1000);
  }

  return (
    <form className="Request">
      <h4>Add a Cafe?</h4>
      <div className="Response">
        {success === true ? <p>Request Successful</p> : null}
      </div>
      <InputField
        value={inputState.email}
        type="text"
        name="email"
        placeholder="email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        onChange={handleInputChange}
      />
      <InputField
        value={inputState.cafe}
        type="text"
        name="cafe"
        placeholder="cafe"
        onChange={handleInputChange}
      />

      <InputField
        value={inputState.address}
        type="text"
        pattern="[a-zA-Z0-9]"
        name="address"
        placeholder="address"
        onChange={handleInputChange}
      />
      <InputField
        value={inputState.notes}
        type="text"
        name="notes"
        placeholder="notes"
        onChange={handleInputChange}
      />

      <Button
        className="Btn"
        disabled={inputState.cafe === ""}
        onClick={handleFormSubmit}
        name="Submit"
      />
    </form>
  );
}

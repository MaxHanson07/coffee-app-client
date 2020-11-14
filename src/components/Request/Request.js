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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputState({ ...inputState, [name]: value });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    API.createRequest({
      email: inputState.email,
      cafe_name: inputState.cafe,
      cafe_address: inputState.address,
      notes: inputState.notes,
    }).catch((err) => console.log(err));

    setInputState({
      email: "",
      cafe: "",
      address: "",
      notes: "",
    });
  }

  return (
    <form className="Request">
      <h4>Add a Cafe?</h4>
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
        disabled={inputState.cafe === ""}
        onClick={handleFormSubmit}
        name="Submit"
      />
    </form>
  );
}

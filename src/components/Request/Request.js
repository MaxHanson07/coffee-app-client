import React, { useState } from "react";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./Request.scss";

export default function Request() {
  const [formResults, setFormResults] = useState({
    email: "",
    cafe: "",
    address: "",
    notes: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormResults({ ...formResults, [name]: value });
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    // API.saveBook({
    //   email: formResults.email,
    //   cafe_name: formResults.cafe,
    //   cafe_address: formResults.address,
    //   notes: formResults.notes,
    // })
    //   .then(
    //     setFormResults({
    //       email: "",
    //       cafe: "",
    //       address: "",
    //       notes: "",
    //     })
    //   )
    //   .catch((err) => console.log(err));
  }

  return (
    <form className="Request">
      <h4>Add a Cafe?</h4>
      <InputField
        type="text"
        name="email"
        placeholder="email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        name="cafe"
        placeholder="cafe"
        onChange={handleInputChange}
      />

      <InputField
        type="text"
        pattern="[a-zA-Z0-9]"
        name="address"
        placeholder="address"
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        name="notes"
        placeholder="notes"
        onChange={handleInputChange}
      />

      <Button
        disabled={!formResults.cafe && !formResults.city}
        onClick={handleFormSubmit}
        name="Submit"
      />
    </form>
  );
}

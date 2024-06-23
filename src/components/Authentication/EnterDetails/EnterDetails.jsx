import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EnterDetails.module.css";
import { useGlobalInfo } from "../../../context/globalContext";

const EnterDetails = () => {
  const { userDetails, changeUserDetails } = useGlobalInfo();
  const navigate = useNavigate();

  const formFields = [
    { id: 1, placeholder: "Full Name", key: "fullname" },
    { id: 2, placeholder: "Duration of the Visit", key: "duration" },
    { id: 3, placeholder: "Purpose of visit", key: "purpose" },
    { id: 4, placeholder: "How many guests?", key: "numberOfGuests" },
    { id: 5, placeholder: "Enter your city", key: "city" },
  ];

  const [formData, setFormData] = useState(
    formFields.map((field) => ({ ...field, value: "" }))
  );
  const handleInputChange = (id, value) => {
    setFormData((prevState) =>
      prevState.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedUserDetails = formData.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    changeUserDetails({ ...userDetails, ...updatedUserDetails });
    navigate("/authentication/interestspage");
  };

  const handleSkip = () => {
    navigate("/authentication/interestspage");
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.heading_txt}>
        <p>Enhance your dashboard by giving us this information</p>
        {/* {Object.values(userDetails).some((detail) => detail !== "") && ( */}
        <span onClick={handleSkip}>Skip</span>
        {/* )} */}
      </div>
      <form className={styles.content_div} onSubmit={handleFormSubmit}>
        <div className={styles.form}>
          {formData.map((input) => (
            <label key={input.id} className={styles.input_label}>
              <input
                type="text"
                className={styles.input}
                placeholder={input.placeholder}
                value={input.value}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                required
              />
            </label>
          ))}
        </div>
        <button className={styles.button}>Confirm</button>
      </form>
      <div className={styles.nexus_logo}>
        <img src="/svgs/nexus_logo.svg" alt="logo" />
      </div>
    </div>
  );
};

export default EnterDetails;

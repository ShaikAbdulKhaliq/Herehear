import React, { useState } from "react";
import styles from "./AddDetails.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddDetails() {
  const [flag, setFlag] = useState(false);
  const [typeOfProvider, settypeOfProvider] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate()

  const handleOptionClick = (content) => {
    settypeOfProvider(content);
    setFlag(!flag);
  };
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  function handleSave() {
    if (typeOfProvider.length === 0) {
      toast.error("Select type Of Provider", { autoClose: 1500 });
      return false
    }
   else if(fullname.length===0){
      toast.error("Enter the name", { autoClose: 1500 });
      return false
    }
    else if(email.length==0){
      
      toast.error("Enter email", { autoClose: 1500 });
      return false
    }
    else if(!re.test(String(email).toLowerCase())){
      toast.error("Enter valid email", { autoClose: 1500 });
      return false
    }
    else if(phoneNumber.length===0){
      toast.error("Enter the number", { autoClose: 1500 });
      return false
    }
    
    else if(country.length===0){
      toast.error("Enter the Country name", { autoClose: 1500 });
      return false
    }
    else{
      return true
    }
  }

  function handleSubmit(){
    if(handleSave()){
      console.log({
        typeOfProvider,fullname,phoneNumber,country
      })
      navigate("/tour-guide/create-product")
    }
  }

  return (
    <>
      <div className={styles.form_main_content}>
        <div className={styles.guideFormTitle}>Add Personal Details</div>
        <div
          onClick={() => {
            setFlag(!flag);
          }}
          className={styles.guideFullName}
        >
          {!typeOfProvider.length
            ? "What type of provider are you?"
            : typeOfProvider}
        </div>
        <div
          className={`${styles.optionsInDetails} ${flag ? styles.visible : ""}`}
        >
          <div
            onClick={() => handleOptionClick("I’m a local without experience")}
            className={styles.guideFullNameOption}
          >
            "I’m a local without experience"
          </div>
          <div
            onClick={() =>
              handleOptionClick("I’m an expert in showing my city!")
            }
            className={styles.guideFullNameOption}
          >
            I’m an expert in showing my city!
          </div>
          <div
            onClick={() => handleOptionClick("I’m a professional local guide")}
            className={styles.guideFullNameOption}
          >
            I’m a professional local guide
          </div>
          <div
            onClick={() => handleOptionClick("I have a guiding license")}
            className={styles.guideFullNameOption}
          >
            I have a guiding license
          </div>
        </div>
        <input
          type="text"
          placeholder="Full Name"
          className={styles.guideFullName}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className={styles.guideFullName}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className={styles.guideFullName}
          onChange={(e) => setPhoneNumber(e.target.value)}
          maxLength={10}
        />
        <input
          type="text"
          placeholder="Country"
          className={styles.guideFullName}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className={styles.titleSubmitDiv} onClick={handleSubmit}>
        Save & Next
      </div>
    </>
  );
}

export default AddDetails;

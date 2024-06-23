import React, { useState } from "react";
import styles from "./Createproduct.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Createproduct() {
  const [productFullName, setProductFullName] = useState("");
  const [productEmail, setProductEmail] = useState("");
  const [productCountry, setProductCountry] = useState("");
  const [productCity, setProductCity] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [productTags, setProductTags] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const [tag, setTag] = useState("");
  const [isActivityClicked, setIsActivityClicked] = useState(false);
  const [isDurationClicked, setIsDurationClicked] = useState(false);
  const navigate = useNavigate()


  const triggerTag = (e) => {
    if (!e.target.value.includes(",")) {
      setTag(e.target.value);
    }
  };

  const createTag = (e) => {
    if (e.key === " " && tag.trim() !== "") {
      setProductTags([...productTags, tag.trim()]);
      setTag("");
    }
  };

  const removeTag = (index) => {
    const updatedTags = productTags.filter((_, idx) => idx !== index);
    setProductTags(updatedTags);
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsActivityClicked(false);
  };

  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
    setIsDurationClicked(false);
  };
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function handleSave() {
    if (productFullName.length === 0) {
      toast.error("Enter product name", { autoClose: 1500 });
      return false;
    } else if (productEmail.length == 0) {
      toast.error("Enter email", { autoClose: 1500 });
      return false;
    } else if (!re.test(String(productEmail).toLowerCase())) {
      toast.error("Enter valid email", { autoClose: 1500 });
      return false;
    } else if (productCountry.length === 0) {
      toast.error("Enter Country name", { autoClose: 1500 });
      return false;
    }else if (productCity.length === 0) {
      toast.error("Enter City name", { autoClose: 1500 });
      return false;
    } else if (selectedActivity.length === 0) {
      toast.error("Select type of Activity", { autoClose: 1500 });
      return false;
    } else if (selectedDuration.length === 0) {
      toast.error("select activity duration", { autoClose: 1500 });
      return false;
    } else if (productTags.length === 0) {
      toast.error("Add tags for activity", { autoClose: 1500 });
      return false;
    } else if (productDescription.length === 0) {
      toast.error("Add description for activity", { autoClose: 1500 });
      return false;
    } else {
      return true;
    }
  }

  function handleSubmit() {
    if (handleSave()) {
      console.log({
        productFullName,
        productEmail,
        productCountry,
        productCity,
        selectedActivity,
        selectedDuration,
        productTags,
        productDescription
      });
      navigate("/tour-guide/product-pricing");
    }
  }

  return (
    <>
      <div className={styles.CreateProductParent}>
        <div className={styles.guideFormTitle}>Create a Product</div>
        <input
          type="text"
          placeholder="Full Name"
          className={styles.guideFullName}
          value={productFullName}
          onChange={(e) => setProductFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className={styles.guideFullName}
          value={productEmail}
          onChange={(e) => setProductEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          className={styles.guideFullName}
          value={productCountry}
          onChange={(e) => setProductCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          className={styles.guideFullName}
          value={productCity}
          onChange={(e) => setProductCity(e.target.value)}
        />
        <div
          onClick={() => {
            setIsActivityClicked(!isActivityClicked);
          }}
          className={styles.guideFullName}
        >
          {selectedActivity || "Type of activity"}
        </div>
        <div
          className={`${styles.activityOptions} ${
            isActivityClicked ? styles.visible : ""
          }`}
        >
          <div
            className={styles.activity}
            onClick={() => handleActivityClick("Bike")}
          >
            Bike
          </div>
          <div
            className={styles.activity}
            onClick={() => handleActivityClick("Cruise")}
          >
            Cruise
          </div>
          <div
            className={styles.activity}
            onClick={() => handleActivityClick("Tour")}
          >
            Tour
          </div>
          <div
            className={styles.activity}
            onClick={() => handleActivityClick("Food and Drinks")}
          >
            Food and Drinks
          </div>
        </div>
        <div
          onClick={() => {
            setIsDurationClicked(!isDurationClicked);
          }}
          className={styles.guideFullName}
        >
          {selectedDuration || "Activity Duration"}
        </div>
        <div
          className={`${styles.durationOptions} ${
            isDurationClicked ? styles.visible : ""
          }`}
        >
          <div
            className={styles.duration}
            onClick={() => handleDurationClick("30 min")}
          >
            30 min
          </div>
          <div
            className={styles.duration}
            onClick={() => handleDurationClick("45 min")}
          >
            45 min
          </div>
          <div
            className={styles.duration}
            onClick={() => handleDurationClick("1 hour")}
          >
            1 hour
          </div>
          <div
            className={styles.duration}
            onClick={() => handleDurationClick("1 hour 30 mins")}
          >
            1 hour 30 mins
          </div>
        </div>
        <div className={styles.tagsDiv}>
          <div className={styles.tagsTitle}>Tags</div>
          <div className={styles.showTags}>
            {productTags.map((tag, index) => (
              <div className={styles.tag} key={index}>
                <>{tag}</>
                <button
                  className={styles.removeTagBtn}
                  onClick={() => removeTag(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <input
            placeholder="Eg - Activity highlights, keywords etc"
            className={styles.textAreaForTags}
            value={tag}
            onChange={triggerTag}
            onKeyDown={createTag}
          />
          <div className={styles.addTagNote}>max 8 tags</div>
        </div>
        <div className={styles.tagsDiv}>
          <div className={styles.tagsTitle}>Description</div>
          <input
            className={styles.descriptionTextArea}
            placeholder="Eg - Unique description of the tour"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={1}
          />
          <div className={styles.addTagNote}>upto 250 words</div>
        </div>
      </div>
      <div className={styles.titleSubmitDiv} onClick={handleSubmit}>
        Save & Next
      </div>
    </>
  );
}

export default Createproduct;

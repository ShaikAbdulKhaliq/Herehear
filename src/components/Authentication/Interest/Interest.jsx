import React, { useState, useEffect } from "react";
import styles from "./Interest.module.css";
import { useNavigate } from "react-router-dom";
import { useGlobalInfo } from "../../../context/globalContext";
import { useTranslation } from "react-i18next";
import { updateEventCategories } from "../../../API/useApi";
import Animated_Loader from '../../Dashboard/Animated_Loader/Animated_Loader.jsx'

const Interest = () => {
  const context = useGlobalInfo();
  const { t } = useTranslation();
  let { suggestion_que, suggestion, skip } = t("alleventstab");
  let { save } = t("wheelscroller");
  let { Next } = t("login_page");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userCity, setUserCity] = useState("");
  const { allEventCategories, usersData, loading} = useGlobalInfo();
  const navigate = useNavigate();

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";

  useEffect(() => {
    if (!context.userDetails.fullname) {
      const savedDetails = localStorage.getItem("userDetails");
      if (savedDetails) {
        context.changeUserDetails(JSON.parse(savedDetails));
      }
    }
  }, []);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategories((prevSelected) => {
      let updatedCategories;
      if (prevSelected.includes(categoryName)) {
        updatedCategories = prevSelected.filter(
          (category) => category !== categoryName
        );
      } else if (prevSelected.length < 5) {
        updatedCategories = [...prevSelected, categoryName];
      } else {
        updatedCategories = prevSelected;
      }
      return updatedCategories;
    });
  };

  const handleNavigate = async () => {
    try {
      const userIndex = usersData[lang].findIndex(
        (user) => user.mobileNumber === context.userMobile
      );

      if (userIndex === -1) {
        // If user doesn't exist, create new user with a unique ID
        const uniqueId = `${Math.random().toString(36).substring(2, 6)}`;
        const userData = {
          id: uniqueId,
          mobileNumber: context.userMobile,
          fullname: context.userDetails.fullname,
          city: context.userDetails.city,
          duration: context.userDetails.duration,
          purpose: context.userDetails.purpose,
          numberOfGuests: context.userDetails.numberOfGuests,
          category: selectedCategories,
          bookedEvents: [],
        };
        usersData[lang].push(userData);
        localStorage.setItem("userDetails", JSON.stringify(userData));
      } else {
        // If user exists, update their data without changing the ID
        const existingUserData = usersData[lang][userIndex];
        const updatedUserData = {
          ...existingUserData,
          fullname: context.userDetails.fullname,
          city: context.userDetails.city,
          duration: context.userDetails.duration,
          purpose: context.userDetails.purpose,
          numberOfGuests: context.userDetails.numberOfGuests,
          category: selectedCategories,
        };

        usersData[lang][userIndex] = updatedUserData;
        localStorage.setItem("userDetails", JSON.stringify(updatedUserData));
      }

      await updateEventCategories(usersData);

      navigate("/dashboard", {
        state: {
          userData: {
            userCity: userCity || context.userDetails.city,
            selectedCategories,
          },
        },
      });
    } catch (error) {
      console.error("Error while posting user data:", error);
    }
  };

  if (loading) {
    return (
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
        <Animated_Loader size={15}/>
      </div>
    );
  }

  return (
    <div className={styles.Interest_Container}>
      <div className={styles.wrapper}>
        <div className={styles.navbar_txt}>
          <div className={styles.left_txt}>
            <p className={styles.left_top_txt}>{suggestion_que}</p>
            <p className={styles.left_bottom_txt}>{suggestion}</p>
          </div>
          <span onClick={handleNavigate}>{skip}</span>
        </div>
        <div className={styles.image_scroller}>
          {allEventCategories[lang]?.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategorySelect(category.name)}
              className={`${styles.image_wrapper} ${
                selectedCategories?.includes(category.name)
                  ? styles.active_border
                  : ""
              }`}
            >
              <img src={category.image} alt={category.name} />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.button_wrapper}>
          <button onClick={handleNavigate}>
            {" "}{save} & {Next}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interest;

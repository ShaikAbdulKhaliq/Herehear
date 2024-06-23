import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllEventsV2Card.module.css";
import { useGlobalInfo } from "../../../../context/globalContext";
import { addToFavorites, getUsersData } from "../../../../API/useApi";
import { useTranslation } from "react-i18next";

const AllEventsV2_Card = ({ event, className }) => {
  const { t } = useTranslation();
  const { onwards } = t("details_of_event");
  const navigate = useNavigate();
  const { handleSelectedEventDetails, usersData } = useGlobalInfo();
  const { id, name, startTime, date, address, ticketPrice, eventType, event_details_image_1, event_details_image_2, event_details_image_3 } = event;

  const [favorites, setFavorites] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";

  useEffect(() => {
    const fetchUserData = async () => {
      const existingUserDetails = JSON.parse(localStorage.getItem("userDetails"));

      if (existingUserDetails) {
        const user = usersData[lang].find(user => user.id === existingUserDetails.id);
        if (user) {
          setFavorites(user.favorites || []);
          setIsInFavorites(user.favorites?.includes(id));
        }
      }
    };
    fetchUserData();
  }, [id, lang]);

  const updateFavorites = async (newFavorites) => {
    const existingUserDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

    if (!existingUserDetails.id) return;

    const usersData = await getUsersData();

    const userIndex = usersData[lang]?.findIndex(user => user.id === existingUserDetails.id);
    if (userIndex === -1) return;

    const updatedUserDetails = {
      ...usersData,
      [lang]: [
        ...usersData[lang].slice(0, userIndex),
        { ...usersData[lang][userIndex], favorites: newFavorites },
        ...usersData[lang].slice(userIndex + 1)
      ]
    };

    localStorage.setItem("userDetails", JSON.stringify({ ...existingUserDetails, favorites: newFavorites }));
    setFavorites(newFavorites);
    setIsInFavorites(newFavorites.includes(id));

    try {
      const response = await addToFavorites(updatedUserDetails);
      console.log("Favorites updated in JSON data:", response);
    } catch (error) {
      console.error("Error updating favorites in JSON data:", error);
    }
  };

  const addEventToFavorites = (id) => {
    const existingUserDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
    const newFavorites = [...(existingUserDetails?.favorites || []), id];
    updateFavorites(newFavorites);
  };

  const removeFromFavorites = (id) => {
    const existingUserDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
    const newFavorites = existingUserDetails?.favorites.filter(favId => favId !== id);
    updateFavorites(newFavorites);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isInFavorites) {
      removeFromFavorites(id);
    } else {
      addEventToFavorites(id);
    }
  };

  return (
    <div
      className={`${className}`}
      onClick={() => {
        handleSelectedEventDetails(event);
        navigate("/dashboard/eventdetails");
      }}
    >
      <div className={styles.card_header}>
        <div className={styles.card_header_top}>
          <span className={styles.card_header_top_left}>{eventType}</span>
          <div className={styles.card_header_top_right}>
            <div className={styles.img_wrapper} onClick={handleFavoriteClick}>
              <img
                src={isInFavorites ? "/svgs/filled_heart.svg" : "/svgs/fav.svg"}
                alt="Favorite Icon"
              />
            </div>
            <div className={styles.price_block}>
              <span className={styles.price}>${ticketPrice.children}</span>
              &nbsp;
              <span className={styles.txt}>{onwards}</span>
            </div>
          </div>
        </div>

        <div className={styles.card_header_bottom}>
          <div className={styles.card_header_bottom_top}>
            <span className={styles.event_name}>{name}</span>
            <span className={styles.event_time}>{startTime}</span>
          </div>
          <div className={styles.card_header_bottom_bottom}>
            <span className={styles.event_address}>{address}</span>
            <span className={styles.event_date}>{formattedDate}</span>
          </div>
        </div>
      </div>
      <div className={styles.card_img_container}>
        <div className={styles.img_container_left}>
          <img src={event_details_image_3} alt="" />
        </div>

        <div className={styles.img_container_right}>
          <img
            src={event_details_image_1}
            alt=""
            className={styles.img_container_right_top}
          />
          <img
            src={event_details_image_2}
            alt=""
            className={styles.img_container_right_bottom}
          />
        </div>
      </div>
    </div>
  );
};

export default AllEventsV2_Card;
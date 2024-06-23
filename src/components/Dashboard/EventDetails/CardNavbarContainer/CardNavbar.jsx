import React, { useState, useEffect } from "react";
import styles from "./CardNavbar.module.css";
import { useGlobalInfo } from "../../../../context/globalContext";
import { addToFavorites } from "../../../../API/useApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CardNavbar = ({ event }) => {
  const { t } = useTranslation();
  let { onwards, Length } = t("details_of_event");
  const { selectedeventdetails, usersData } = useGlobalInfo();
  const [favorites, setFavorites] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(selectedeventdetails)?.length === 0) {
      navigate("/dashboard/choose_seats");
    }
  }, [selectedeventdetails, navigate]);

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";

  useEffect(() => {
    const fetchUserData = async () => {
      const existingUserDetails = JSON.parse(localStorage.getItem("userDetails"));

      if (existingUserDetails) {
        const user = usersData[lang].find(user => user.id === existingUserDetails.id);
        if (user) {
          setFavorites(user.favorites || []);
          setIsInFavorites(user.favorites?.includes(selectedeventdetails?.id));
        }
      }
    };
    fetchUserData();
  }, [selectedeventdetails.id, lang]);

  const updateFavorites = async (newFavorites) => {
    const existingUserDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

    if (!existingUserDetails.id) return;

    // const usersData = await getUsersData();

    const userIndex = usersData[lang].findIndex(user => user.id === existingUserDetails.id);
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
    setIsInFavorites(newFavorites.includes(selectedeventdetails.id));

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
    const newFavorites = existingUserDetails?.favorites.filter(favId => favId !== selectedeventdetails?.id);
    updateFavorites(newFavorites);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isInFavorites) {
      removeFromFavorites(selectedeventdetails?.id);
    } else {
      addEventToFavorites(selectedeventdetails?.id);
    }
  };

  if (!event) {
    return <div>No event data</div>;
  }

  let formattedDate = "";
  try {
    formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(event.date));
  } catch (error) {
    console.error("Error in date formatting:", error);
  }

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.nav_block_1}>
        <div className={styles.rock_popup}>{truncateText(event.eventType,11) || "N/A"}</div>
        <div className={styles.img_text}>
          <div className={styles.img} onClick={handleFavoriteClick}>
            <img
              src={isInFavorites ? "/svgs/filled_heart.svg" : "/svgs/fav.svg"}
              alt="Favorite Icon"
            />
          </div>
          <div className={styles.text}>
            <span>${event?.ticketPrice?.children}</span>&nbsp;
            <span>{onwards}</span>
          </div>
        </div>
      </div>
      <div className={styles.nav_block_2}>
        <div className={styles.nav_block_2_1}>
          <div className={styles.text1}>{truncateText(event.name,13)}</div>
          <div className={styles.text2} data-fulltext={event.address}>
            {event.address}
          </div>
        </div>
        <div className={styles.nav_block_2_2}>
          <div className={styles.text1}>{event.startTime}</div>
          <div className={styles.text3}>{formattedDate}</div>
        </div>
      </div>
      <div className={styles.nav_block_3}>
        <div className={styles.pause_button_block}>
          <div className={styles.pause_button}>
            <img src={"/svgs/pause_img.svg"} alt="" />
          </div>
          <div className={styles.time_text}>4:56</div>
        </div>
        <div className={styles.len_text}>{Length}: 1 hrs and 9 mins</div>
      </div>
    </div>
  );
};

export default CardNavbar;

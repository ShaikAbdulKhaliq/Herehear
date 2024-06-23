import React from "react";
import styles from "./Favourites.module.css";
import { useSwipeable } from "react-swipeable";
import { useTranslation } from "react-i18next";
import { removeFromFavourites } from "../../../API/useApi";
import { useGlobalInfo } from "../../../context/globalContext";

function Favcard({ event, favoriteEvents, setFavoriteEvents, userDetails, lang, setUserDetails }) {
  const { t } = useTranslation();
  const { onwards } = t("favourites");
  const { usersData } = useGlobalInfo();

  const isSoldOut = event?.booked_seats.length >= 225;
  const isExpired = new Date(event?.date) < new Date();


  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const updateFavorites = async (newFavorites) => {
    const updatedUserDetails = {
      ...userDetails,
      favorites: newFavorites,
    };
    setUserDetails(updatedUserDetails);
    localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));

    try {
      const userIndex = usersData[lang]?.findIndex(user => user.id === updatedUserDetails.id);
      if (userIndex !== -1) {
        const updatedUsersData = {
          ...usersData,
          [lang]: [
            ...usersData[lang].slice(0, userIndex),
            { ...usersData[lang][userIndex], favorites: newFavorites },
            ...usersData[lang].slice(userIndex + 1)
          ]
        };
        await removeFromFavourites(updatedUsersData);
        console.log("Success: User data updated in backend", usersData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeEventFromFavorites = (eventId) => {
    const updatedFavoriteEvents = favoriteEvents.filter(event => event.id !== eventId);
    setFavoriteEvents(updatedFavoriteEvents);
    updateFavorites(updatedFavoriteEvents.map(event => event.id));
  };

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      const eventId = eventData.event.currentTarget.dataset.eventId;
      removeEventFromFavorites(eventId);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className={styles.card} data-event-id={event.id} {...swipeHandlers}>
      <div className={isSoldOut || isExpired ? styles.blur_card : styles.hide}></div>
      <div className={styles.card_left}>
        <img src={event.event_details_image_1} alt="img" />
      </div>
      <div className={styles.card_middle}>
        <div className={styles.card_text_top}>
          <span className={styles.event_title}>
            {truncateText(event.name, 12)}
          </span>
          <span className={styles.event_name}>
            {truncateText(event.eventType, 18)}
          </span>
        </div>
        <div className={styles.card_text_bottom}>
          <span>{formatDate(event.date)}</span>&nbsp;
          <span>{event.startTime}</span>
        </div>
      </div>
      <div className={styles.card_right}>
        <div className={styles.price_block}>
          <span className={styles.price}>{event.ticketPrice.children}</span>
          &nbsp;
          <span className={styles.onwards_text}>{onwards}</span>
        </div>
      </div>
      <span className={isSoldOut ? styles.sold_out : styles.hide}>Sold Out</span>
      <span className={isExpired ? styles.sold_out : styles.hide}>Expired</span>
    </div>
  );
}

export default Favcard;

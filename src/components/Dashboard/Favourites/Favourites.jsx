import React, { useState, useEffect } from "react";
import styles from "./Favourites.module.css";
import SearchField from "../EventDetails/SearchOption/SearchField.jsx";
import { FavouritesTab } from "../../../Images/Image.js";
import CircleSlider from "../Default_Dashboard/CircleSlider/CircleSlider.jsx";
import Favcard from "./Favcard.jsx";
import { useTranslation } from "react-i18next";
import { useGlobalInfo } from "../../../context/globalContext.jsx";
import Animated_Loader from "../Animated_Loader/Animated_Loader.jsx";

const Favourites = () => {
  const { t } = useTranslation();
  const { heading, Swipe_text, no_data_message } = t("favourites");
  const { events, usersData, loading } = useGlobalInfo();
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userDetails"))?.id;
        const user = usersData[lang].find(user => user.id === userId);

        if (user) {
          const filteredEvents = events[lang].filter(event =>
            user?.favorites.includes(event.id)
          );
          setUserDetails(user);
          setFavoriteEvents(filteredEvents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [events, lang, usersData]);

  return (
    <div className={styles.Favourites_Container}>
      <div className={styles.title_block}>
        <div className={styles.image_block}>
          <img src={FavouritesTab.logo} alt="Favourites" />
        </div>
        <div className={styles.heading_block}>{heading}</div>
      </div>
      <div className={styles.searchbar_block}>
        <SearchField placeholder="Search Events" />
      </div>
      <div className={styles.cards_block}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <Animated_Loader size={15} />
          </div>
        ) : (
          favoriteEvents.length > 0 ? (
            favoriteEvents.map((event) => (
              <Favcard
                key={event.id}
                event={event}
                favoriteEvents={favoriteEvents}
                setFavoriteEvents={setFavoriteEvents}
                userDetails={userDetails}
                lang={lang}
                setUserDetails={setUserDetails}
              />
            ))
          ) : (
            <p className={styles.nofavourites}>{no_data_message}</p>
          )
        )}
      </div>
      <div className={styles.footer_block}>
        <div className={styles.menu_block}>
          <CircleSlider />
        </div>
        <div className={styles.text_logo_block}>
          <p>{Swipe_text}</p>
          <img src={FavouritesTab.nexus_logo} alt="Nexus logo" />
        </div>
      </div>
    </div>
  );
};

export default Favourites;

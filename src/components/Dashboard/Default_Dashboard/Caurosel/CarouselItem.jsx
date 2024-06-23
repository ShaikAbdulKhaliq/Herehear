import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { addToFavorites } from "../../../../API/useApi";
import { useGlobalInfo } from "../../../../context/globalContext";

const CarouselItem = ({
  event_time,
  name,
  eventType,
  startTime,
  endTime,
  eventImage_c,
  id,
}) => {
  const {usersData} = useGlobalInfo()
  const [favorites, setFavorites] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState(false);

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";

  useEffect(() => {
    const fetchUserData = async () => {
      const existingUserDetails = JSON.parse(localStorage.getItem("userDetails"));

      if (existingUserDetails) {
        const user = usersData[lang].find(user => user?.id === existingUserDetails?.id);
        if (user) {
          setFavorites(user?.favorites || []);
          setIsInFavorites(user?.favorites?.includes(id));
        }
      }
    };
    fetchUserData();
  }, [id, lang]);

  const updateFavorites = async (newFavorites) => {
    const existingUserDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

    if (!existingUserDetails?.id) return;

    const userIndex = usersData[lang]?.findIndex(user => user?.id === existingUserDetails?.id);
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
  const shortenString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    } else {
      return str;
    }
  };
  const shortenedEventType = shortenString(eventType, 11);
  return (
    <div className="carousel-item">
      <img
        className="carousel-item-img"
        src={eventImage_c}
        alt="Carousel Item"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
        }}
      />
      <div className="addFavoriteOption">
        <div className="heartCircle" onClick={handleFavoriteClick}>
          <img
            src={isInFavorites ? "/svgs/filled_heart.svg" : "/svgs/fav.svg"}
            alt="Favorite Icon"
          />
        </div>
        <div className="favoriteLeft">
          <div className="favoriteTitle">{shortenedEventType}</div>
          <div className="favoriteTime">
            {startTime}-{endTime}
          </div>
        </div>
      </div>
      <div className="carousel-footer">
        <div className="timefrevent">{event_time}</div>
        <div className="eventTitleFooter">{name}</div>
      </div>
    </div>
  );
};
export default CarouselItem;

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import styles from "./AllEvents_V1.module.css";
import Title from "../Default_Dashboard/Title/Title.jsx";
import EventSelection1 from "./EventSelection1/EventSelection1.jsx";
import Category from "./Category/Category.jsx";
import SkewCard from "./SkewCards/SkewCard.jsx";
import Radio from "../Default_Dashboard/Radio/Radio.jsx";
import CircleSlider from "../Default_Dashboard/CircleSlider/CircleSlider.jsx";
import AllEventsV2_Card from "./AllEventsV2_Card/AllEventsV2_Card.jsx";
import SearchField from "../EventDetails/SearchOption/SearchField.jsx";
import { useGlobalInfo } from "../../../context/globalContext.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Animated_Loader from "../Animated_Loader/Animated_Loader.jsx";
const odsoky = keyframes`
  0% {
    transform: translateY(6px);    
  }
  100% {
    transform: translateY(1px);    
  }
`;

const TooltipContainer = styled.div`
  position: absolute;
  top: 90px;
  right: 10px;
`;

console.log("TooltipContainer", TooltipContainer);

const TooltipText = styled.div`
  visibility: hidden;
  z-index: 1;
  opacity: 0.4;
  width: fit-content;
  min-width: 260px;
  min-height: 50px;
  height: fit-content;
  padding: 10px;
  background: white;
  color: #000000;
  position: absolute;
  top: 30%;
  right: 110%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 3px rgba(56, 54, 54, 0.86);

  &::after {
    content: " ";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 0 12px 12.5px; /* Changed border-width */
    border-color: transparent transparent transparent white; /* Changed border-color */
    position: absolute;
    top: 50%;
    left: 100%; /* Changed left to 100% */
    transform: translateY(-50%); /* Added translateY */
  }
`;

const Popup = styled.div`
  &:hover ${TooltipText} {
    visibility: visible; // Change this to 'visible' from 'hidden'
    transform: translateY(-10px) translateX(-50%);
    opacity: 1;
    transition: 0.3s linear;
    animation: ${odsoky} 1s ease-in-out infinite alternate;
  }
`;

const AllEvents_V1 = () => {
  const { t } = useTranslation();
  const { Event_Selection } = t("alleventstab", { returnObjects: true });
  const { Hey, click } = t("dashboard");
  const [showSkewCard, setShowSkewCard] = useState(true);
  const [showAllEventsCard, setShowAllEventsCard] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const { events, loading} = useGlobalInfo();

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";

  useEffect(() => {
    setFilteredEvents(events[lang] || []);
  }, [events, lang]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredData = events[lang]?.filter((event) =>
      event.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredEvents(filteredData);
  };
  const handleTooltipClick = () => {
    navigate("/dashboard/audio_experience");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    let filteredData = [];

    switch (category) {
      case "Comedy":
        filteredData = events[lang]?.filter(
          (event) => event.eventCategory === "Comedy"
        );
        break;
      case "Magic":
        filteredData = events[lang]?.filter(
          (event) => event.eventCategory === "Magic"
        );
        break;
      case "Sports":
        filteredData = events[lang]?.filter(
          (event) => event.eventCategory === "Sports"
        );
        break;
      case "Adventure":
        filteredData = events[lang]?.filter(
          (event) => event.eventCategory === "Adventure"
        );
        break;
      case "Concerts":
        filteredData = events[lang]?.filter(
          (event) => event.eventCategory === "Concerts"
        );
        break;
      case "Culture":
        filteredData = events[lang]?.filter(
          (event) => event.eventCategory === "Culture"
        );
        break;
      case "Others":
        filteredData = events[lang]?.filter(
          (event) =>
            ["Fine-Dine", "Futuristic", "Fashion", "Food & Beverages"].indexOf(
              event.eventCategory
            ) === -1
        );
        break;
      default:
        filteredData = events[lang];
        break;
    }

    setFilteredEvents(filteredData);
  };

  const CategoryClick = (category) => {
    let filteredData = [];

    switch (category) {
      case "All":
        filteredData = events[lang];
        break;
      case "18+ only":
        filteredData = events[lang]?.filter(
          (event) => event.age_limit === "18+ only"
        );
        break;
      case "Kids/Family-Friendly":
        filteredData = events[lang]?.filter(
          (event) => event.age_limit === "Kids/Family-Friendly"
        );
        break;
      case "21+ only":
        filteredData = events[lang]?.filter(
          (event) => event.age_limit === "21+ only"
        );
        break;
      case "60+ Only":
        filteredData = events[lang]?.filter(
          (event) => event.age_limit === "60+ Only"
        );
        break;
      case "Environment Friendly":
        filteredData = events[lang]?.filter(
          (event) => event.age_limit === "Environment Friendly"
        );
        break;
      default:
        filteredData = events[lang];
        break;
    }

    setFilteredEvents(filteredData);
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
        <Animated_Loader size={15}/>
      </div>
    );
  }

  return (
    <div className={styles.AllEvents_V1_container}>
      <div className={styles.searchBar}>
        <SearchField
          placeholder="Have a show in mind?"
          onSearch={handleSearch}
          showSkewCard={showSkewCard}
        />
      </div>

      <div className={styles.middle_container}>
        <div className={styles.city_title_container}>
          <Title />
        </div>
        <div className={styles.events_selection_container}>
          <EventSelection1
            eventsData={events[lang]}
            onCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className={styles.events_filter_container}>
          <Category
            eventsData={events[lang]}
            onCategoryClick={CategoryClick}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className={styles.radio_container}>
          <Radio />
        </div>
      </div>

      <div className={styles.cards_main}>
        {showSkewCard && (
          <div className={styles.skew_card_container}>
            <SkewCard
              eventsData={filteredEvents}
              setShowSkewCard={setShowSkewCard}
              setShowAllEventsCard={setShowAllEventsCard}
              searchTerm={searchTerm}
            />
          </div>
        )}

        {showAllEventsCard && (
          <div className={styles.AllEventsV2_Card_Container}>
            {filteredEvents.map((event, index) => (
              <AllEventsV2_Card
                key={index}
                event={event}
                className={styles.AllEventsV2_Card}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <CircleSlider />
      </div>

      <TooltipContainer>
        <Popup className={styles.pop_up}>
          <img
            src="/svgs/Ellipse.svg"
            alt="Tooltip Trigger"
            className={styles.pop_img}
          />
          <TooltipText className={styles.tooltip} onClick={handleTooltipClick}>
            {Hey} <b>{events[lang][1].name}</b> <i>{click}</i>
          </TooltipText>
        </Popup>
      </TooltipContainer>
    </div>
  );
};

export default AllEvents_V1;
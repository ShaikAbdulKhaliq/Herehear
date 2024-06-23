import React from "react";
import styles from "./EventSelection1.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EventSelection = ({ eventsData, onCategoryClick, selectedCategory }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { Event_Selection } = t("alleventstab", { returnObjects: true });

  console.log("Event_Selection", Event_Selection);
  const filterevents = [
    "TourGuide",
    "Culture",
    "Concerts",
    "Magic",
    "Sports",
    "Adventure",
    "Comedy",
    "Others",
  ];

  const categoryIcons = [
    "/svgs/tour_guide_img.svg",
    "/svgs/CaoDai.svg",
    "/svgs/Concert Sing_1.svg",
    "/svgs/magic.svg",
    "/svgs/basketball.svg",
    "/svgs/adventure.svg",
    "/svgs/movie.svg",
    "/svgs/others.svg",
  ];
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div className={styles.selection_container}>
      {Event_Selection.map((category, index) => (
        <div
          key={index}
          className={`${styles.events} ${
            selectedCategory === filterevents[index]
              ? styles.selected_event
              : ""
          }`}
          onClick={() => {
            if (index == 0) {
              navigate("/tour-guide/add-details");
            }

            onCategoryClick(filterevents[index]);
          }}
        >
          <div className={styles.event_container}>
            <div className={styles.img_container}>
              <img
                src={categoryIcons[index]}
                alt={category}
                className={styles.event_img}
              />
            </div>
            <div className={styles.category_name}>
              {truncateText(category, 10)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventSelection;
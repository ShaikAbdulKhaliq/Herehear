import React from "react";
import styles from "./Description.module.css";
import { useTranslation } from "react-i18next";
import Map from "../Map/Map";

const Description = ({ event, setShowMap, showOnlyMap }) => {
  const { t } = useTranslation();
  const { ticket_limit_for_this_event, Important, venue_text } = t(
    "details_of_event"
  );

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleClick = () => {
    if (setShowMap) {
      setShowMap(true);
    }
  };

  if (showOnlyMap) {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Map setShowMap={setShowMap} />
      </div>
    );
  }

  return (
    <div className={styles.des_container}>
      <div className={styles.card_img_container}>
        <div className={styles.img_container_left}>
          <img src={event.event_details_image_3} alt="img" />
        </div>
        <div className={styles.img_container_right}>
          <img
            src={event.event_details_image_1}
            className={styles.img_container_right_top}
            alt="img"
          />
          <img
            src={event.event_details_image_2}
            className={styles.img_container_right_bottom}
            alt="img"
          />
        </div>
      </div>
      <div className={styles.description}>{event.description}</div>
      <div className={styles.more_details}>
        <div className={styles.details1}>
          <div className={styles.image_container}>
            <img src="/svgs/Nopoverty.svg" alt="" className={styles.image} />
          </div>
          <div className={styles.image_content}>{event.age_limit}</div>
        </div>
        <div className={styles.details2}>
          <div className={styles.details21}>
            <div className={styles.image_container}>
              <img
                src={"/svgs/notavailable.svg"}
                alt=""
                className={styles.image}
              />
            </div>
            <div className={styles.image_content}>
              {truncateText(event.parking, 18)}
            </div>
          </div>
          <div className={styles.details21}>
            <div className={styles.image_container}>
              <img
                src={"/svgs/available.svg"}
                alt=""
                className={styles.image}
              />
            </div>
            <div className={styles.image_content}>
              {event.disability_parking}
            </div>
          </div>
        </div>
        <div className={styles.details1}>
          <div className={styles.image_container}>
            <img
              src={"/svgs/ticketLimit.svg"}
              alt=""
              className={styles.image}
            />
          </div>
          <div className={styles.image_content}>
            {event.ticket_limit} {ticket_limit_for_this_event}
          </div>
        </div>
        <div className={styles.details1}>
          <div className={styles.image_container}>
            <img src={"/svgs/Call.svg"} alt="" className={styles.image} />
          </div>
          <div className={styles.image_content}>{event.contact}</div>
        </div>
        <div className={styles.details1}>
          <div className={styles.image_container}>
            <img src={"/svgs/ticketIcon.svg"} alt="" className={styles.image} />
          </div>
          <div className={styles.image_content}>{event.website}</div>
        </div>
      </div>
      <div className={styles.imp_text}>
        {Important} - {truncateText(event.special_instructions, 35)}
      </div>
      <div className={styles.map_component}>
        <div className={styles.map_text}>{venue_text}</div>
        <div
          className={styles.map_img_block}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
          setShowMap={setShowMap}
        >
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Description;

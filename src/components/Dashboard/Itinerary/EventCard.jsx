import React, { useState, useRef, useEffect } from "react";
import styles from "./EventCard.module.css";

const EventCard = ({ item, onSwipe }) => {
  console.log(item, "item");

  const [isSwipped, setIsSwipped] = useState(null);
  const cardRef = useRef(null);
  const [startY, setStartY] = useState(null);
  const [flag, setFlag] = useState(false);
  const [is1Hr, setIs1hr] = useState(false);

  const eventTime = item.startTime;
  const endTime = item.endTime;

  useEffect(() => {
    const parseTime = (time) => {
      const [timeStr, ampm] = time.split(" ");
      let [hour, minute] = timeStr.split(":").map(Number);
      if (ampm === "pm" && hour !== 12) {
        hour += 12;
      } else if (ampm === "am" && hour === 12) {
        hour = 0;
      }
      return { hour, minute };
    };

    const eventParsedTime = parseTime(eventTime);
    const endParsedTime = parseTime(endTime);

    const durationInMinutes =
      endParsedTime.hour * 60 +
      endParsedTime.minute -
      (eventParsedTime.hour * 60 + eventParsedTime.minute);
    setIs1hr(durationInMinutes <= 60);

    const handleTouchMove = (event) => {
      if (startY !== null) {
        const deltaY = event.touches[0].clientY - startY;

        if (deltaY > 50) {
          moveDown();
        } else if (deltaY < -50) {
          moveUp();
        }
      }
    };

    const handleTouchStart = (event) => {
      setStartY(event.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      setStartY(null);
    };

    const moveUp = () => {
      if (flag === false) {
        setFlag(true);
        setIsSwipped(true);
        onSwipe(item, "up");
        setTimeout(() => {
          setIsSwipped(null);
          setFlag(false);
        }, 2000);
      }
    };

    const moveDown = () => {
      if (flag === false) {
        setFlag(true);
        setIsSwipped(false);
        onSwipe(item, "down");
        setTimeout(() => {
          setIsSwipped(null);
          setFlag(false);
        }, 2000);
      }
    };

    const cardElement = cardRef.current;
    cardElement.addEventListener("touchstart", handleTouchStart);
    cardElement.addEventListener("touchmove", handleTouchMove);
    cardElement.addEventListener("touchend", handleTouchEnd);

    return () => {
      cardElement.removeEventListener("touchstart", handleTouchStart);
      cardElement.removeEventListener("touchmove", handleTouchMove);
      cardElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [startY, isSwipped, eventTime, endTime, onSwipe, item]);

  return (
    <div className={styles.ItenaryMain}>
      <div className={styles.CardBox}>
        <div className={styles.Popup}>
          <span className={styles.select_dock}>Select & Dock</span>
          <div className={styles.tick_box}>
            <img src="/svgs/correct.svg" alt="tickmark_img" />
          </div>
        </div>
        <div
          className={
            isSwipped !== null
              ? isSwipped
                ? `${styles.Card} ${styles.MovedUp}`
                : `${styles.Card} ${styles.MovedDown}`
              : styles.Card
          }
          style={{
            background: `linear-gradient(90deg, rgba(0, 0, 0, 0.00) 34.01%, rgba(0, 0, 0, 0.80) 66.89%),
                        linear-gradient(270deg, rgba(0, 0, 0, 0.00) 49.17%, rgba(0, 0, 0, 0.60) 92.4%),
                        linear-gradient(0deg, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),
                        lightgray`,
            backgroundPosition: "0px -19.36px",
            backgroundSize: "fit-content",
            backgroundRepeat: "no-repeat",
          }}
          ref={cardRef}
        >
          <div className={styles.bgGradientDiv}></div>
          <img
            src={item.event_details_image_1}
            className={styles.bgImageItenary}
          />
          <div className={styles.hourStatus}>
            {is1Hr ? "> 1 hour" : "< 1 hour"}
          </div>
          <div className={styles.eventNameDiv}>
            {item?.name?.length > 15
              ? item.name.substring(0, 12) + "..."
              : item.name}
          </div>
          <div className={styles.eventDescriptionDiv}>
            {item.description.length > 100
              ? item.description.substring(0, 100) + "..."
              : item.description}
          </div>
          <div className={styles.eventTimeDiv}>Open Till {item.endTime}</div>
        </div>
      </div>
      <div className={styles.not_interested_block}>
        <span className={styles.not_interested}>Not Interested</span>
        <div className={styles.tick_box}>
          <img src="/svgs/cross.svg" alt="cross_img" />
        </div>
      </div>
    </div>
  );
};

export default EventCard;

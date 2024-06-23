import React from "react";
import styles from "./TicketStyle.module.css";
import { useTranslation } from "react-i18next";

const TicketStyles = ({ event }) => {

  const { t } = useTranslation();
  let {
    Adults,
    Pickup,
    Price,
    Booking_ID,
    Place,
    Children,
    Seniors,
    Onwards,
  } = t("ticket_style");

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className={styles.ticket_style_parent}>
      <div
        className={styles.ticket_block1}
        style={{
          backgroundImage: 'url("/svgs/Subtract.svg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className={styles.heading_text1}>{event?.eventName}</div>
        <div className={styles.heading_text11}>
          {event?.ticketCounts?.adults > 0 && (
            <div className={styles.block11}>
              <div className={styles.key1}>{Adults}</div>
              <div className={styles.value1}>{event?.ticketCounts?.adults}</div>
            </div>
          )}
          {event?.ticketCounts?.children > 0 && (
            <div className={styles.block11}>
              <div className={styles.key1}>{Children}</div>
              <div className={styles.value1}>{event?.ticketCounts?.children}</div>
            </div>
          )}
          {event?.ticketCounts?.senior > 0 && (
            <div className={styles.block11}>
              <div className={styles.key1}>{Seniors}</div>
              <div className={styles.value1}>{event?.ticketCounts?.senior}</div>
            </div>
          )}
          <div className={`${styles.block11} ${styles.flex_end}`}>
            <div className={styles.key1}>{Pickup}</div>
            <div className={styles.value1}>{event?.eventPickup}</div>
          </div>
        </div>
        <div className={styles.empty1}>
          <img src="/svgs/Line.svg" alt="" />
        </div>
        <div className={styles.heading_text21}>
          <img src="/svgs/barcode.svg" alt="" />
        </div>
        <div className={styles.heading_text31}>
          <div className={styles.block31}>
            <div className={styles.time_text1}>{event?.eventStartTime} {Onwards}</div>
            <div className={styles.date_text1}>{event?.eventDate}</div>
          </div>
          <div className={styles.block21}>
            <div className={styles.time_text1}>{Price}</div>
            <div className={styles.date_text1}>${event?.totalPrice}</div>
          </div>
        </div>
        <div className={styles.heading_text31}>
          <div className={styles.block31}>
            <div className={styles.time_text1}>{Booking_ID}</div>
            <div className={styles.date_text1}>{event?.bookingID}</div>
          </div>
          <div className={styles.block21}>
            <div className={styles.time_text1}>{Place}</div>
            <div className={styles.date_text1}>{truncateText(event?.eventAddress, 12)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketStyles;

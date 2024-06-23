import React, { useState } from "react";
import styles from "./Seat_Counting.module.css";
import { useGlobalInfo } from "../../../../context/globalContext";
import { choose_seat } from "../../../../Images/Image";
import { useTranslation } from "react-i18next";

const Seat_Counting = ({ onSeatCountNextClick }) => {
  const { t } = useTranslation();
  const { seat_que, Next } = t("choose_seats");
  const seatNumbers = [1, 2, 3, 4, 5, 6];
  const { handleSetNumberofseats, setTotalSeatCount } = useGlobalInfo();

  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (number) => {
    handleSetNumberofseats(number);
    console.log("Selected seat number:", number);
    setSelectedSeat(number);
    setTotalSeatCount(number);
  };

  return (
    <div className={styles.Seat_Counting_Popup}>
      <div className={styles.popup_top_block}>
        <div className={styles.title}>
          <span>{seat_que}</span>
        </div>
        <div className={styles.img_block}>
          <img src={choose_seat.cactus} alt="cactus image" />
        </div>
        <div className={styles.nos}>
          {seatNumbers.map((number) => (
            <span
              key={number}
              className={selectedSeat === number ? styles.no_onclick : ""}
              onClick={() => handleSeatClick(number)}
            >
              {number}
            </span>
          ))}
        </div>
      </div>
      <div
        className={styles.btn_block}
        onClick={() => {
          if (selectedSeat !== null) {
            onSeatCountNextClick();
          }
        }}
      >
        <button>{Next}</button>
      </div>
    </div>
  );
};

export default Seat_Counting;

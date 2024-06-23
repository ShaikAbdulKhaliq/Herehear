import React from "react";
import styles from "./No_Space_Bottom_Block.module.css";
import { choose_seat } from "../../../../Images/Image";
import { useTranslation } from "react-i18next";

const No_Space_Bottom_Block = () => {
  
  const { t } = useTranslation();
  const { seats_text } = t("choose_seats");
  return (
    <div className={styles.noSpace_bottom_container}>
      <div className={styles.img_container}>
        <img src={choose_seat.error} alt="error" />
      </div>
      <div className={styles.text}>{seats_text}</div>
    </div>
  );
};

export default No_Space_Bottom_Block;

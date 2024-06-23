import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Title.module.css";
import { useTranslation } from "react-i18next";

const Title = () => {
  const { t } = useTranslation();
  const { title } = t("dashboard");
  const navigate = useNavigate();
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className={styles.Title}>
      <div className={styles.heading}>{truncateText(title, 15)}</div>
      <div
        className={styles.arrow_block}
        onClick={() => navigate("/dashboard/alleventsv1")}
      >
        <img src={"/svgs/arrowDown.svg"} alt="arrow" className={styles.arrow} />
      </div>
    </div>
  );
};

export default Title;

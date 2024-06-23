import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Back_Stage_Access.module.css";
import { useTranslation } from "react-i18next";

const Back_Stage_Access = () => {
  const { t } = useTranslation();
  let {
    stage_des,
    que,
    list_des1,
    list_des2,
    list_des3,
    list_des4,
    list_des5,
    Back_Stage,
    Next,
  } = t("choose_seats");

  const navigate = useNavigate();

  return (
    <div className={styles.Back_Stage_Access_Container}>
      <div className={styles.content_div}>
        <div className={styles.title}>{Back_Stage}</div>
        <p className={styles.para}>{stage_des}</p>
        <div>
          <span className={styles.ul_title}>{que}</span>
          <ul>
            <li>{list_des1}</li>
            <li>{list_des2}</li>
            <li>{list_des3}</li>
            <li>{list_des4}</li>
            <li>{list_des5}</li>
          </ul>
        </div>
      </div>
      <div
        className={styles.button_div}
        onClick={() => navigate("/dashboard/seat_category")}
      >
        <button>{Next}</button>
      </div>
    </div>
  );
};

export default Back_Stage_Access;

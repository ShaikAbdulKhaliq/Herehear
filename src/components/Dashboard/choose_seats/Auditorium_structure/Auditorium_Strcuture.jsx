import React, { useState } from "react";
import styles from "./Auditorium_Structure.module.css";
import { useGlobalInfo } from "../../../../context/globalContext";
import { useTranslation } from "react-i18next";

const Auditorium_Structure = () => {
  const { t } = useTranslation();
  let { stage, Back_Stage, General, vip } = t("choose_seats");
  const { changeStage } = useGlobalInfo();

  const [selectedArea, setSelectedArea] = useState("");

  const handleClick = (text) => {
    changeStage(text);
    setSelectedArea(text);
  };

  return (
    <div className={`${styles.SeatMain} ${selectedArea === "General" ? styles.selected : ""}`}>
      <div className={`${styles.StageCircle} ${selectedArea === "Stage" ? styles.selected : ""}`} onClick={() => { handleClick("Stage"); }}>
        <span className={`${selectedArea === "Stage" ? styles.selected : ""}`}>{stage}</span>
      </div>
      <div className={`${styles.backStageCircle} ${selectedArea === "Back Stage" ? styles.selected : ""}`} onClick={() => handleClick("Back Stage")}>
        <span>{Back_Stage}</span>
      </div>
      <div className={`${styles.vipCircle} ${selectedArea === "VIP" ? styles.selected : ""}`}>
        <span className={`${styles.vip1} ${selectedArea === "VIP" ? styles.selected : ""}`} onClick={() => handleClick("VIP")}>
          {vip}
        </span>
        <span className={`${styles.vip2} ${selectedArea === "VIP" ? styles.selected : ""}`} onClick={() => handleClick("VIP")}>
          {vip}
        </span>
      </div>
      <div className={styles.trapizoid}></div>
      <div
        className={`${styles.general1} ${selectedArea === "General" ? styles.selected : ""}`}
        // className={styles.general1}
        onClick={() => handleClick("General")}>
        {General}
      </div>
      <div
        className={`${styles.general2} ${selectedArea === "General" ? styles.selected : ""}`}
        // className={styles.general2}
        onClick={() => handleClick("General")}>
        {General}
      </div>
    </div>
  );
};

export default Auditorium_Structure;

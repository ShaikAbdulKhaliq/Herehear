import React, { useState } from "react";
import styles from "./Choose_Seats.module.css";
import Navbar from "./Navbar/Navbar.jsx";
import Auditorium_Strcuture from "./Auditorium_structure/Auditorium_Strcuture.jsx";
import No_Space_Bottom_Block from "./No_Space_Bottom_Block/No_Space_Bottom_Block";
import Seat_Counting from "./Seat_Counting/Seat_Counting";
import Terms_Conditions from "./Terms_Conditions/Terms_Conditions";
import Back_Stage_Access from "./Back_Stage_Access/Back_Stage_Access";
import { useTranslation } from "react-i18next";

const Choose_Seats = () => {
  const [isSwitchClicked, setIsSwitchClicked] = useState(false);
  const [showSeatCounting, setShowSeatCounting] = useState(false);
  const [showNoSpaceBlock, setNoSpaceBlock] = useState(true);
  const [showTermsConditions, setShowTermsConditions] = useState(false);
  const [showBackStageAccess, setShowBackStageAccess] = useState(false);

  const { t } = useTranslation();
  let { Booked, Available, Selected, switch_m, switch_l } = t("choose_seats");

  const clickedSwitch = () => {
    setIsSwitchClicked(!isSwitchClicked);
    setShowSeatCounting(false);
    setTimeout(() => {
      setNoSpaceBlock(!showNoSpaceBlock);
    }, 800);
    setShowTermsConditions(false);
    setShowBackStageAccess(false);
  };

  const handleAuditoriumClick = () => {
    setShowSeatCounting(true);
    setNoSpaceBlock(false);
    setShowTermsConditions(false);
    setShowBackStageAccess(false);
  };

  const handleSeatCountNextButtonClick = () => {
    setShowSeatCounting(false);
    setNoSpaceBlock(false);
    setShowTermsConditions(true);
    setShowBackStageAccess(false);
  };

  const handleCancelClick = () => {
    setNoSpaceBlock(true);
    setShowSeatCounting(false);
    setShowTermsConditions(false);
    setShowBackStageAccess(false);
  };

  const handleAcceptClick = () => {
    setNoSpaceBlock(false);
    setShowSeatCounting(false);
    setShowTermsConditions(false);
    setShowBackStageAccess(true);
  };

  return (
    <div className={styles.ChooseSeatsMain}>
      <div className={styles.ChooseSeatHeader}>
        <Navbar />
      </div>
      <div className={styles.ChooseSeatBody}>
        <div className={styles.seatCategoryDiv}>
          <div className={styles.switchMapDivParent}>
            <div onClick={clickedSwitch} className={styles.switchMapDiv}>
              {isSwitchClicked ? switch_l : switch_m}
            </div>
          </div>
          <div
            className={styles.seatCategory}
            style={{ top: isSwitchClicked ? "90%" : "22%" }}
            onClick={handleAuditoriumClick}
          >
            <Auditorium_Strcuture />
          </div>
        </div>
        <div
          className={styles.seatOptionsDiv}
          style={{
            top: isSwitchClicked ? "55%" : "42%",
            width: isSwitchClicked ? "85%" : "75%",
            height: isSwitchClicked ? "7%" : "5%",
          }}
        >
          <div className={styles.dot1}></div>
          <div className={styles.seatOption1}>{Booked}</div>
          <div className={styles.dot2}></div>
          <div className={styles.seatOption2}>{Available}</div>
          <div className={styles.dot3}></div>
          <div className={styles.seatOption3}>{Selected}</div>
        </div>
        <div className={`${styles.bottom_container}`}>
          {showNoSpaceBlock && <No_Space_Bottom_Block />}
          {showSeatCounting && (
            <Seat_Counting
              onSeatCountNextClick={handleSeatCountNextButtonClick}
            />
          )}
          {showTermsConditions && (
            <Terms_Conditions
              onCancelClick={handleCancelClick}
              onAcceptClick={handleAcceptClick}
            />
          )}
          {showBackStageAccess && <Back_Stage_Access />}
        </div>
      </div>
    </div>
  );
};

export default Choose_Seats;

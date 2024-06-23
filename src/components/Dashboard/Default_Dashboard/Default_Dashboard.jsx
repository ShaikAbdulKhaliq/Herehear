import React, { useEffect } from "react";
import styles from "./Default_Dashboard.module.css";
// import profile from "/svgs/profile.svg";
import rightArrow from "/svgs/rightArrow.svg";
import timeLogo from "/svgs/timeLogo.svg";
import nexusConnectLogo from "/svgs/nexusConnectLogo.svg";
import { useGlobalInfo } from "../../../context/globalContext.jsx";
import { useNavigate } from "react-router-dom";
import WheelScrollerMain from "./WheelScroller/WheelScrollerMain.jsx";
import Carousel from "./Caurosel/Carousel";
import CircleSlider from "./CircleSlider/CircleSlider";
import Radio from "./Radio/Radio.jsx";
import Profile from "./Profile/Profile.jsx";
import { useTranslation } from "react-i18next";

const Default_DashBoard = () => {
  const { t } = useTranslation();
  let { recommendations, lets_go, happening_now_in, title } = t("dashboard");
  const { toggleScroller, totalEvents } = useGlobalInfo();
  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";

  const context = useGlobalInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (totalEvents == null) {
      navigate("/dashboard");
    }
  }, [totalEvents, navigate]);

  return (
    <div className={styles.DashBoardMain}>
      <div className={styles.dashBoardHeader}>
        {/* <div className={styles.dashBoardHeaderLeft}>
          <img src={dashboardHeaderLogo} alt="dashboardHeaderLogo" />
        </div> */}
        {/* <div className={styles.dashBoardHeaderRight}>
          <img src={profile} alt="profile" />
        </div> */}
        <Profile />
      </div>
      <div className={styles.dashBoardRadio}>
        <Radio />
      </div>
      <div className={styles.dashBoardEventName}>
        <div className={styles.eventTitle}>
          <div className={styles.title}>{title}</div>
          <img
            src={rightArrow}
            alt="rightArrow"
            onClick={() => navigate("/dashboard/alleventsv1")}
          />
        </div>
        <div className={styles.eventRecomendations}>
          {totalEvents} &nbsp;
          {recommendations}
        </div>
      </div>
      <div className={styles.dashBoardEventContent}>
        <Carousel />
      </div>
      <div className={styles.dashBoardFooter}>
        <div className={styles.dashboardFooterTop}>
          <>{lets_go}</>
          <img src={timeLogo} onClick={toggleScroller} alt="timeLogo" />
        </div>
        <div className={styles.dashboardFooterBottom}>{happening_now_in} Vegas</div>
        <img
          className={styles.nexusConnectLogo}
          src={nexusConnectLogo}
          alt="nexusConnectLogo"
        />
      </div>
      <div className={styles.circleSlider}>
        <CircleSlider />
      </div>
      <WheelScrollerMain />
    </div>
  );
};

export default Default_DashBoard;

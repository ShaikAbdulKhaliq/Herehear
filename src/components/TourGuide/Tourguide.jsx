import React from "react";
import styles from "./Tourguide.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
function Tourguide() {
  const navigate = useNavigate();
  const currentpath = useLocation();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.GuideMain}>
      <div className={styles.tour_guide_heading}>
        <img src="/svgs/LeftArrow.svg" alt="Back" onClick={handleGoBack} />
        {!currentpath === "/tour-guide/guide_details"
          ? "Be a Tour guide Today"
          : "Tour Guide for you"}
      </div>
      <div className={styles.form_content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Tourguide;

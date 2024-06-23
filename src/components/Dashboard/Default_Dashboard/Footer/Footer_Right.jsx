import React, { useEffect } from "react";
import styles from "./Footer.module.css";
import { dashboard } from "../../../../Images/Image";
import { useGlobalInfo } from "../../../../context/globalContext";
import { useTranslation } from "react-i18next";

const Footer_Right = () => {
  const { t } = useTranslation();
  const { toggleScroller} = useGlobalInfo();
  const { lets_go, happening_now_in } = t("favourites");
  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";
  

  return (
    <div className={styles.footer_right}>
      <div className={styles.txt_block}>
        <div className={styles.top_txt_block}>
          <p>{lets_go}</p>
          <img src={dashboard.clock} alt="clock" onClick={toggleScroller} />
        </div>
        <p className={styles.bottom_txt}>
          {happening_now_in} 
        </p>
      </div>
      <div className={styles.nexus_img_logo}>
        <img src={dashboard.nexus_logo} alt="nexus logo" />
      </div>
    </div>
  );
};

export default Footer_Right;

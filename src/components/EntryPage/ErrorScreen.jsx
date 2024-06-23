import React from "react";
import styles from "./ErrorScreen.module.css";

const ErrorScreen = () => {
  return (
    <div className={styles.Error_container}>
      <div className={styles.logo_text}>
        <span className={styles.text1}>Can’t Hear, Here</span>
        <div className={styles.error_logo}>
          <img src={"/images/splash.png"} alt="Error Logo" />
        </div>
        <div className={styles.error_text}>
          <span className={styles.text2}>Error!</span>
          <span className={styles.text3}>
            We’re sorry , we couldn’t find the page you were looking for
          </span>
        </div>
      </div>
      <div className={styles.nexus_logo}>
        <img src={"/svgs/nexus_logo.svg"} alt="" />
      </div>
    </div>
  );
};

export default ErrorScreen;

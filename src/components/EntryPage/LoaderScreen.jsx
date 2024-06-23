import React, { useEffect } from "react";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.splash_container}>
      <div className={styles.EntryPage_text}>
        <div className={styles.EntryPage}>
          <span className={styles.text1}>Get ready</span>
          <span className={styles.text2}>You will Hear soon!</span>
          <span className={styles.text3}>
            Hang tight! We're setting up your experience.
          </span>
        </div>
        <div className={styles.hearhere_logo}>
          <img
            src="/gifs/loader-animation.gif"
            alt="logo"
            className={styles.image_logo}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;

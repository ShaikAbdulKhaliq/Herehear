import React from "react";
import styles from "./Animation.module.css";

const Animation = () => {
  return (
    <div className={styles.cardTest}>
      <div className={styles.cardTest1}>
        <div className={styles.animatingLine1}></div>
        <div className={styles.animatingLine2}></div>
        <div className={styles.animatingLine3}></div>
        <div className={styles.animatingLine4}></div>
        <div className={styles.animatingLine5}></div>
      </div>
    </div>
  );
};

export default Animation;

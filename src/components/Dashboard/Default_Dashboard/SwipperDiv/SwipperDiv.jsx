import React from "react";
import styles from "./SwipperDiv.module.css";
// import TimeSlider from '../TimeSlider/TimeSlider'

const SwipperDiv = () => {
  return (
    <div className={styles.SwipperDivMain}>
      <div className={styles.SwipperBar}>
        <div className={styles.SwipeDownDiv}></div>
      </div>
      <div className={styles.SwipperOpt}>
        <div className={styles.SwipperOpt1}>Cancel</div>
        <div className={styles.SwipperOpt2}>Happening in New York</div>
        <div className={styles.SwipperOpt3}>Save</div>
      </div>
      <div className={styles.SwipperBody}>{/* <TimeSlider/> */}</div>
    </div>
  );
};

export default SwipperDiv;

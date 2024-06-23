import React from "react";
import styles from "./TourGuideProfile.module.css";
import SearchField from "../Dashboard/EventDetails/SearchOption/SearchField";
import Category from "../Dashboard/AllEvents_V1/Category/Category";
const TourGuideProfile = () => {
  return (
    <div className={styles.tour_profile}>
      <div className={styles.search_field}>
        <SearchField placeholder="Have a show in mind?" />
      </div>
      <div className={styles.Tour_guide_filter}>
        <Category />
      </div>
      <div className={styles.Profile_sec}>
        <div className={styles.image_block}>
          <img
            src="/svgs/profile_1.svg"
            alt=""
            className={styles.img_profile}
          />
        </div>
        <div className={styles.text_block}>
          <div className={styles.text_block_1}>
            <div className={styles.profile_text}>Madhav Baliga</div>
            <div className={styles.icon}>
              <img src="/svgs/profile_icon.svg" alt="" className={styles.badge_icon}/>
            </div>
          </div>
          <div className={styles.text_block_2}>
            <div className={styles.lan}>Languages</div>
            <div className={styles.all_lan}>
              Hindi, English, Japanese, Spanish
            </div>
          </div>
          <div className={styles.text_block_3}>
            <div className={styles.text_block_3_1}>
              <div>Experience</div>
              <div>Price</div>
            </div>
            <div className={styles.text_block_3_2}>
              <div>8 years</div>
              <div>$50/ adult</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;

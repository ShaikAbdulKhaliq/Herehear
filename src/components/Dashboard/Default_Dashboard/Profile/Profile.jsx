import React from "react";
import styles from "./Profile.module.css";
import profile from "/svgs/profile.svg";
import { dashboard } from "../../../../Images/Image";

const Profile = () => {
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_left}>
        <div className={styles.img_sec}>
          <img src={dashboard.logo} alt="logo" />
        </div>

        <p className={styles.left_top_txt}>ear what’s new,</p>
        <p className={styles.left_bottom_txt}>ere in New York!</p>
      </div>
      <div className={styles.profile_right}>
        {/* <div className={styles.circle}>
          <img src={dashboard.profile} alt="profile" className={styles.profile_photo} />
        </div>
        <div className={styles.premium_icon}>
          <img src={dashboard.premium_icon} alt="premium_icon" />
        </div> */}
        <img src={profile} alt="profile" />
      </div>
    </div>
  );
};

export default Profile;

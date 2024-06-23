import React, { useState, useEffect } from "react";
import styles from "./Toggle.module.css";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Toggle = () => {
  const { t } = useTranslation();
  console.log(t("details_of_event").button_text);
  // let { button_text } = t("details_of_event");
  
  const [swiped, setSwiped] = useState(false);
  const [image, setImage] = useState("/svgs/vector-1.svg");
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedRight: () => {
      setSwiped(true);
      setTimeout(() => {
        navigate("/dashboard/choose_seats");
      }, 1200);
    },
  });

  useEffect(() => {
    if (swiped) {
      const timer = setTimeout(() => {
        setImage("/images/tick.png");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [swiped]);

  return (
    <div className={styles.main_toggle}>
      <div {...handlers} style={{ position: "relative" }} className={styles.button_block}>
        <div style={{ position: "absolute", left: swiped ? "83%" : "2%", transition: "left 1s ease-in-out"}} className={styles.circle}>
          <img src={image} alt="" className={styles.vector_img} />
        </div>
        <span className={styles.slider_span}>
          {!swiped ? t("details_of_event").button_text : ""}
        </span>
      </div>
    </div>
  );
};

export default Toggle;

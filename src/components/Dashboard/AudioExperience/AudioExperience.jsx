import React from "react";
import styles from "./AudioExperience.module.css";
import Toggle from "../EventDetails/Toggle/Toggle";
import { useGlobalInfo } from "../../../context/globalContext.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AudioExperience = () => {
  const { events } = useGlobalInfo();
  const navigate = useNavigate();
  const { t } = useTranslation();

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";
  let { title, tickets, Daily, DayTime, night, to, Adult, Youth } = t(
    "audio_guide"
  );
  const handleClick = () => {
    navigate("/dashboard/alleventsv1");
    console.log("cliccked");
  };
  console.log(events[lang][1]);

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div className={styles.audio_container}>
      <div className={styles.block_1}>
        <div className={styles.heading_block}>
          <div className={styles.heading_text}>
            {truncateText(events[lang][1].name, 14)}
          </div>
          <div className={styles.expand_img}>
            <img
              src="/svgs/expand.svg"
              alt=""
              className={styles.expand_image_div}
              onClick={handleClick}
            />
          </div>
        </div>
        <div className={styles.middle_block}>{events[lang][1].description}</div>
        <div className={styles.last_block}>
          <div className={styles.last_block_2}>
            <div>{title}</div>
            <div>
              <img src="/svgs/playbutton.svg" alt="" />
            </div>
          </div>
          <div className={styles.last_block_3}>
            <div>
              <img src="/svgs/ellip.png" alt="" />
            </div>
            <div>{events[lang][1].eventType}</div>
          </div>
        </div>
      </div>
      <div className={styles.block_2}>
        <div className={styles.block_2_1}>
          <div className={styles.text1}>{tickets}</div>
          <div className={styles.text_2}>
            <div className={styles.text_2_1}>{DayTime}</div>
            <div className={styles.text_2_2}>
              {Daily} {events[lang][1].startTime} {to} {events[lang][1].endTime}
            </div>
          </div>
          <div className={styles.text_3}>
            <div className={styles.text_3_1}>
              {Adult} ${events[lang][1].ticketPrice.adults}
            </div>
            <div className={styles.text_3_2}>
              {Youth} ${events[lang][1].ticketPrice.children}
            </div>
          </div>
          <div className={styles.empty}></div>
          <div className={styles.text_2}>
            <div className={styles.text_2_1}>{night}</div>
            <div className={styles.text_2_2}>
              {Daily} {events[lang][1].startTime} {to} {events[lang][1].endTime}
            </div>
          </div>
          <div className={styles.text_3}>
            <div className={styles.text_3_1}>
              {Adult} ${events[lang][1].ticketPrice.adults}
            </div>
            <div className={styles.text_3_2}>
              {Youth} ${events[lang][1].ticketPrice.children}
            </div>
          </div>
        </div>

        <div className={styles.toggle_button}>
          <Toggle />
        </div>
      </div>
    </div>
  );
};

export default AudioExperience;

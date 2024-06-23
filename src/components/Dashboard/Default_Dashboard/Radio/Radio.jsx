import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Radio.module.css";
import ReactPlayer from "react-player";
import { useGlobalInfo } from "../../../../context/globalContext";

const Radio = () => {
  const navigate = useNavigate();

  const {
    selectedData,
    isPlaying,
    handlePlayPause,
    radioData,
    selectedIndex,
    handleClick,
  } = useGlobalInfo();
  
  const playerRef = React.useRef();

  const playPauseHandler = () => {
    handlePlayPause();
    if (playerRef.current) {
      isPlaying ? playerRef?.current?.play() : playerRef?.current?.pause();
    }
  };

  return (
    <div
      className={styles.Radio_container}
      onClick={() => navigate("/dashboard/radio_list")}
    >
      <div className={styles.img_block}>
        <img
          src={
            selectedData?.favicon
              ? selectedData?.favicon
              : "/svgs/LOGO2.png"
          }
          alt=""
          className={styles.logo}
        />
        <div className={styles.live_block}>
          <span className={styles.red_dot}></span>
          <span className={styles.live_txt}>Live</span>
        </div>
      </div>
      <div className={styles.text_buttons_block}>
        <div className={styles.Text1}>
          {selectedData?.name ? selectedData?.name : radioData[0]?.name}
        </div>
        <div className={styles.Text2}>
          {selectedData?.name ? selectedData?.name : radioData[0]?.name}
        </div>
        <div
          className={styles.buttons_block}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <>
            <ReactPlayer
              ref={playerRef}
              url={selectedData?.url_resolved}
              playing={isPlaying}
              controls={true}
              width="0"
              height="0"
              style={{ display: "none" }}
            />
          </>
          <img
            src={"/svgs/button.svg"}
            alt="previousButton"
            className={styles.button_img}
            onClick={() => {
              handleClick(selectedIndex - 1);
              
            }}
          />
          <img
            src={isPlaying ? "/svgs/pause.svg" : "/svgs/button1.svg"}
            alt="playButton"
            className={styles.button_img}
            onClick={playPauseHandler}
          />
          <img
            src={"/svgs/button2.svg"}
            alt="nextButton"
            className={styles.button_img}
            onClick={() => {
              handleClick(selectedIndex + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Radio;

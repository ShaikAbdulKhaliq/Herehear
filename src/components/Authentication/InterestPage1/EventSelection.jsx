import React, { useEffect, useState } from "react";
import styles from "./EventSelection.module.css";
import BubbleChartReact from "./BubbleChartReact";
import { useNavigate } from "react-router-dom";
import { useGlobalInfo } from "../../../context/globalContext";

const EventSelection = () => {
  const navigate = useNavigate();
  const {isReturningUser} = useGlobalInfo
  const [totalClicks, setTotalClicks] = useState(0);
  const [isResetClicked, setIsResetClicked] = useState(false);

  const handleTotalClicksChange = (newTotalClicks) => {
    setTotalClicks(newTotalClicks);
  };

  const handleReset = () => {
    setIsResetClicked(!isResetClicked);
  };

  let titleText = "What are you interested in?";

  if (totalClicks > 0 && totalClicks < 26) {
    titleText = "Choose three or more of your favourites.";
  } else if (totalClicks >= 25) {
    titleText = "Got it.";
  }

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const [fill, setFill] = useState(0);

  useEffect(() => {
    if (fill === 360) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, isReturningUser ? 0 : 3000); 

      return () => clearTimeout(timer);
    }
  }, [fill, navigate, isReturningUser]);
  

  useEffect(() => {
    setFill(Math.min((totalClicks / 25) * 360, 360));
  }, [totalClicks]);

  useEffect(() => {
    setFill(0);
  }, [isResetClicked]);

  return (
    <div className={styles.EventSelectionMain}>
      <div className={styles.eventSelectionTitle}>{titleText}</div>
      <div className={styles.eventSelectionTagLine}>
        Tap once on the preferences you like, or twice on the ones you love.
        Press and hold the ones you don’t
      </div>
      <div className={styles.eventSelectionBody}>
        <BubbleChartReact
          isResetClicked={isResetClicked}
          setIsResetClicked={setIsResetClicked}
          onTotalClicksChange={handleTotalClicksChange}
        />
      </div>
      <div className={styles.eventSelectionFooter}>
        <div onClick={handleReset} className={styles.eventSelectorFooterBox}>
          Reset
        </div>

        <div className={styles.eventSelectorFooterBox}>
          <div
            style={{
              backgroundImage: `conic-gradient(white ${fill}deg, #FFFFFF33 0 360deg)`,
            }}
            className={styles.piechart}
          >
            <div className={styles.piechartText}>You</div>
          </div>
        </div>
        <div className={styles.eventSelectorFooterBox} onClick={handleNavigate}>
          Skip
        </div>
      </div>
    </div>
  );
};

export default EventSelection;

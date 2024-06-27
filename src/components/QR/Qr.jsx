import React, { useState, useEffect } from "react";
import styles from "./Qr.module.css";
import QRCode from "react-qr-code";
import { Logo } from "../../Images/Image";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const Qr = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  let { qr_text } = t("landing_page");

  useEffect(() => {
    let timer;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const handleMouseTouchEnter = () => {
    setIsHovered(true);
  };

  const handleMouseTouchLeave = () => {
    setIsHovered(false);
  };

  const movetonextpage = () => {
    const timer = setTimeout(() => {
      navigate('/authentication/login');
    }, 1000);
  };

  return (
    <div className={styles.QR_Code_container}>
      <div className={styles.Image_Background_Container}>
        <div className={styles.qrbg}></div>
        <div className={styles.qrbg2}></div>
        <div className={styles.qrbg3}></div>
      </div>
      <div className={styles.EntryPageQr}>
        <div className={styles.hearhere_logo}>
          <img src={Logo.Logo} alt="logo" />
        </div>
        <br />
        <div
          className={styles.qr_div}
          onMouseEnter={handleMouseTouchEnter}
          onMouseLeave={handleMouseTouchLeave}
          onTouchStart={handleMouseTouchEnter}
          onTouchEnd={handleMouseTouchLeave}
        >
          <QRCode
            size={180}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={"https://herehear.vercel.app/authentication/login"}
            viewBox={`0 0 180 180`}
            onClick={movetonextpage}
          />
          {isHovered && (
            <div className={styles.hoverMessage}>
              Click the QR code
            </div>
          )}
        </div>
        <br />
        <span>{qr_text}</span>
      </div>
    </div>
  );
};

export default Qr;

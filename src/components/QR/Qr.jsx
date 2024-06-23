import React from "react";
import styles from "./Qr.module.css";
import QRCode from "react-qr-code";
import { Logo } from "../../Images/Image";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'; 

const Qr = () => {
  const { t } = useTranslation();
  let { qr_text } = t("landing_page");
  const navigate=useNavigate()
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
        <div className={styles.qr_div}>
          <QRCode
            size={180}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={"https://hearhere.aidtaas.com/authentication/login"}
            viewBox={`0 0 180 180`}
            onClick={() => navigate('/authentication/login')}
          />
        </div>
        <br />
        <span>{qr_text}</span>
      </div>
    </div>
  );
};

export default Qr;

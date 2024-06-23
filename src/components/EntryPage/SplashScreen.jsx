import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from "./SplashScreen.module.css";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/qr'); 
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className={styles.splash_container}>
      <div className={styles.Image_Background_Container}>
        <div className={styles.qrbg}></div>
        <div className={styles.qrbg2}></div>
        <div className={styles.qrbg3}></div>
      </div>
      <div className={styles.EntryPageQr}>
        <div className={styles.hearhere_logo}>
          <img src="/images/splash.png" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;

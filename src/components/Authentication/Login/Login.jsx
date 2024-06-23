import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import OtpInput from "otp-input-react";
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "../firebase/setup.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Logo } from "../../../Images/Image.js";
import { useGlobalInfo } from "../../../context/globalContext.jsx";
import { generateSecretKey } from "../Crypto/Crypto.js";
import Loader from "../Loader/Loader.jsx";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
const Login = () => {
  const { t } = useTranslation();
  let { description, Next } = t("login_page");
  let { des, resend_text, confirm } = t("otp_page");
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { usersData } = useGlobalInfo();
  const context = useGlobalInfo();
  const navigate = useNavigate();
  const phoneNumber = countryCode + ph;
  const handleMobileNumber = () => {
    context?.updateMobileNumber(phoneNumber.substring(1));
  };
  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";
  useEffect(() => {
    setOtp("");
    setPh("");
  }, []);
  function onSignup() {
    setLoading(true);
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // console.log("Captcha verified:", response);
          },
          "expired-callback": () => {
            window.recaptchaVerifier = null;
          },
        },
        auth
      );
    }
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + countryCode + ph;
    if (formatPh.length !== 14) {
      setPh("");
      toast.error("Please enter the country code along with the phone number");
      setLoading(false);
      return;
    }
    handleMobileNumber();
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP Sent Successfully!");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        toast.error(error.message);
        setPh("");
      });
  }
  function onResendOTP() {
    setOtp("");
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Captcha verified:", response);
          },
          "expired-callback": () => {
            window.recaptchaVerifier = null;
          },
        },
        auth
      );
    }
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + countryCode + ph;
    setLoading(true);
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        toast.success("OTP resent successfully!");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        toast.error("Failed to resend OTP. Please try again later.");
        setOtp("");
      });
  }
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        // console.log("success", 897737)
        localStorage.setItem("confirmedPhoneNumber",  phoneNumber.substring(1))
        setLoading(false);
        const secretKey = generateSecretKey();
        const expiryTime = new Date().getTime() + 8 * 60 * 60 * 1000;
        localStorage.setItem("secretKey", secretKey);
        localStorage.setItem("expiryTime", expiryTime);
        handleMobileNumber();
        try {
          const response = usersData[lang]?.filter(
            (user) => user.mobileNumber === phoneNumber.substring(1)
          );
          console.log(response, "user response from login");
          localStorage.setItem("userDetails", JSON.stringify(response));
          if (response.length === 0) {
            navigate("/authentication/details");
          } else {
            navigate("/authentication/interestspage");
          }
        } catch (error) {
          console.error("Error checking existing user:", error);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to verify OTP. Please try again.");
        setOtp("");
        console.log(err);
        setLoading(false);
      });
  }
  const customOTPInputStyle = {
    background: "none",
    outline: "none",
    borderBottom: "1px solid #FFF",
    width: "none",
    height: "100%",
    aspectRatio: "1",
    margin: "0",
    color: "white",
    fontSize: "32px",
  };
  const mainContainerStyle = showOTP
    ? {
        background: `url("/svgs/otpbg.svg") no-repeat fixed bottom`,
        backgroundRepeat: "no-repeat !important",
        backgroundSize: "98.5% 50%",
        backgroundPosition: "bottom !important",
        overflow: "hidden",
      }
    : {
        background: `url("/svgs/bg3.svg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "98.5% 50%",
        backgroundPosition: "bottom",
        overflow: "hidden",
      };
  return (
    <div className={styles.main_container} style={mainContainerStyle}>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {user ? (
        <div className={styles.form_div_component}>
          ${navigate("/authentication/details")}
        </div>
      ) : (
        <div className={styles.login_container}>
          <div className={styles.img_container}>
            <img src={Logo.Logo} alt="logo" />
          </div>
          {showOTP ? (
            <div className={styles.toggle_container}>
              <div className={styles.input_container}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className={styles.otp_container}
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "2%",
                  }}
                  inputStyles={customOTPInputStyle}
                ></OtpInput>
              </div>
              <div className={styles.para_container}>
                <p>
                  {des}? &nbsp;
                  <span onClick={onResendOTP}>{resend_text}</span>
                </p>
              </div>
              <div className={styles.btn_container} onClick={onOTPVerify}>
                {loading ? <Loader /> : <button>{confirm}</button>}
              </div>
            </div>
          ) : (
            <div className={styles.toggle_container}>
              <div className={styles.input_container}>
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  placeholder="+91"
                  className={styles.phone_countrycode}
                />
                <input
                  type="text"
                  value={ph}
                  onChange={(e) => {
                    setPh(e.target.value);
                  }}
                  placeholder="Phone Number"
                  className={styles.phone_number}
                />
              </div>
              <div className={styles.para_container}>
                <p>{description}</p>
              </div>
              <div className={styles.btn_container}>
                {loading ? (
                  <Loader />
                ) : (
                  <button onClick={onSignup}>{Next}</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.nexus_logo}>
        <img src="/svgs/nexus_logo.svg" alt="logo" />
      </div>
    </div>
  );
};
export default Login;
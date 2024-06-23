import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { choose_seat } from "../../../../Images/Image";
import { useGlobalInfo } from "../../../../context/globalContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { selectedeventdetails } = useGlobalInfo();
  console.log("selected", selectedeventdetails);

  useEffect(() => {
    if (Object.keys(selectedeventdetails).length === 0) {
      navigate("/dashboard");
    }
  }, [selectedeventdetails, navigate]);

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + "...";
    }
    return text;
  };
  let formattedDate = "";
  try {
    formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(selectedeventdetails.date));
  } catch (error) {
    console.error("Error in date formatting:", error);
    navigate("/dashboard");
  }

  return (
    <div className={styles.Navbar_Container}>
      <div className={styles.searchbar}>
        <div
          className={styles.img_div}
          onClick={() => navigate("/dashboard/eventdetails")}
        >
          <img src={choose_seat.arrow} alt="arrow" />
        </div>
        <div className={styles.txt_div}>
          <div className={styles.txt_top}>{truncateText(selectedeventdetails?.name,20)}</div>
          <div className={styles.txt_bottom}>
            <span className={styles.date}>{formattedDate}</span>&nbsp;
            <span className={styles.time}>
              {selectedeventdetails?.startTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
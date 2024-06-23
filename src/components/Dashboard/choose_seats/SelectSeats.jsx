import React, { useState, useEffect } from "react";
import styles from "./SelectSeats.module.css";
import Seats from "./seats/Seats";
import { useGlobalInfo } from "../../../context/globalContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const SelectSeats = () => {
  const {
    updateTotalPrice,
    selectedeventdetails,
    numberofseats,
    handleSetSelected_seats,
    handleSection,
  } = useGlobalInfo();

  const { t } = useTranslation();
  let { Booked, Available, Selected, wheel_chair_Companion } = t(
    "choose_seats"
  );
  const [showSeatDetails, setShowSeatDetails] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const { selectedSeatsCount, stage } = useGlobalInfo();
  const [seatsCount, setSeatsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selected, setSelected] = useState([]);

  // useEffect(() => {
  //   if (selected.length > 0) {
  //     const firstChars = selected.map((item) => item[0]);
  //     const uniqueChars = [...new Set(firstChars)];

  //     if (uniqueChars.length === 1) {
  //       handleSection(uniqueChars[0]);
  //     } else {
  //       handleSection(uniqueChars.join(","));
  //     }
  //   }
  // }, [selected]);
  useEffect(() => {
    if (selected.length > 0) {
      const firstChars = selected.map((item) => item[0]);
      const uniqueChars = [...new Set(firstChars)];

      if (uniqueChars.length === 1) {
        handleSection(uniqueChars[0]);
      } else {
        handleSection(uniqueChars.join(","));
      }
    }
  }, [selected]);

  let navigate = useNavigate();

  const calculatePrice = (count) => {
    const pricePerSeat = selectedeventdetails.ticketPrice;
    const total = count * pricePerSeat;
    setTotalPrice(total);
  };

  useEffect(() => {
    if (selectedSeatsCount !== null && selectedSeatsCount !== undefined) {
      setSeatsCount(selectedSeatsCount);
      calculatePrice(selectedSeatsCount);
    }
    updateTotalPrice(totalPrice);
  }, [selectedSeatsCount, totalPrice]);

  const handleSeatsCountChange = (count, selectedseats) => {
    setSelected(selectedseats);
    setSeatsCount(count);
    calculatePrice(count);
  };

  const handleSeatDetails = () => {
    setShowSeatDetails(!showSeatDetails);
    if (showSeatDetails) {
      setScaleFactor(1.2577);
    } else {
      setScaleFactor(1);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className={styles.seats_main_container}>
      <div className={styles.choose_seats_events}>
        <Navbar />
      </div>
      <div className={styles.seat_selection_container}>
        <div className={styles.stage_container}>
          <img src={"/svgs/Stage.svg"} alt="stage" />
          <span className={styles.stage_text}>{stage}</span>
        </div>
        <div
          className={`${styles.seat_box} ${
            !showSeatDetails ? styles.showDetails : ""
          }`}
        >
          <Seats onSelectSeatsCount={handleSeatsCountChange} />
        </div>
        <div className={styles.seat_status}>
          <div className={styles.block_one}>
            <div className={styles.booked_block}>
              <div className={styles.dot1}></div>&nbsp;
              <div className={styles.txt}>{truncateText(Booked, 6)}</div>
            </div>
            <div className={styles.available_block}>
              <div className={styles.dot2}></div>&nbsp;
              <div className={styles.txt}>{truncateText(Available, 6)}</div>
            </div>
            <div className={styles.selected_block}>
              <div className={styles.dot3}></div>&nbsp;
              <div className={styles.txt}>{truncateText(Selected, 4)}</div>
            </div>
          </div>
          <div className={styles.block_two}>
            <div className={styles.wheelchair_block}>
              <div className={styles.dot4}></div>&nbsp;
              <div className={styles.txt}>{wheel_chair_Companion}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.btn_block}
        onClick={() => {
          if (numberofseats === seatsCount) {
            handleSetSelected_seats(selected);
            navigate("/dashboard/fill_details");
          } else {
            toast.error("Please select exact count of seats");
          }
        }}
      >
        <button>Next</button>
      </div>
    </div>
  );
};

export default SelectSeats;

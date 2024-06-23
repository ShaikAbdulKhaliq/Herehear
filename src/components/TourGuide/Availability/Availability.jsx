import React, { useState } from "react";
import styles from "./Availability.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Availability() {
  const [language, setLanguage] = useState("");
  const [isAllBookingsAllowed, setIsAllBookingsAllowed] = useState("");
  const [isPrior3hBookingAllowed, setIsPrior3hBookingAllowed] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endAt, setEndAt] = useState("");
  const [daysOfActivity, setDaysOfActivity] = useState([]);
  const [paxLimit, setPaxLimit] = useState("");
  const navigate = useNavigate();
  const handleDayClick = (day) => {
    if (!daysOfActivity.includes(day + " ")) {
      if (daysOfActivity.includes("Everyday")) {
        setDaysOfActivity([day + " "]);
      } else {
        setDaysOfActivity([...daysOfActivity, day + " "]);
      }
    }
    if (daysOfActivity.length === 6) {
      setDaysOfActivity(["Everyday"]);
    }
  };

  function handleSave() {
    if (language.length === 0) {
      toast.error("Select language", { autoClose: 1500 });
      return false;
    } else if (startTime.length == 0) {
      toast.error("Select Start Time", { autoClose: 1500 });
      return false;
    } else if (endTime.length === 0) {
      toast.error("Select End Time", { autoClose: 1500 });
      return false;
    } else if (daysOfActivity.length === 0) {
      toast.error("Select active days", { autoClose: 1500 });
      return false;
    } else if (paxLimit.length === 0) {
      toast.error("Enter paxLimit", { autoClose: 1500 });
      return false;
    } else if (isAllBookingsAllowed.length === 0) {
      toast.error("Select Last minute bookings", { autoClose: 1500 });
      return false;
    } else if (isPrior3hBookingAllowed.length === 0) {
      toast.error("Select Last minute edit booking", { autoClose: 1500 });
      return false;
    } else {
      return true;
    }
  }

  function handleSubmit() {
    if (handleSave()) {
      console.log({
        language,
        startTime,
        endTime,
        daysOfActivity,
        paxLimit,
        isAllBookingsAllowed,
        isPrior3hBookingAllowed,
      });
      navigate("/tour-guide/upload-docs");
    }
  }

  return (
    <>
      <div className={styles.availabiltyScreen}>
        <div className={styles.guideFormTitle}>Availability</div>
        <div className={styles.availablityDiv}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={styles.availabletext}
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>

          <div className={styles.timingDiv}>
            <div className={styles.timingDivTop}>
              <div className={styles.timingTopLeft}>Start Time</div>
              <div className={styles.timingTopRight}>End Time</div>
            </div>
            <div className={styles.timingDivBottom}>
              <input
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start Time"
                className={styles.startTime}
              />
              <input
                onChange={(e) => setStartAt(e.target.value)}
                placeholder="AM"
                className={styles.startAt}
              />
              <input
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End Time"
                className={styles.endTime}
              />
              <input
                onChange={(e) => setEndAt(e.target.value)}
                placeholder="PM"
                className={styles.endAt}
              />
            </div>
          </div>

          <div className={styles.guideFormTitle}>Days of activity</div>
          <div className={styles.availabletext}>
            {daysOfActivity.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>

          <div className={styles.daysOfActivity}>Other</div>
          <div className={styles.daysDiv}>
            <div
              className={`${styles.day} ${
                daysOfActivity.includes("Monday") ? styles.selected : ""
              }`}
              onClick={() => handleDayClick("Monday")}
            >
              M
            </div>
            <div
              className={`${styles.day} ${
                daysOfActivity.includes("Tuesday") ? styles.selected : ""
              }`}
              onClick={() => handleDayClick("Tuesday")}
            >
              T
            </div>
            <div
              className={`${styles.day} ${
                daysOfActivity.includes("Wednesday") ? styles.selected : ""
              }`}
              onClick={() => handleDayClick("Wednesday")}
            >
              W
            </div>
            <div
              className={`${styles.day} ${
                daysOfActivity.includes("Thursday") ? styles.selected : ""
              }`}
              onClick={() => handleDayClick("Thursday")}
            >
              T
            </div>
            <div
              className={`${styles.day} ${
                daysOfActivity.includes("Friday") ? styles.selected : ""
              }`}
              onClick={() => handleDayClick("Friday")}
            >
              F
            </div>
            <div
              className={`${styles.day} ${
                daysOfActivity.includes("Saturday") ? styles.selected : ""
              }`}
              onClick={() => handleDayClick("Saturday")}
            >
              S
            </div>
            <div
              className={`${styles.day} ${
                daysOfActivity.includes("Sunday") ? styles.selected : ""
              }`}
              onClick={() => handleDayClick("Sunday")}
            >
              S
            </div>
          </div>

          <input
            onChange={(e) => setPaxLimit(e.target.value)}
            placeholder="Pax Limit"
            className={styles.availabletext}
          />

          <div className={styles.daysOfActivity}>Last minute bookings</div>
          <select
            value={isAllBookingsAllowed}
            onChange={(e) => setIsAllBookingsAllowed(e.target.value)}
            className={styles.availabletext}
          >
            <option value="">All bookings allowed?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <div className={styles.daysOfActivity}>
            Last minute edit booking (Free only)
          </div>
          <select
            value={isPrior3hBookingAllowed}
            onChange={(e) => setIsPrior3hBookingAllowed(e.target.value)}
            className={styles.availabletext}
          >
            <option value="">Prior 3h booking allowed?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className={styles.titleSubmitDiv} onClick={handleSubmit}>
        Save & Next
      </div>
    </>
  );
}

export default Availability;

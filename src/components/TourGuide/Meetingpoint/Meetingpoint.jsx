import React, { useState } from "react";
import styles from "./Meetingpoint.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Meetingpoint() {
  const [meetingPointName, setMeetingPointName] = useState("");
  const [pricePerPaxMeeting, setpricePerPaxMeeting] = useState("");
  const [addRecommendations, setAddRecommendations] = useState("");
  const [thingsToNote, setThingsToNote] = useState("");
  const navigate = useNavigate()
  const handleMeetingPointNameChange = (e) => {
    setMeetingPointName(e.target.value);
  };

  const handlepricePerPaxMeetingChange = (e) => {
    setpricePerPaxMeeting(e.target.value);
  };

  const handleAddRecommendationsChange = (e) => {
    setAddRecommendations(e.target.value);
  };

  const handleThingsToNoteChange = (e) => {
    setThingsToNote(e.target.value);
  };

  function handleSave() {
    if (meetingPointName.length === 0) {
      toast.error("Enter meeting point name", { autoClose: 1500 });
      return false;
    } else if (pricePerPaxMeeting.length == 0) {
      toast.error("Enter Price Per Pax", { autoClose: 1500 });
      return false;
    } else if (addRecommendations.length === 0) {
      toast.error("Enter Recommendations", { autoClose: 1500 });
      return false;
    } else if (thingsToNote.length === 0) {
      toast.error("Enter notes", { autoClose: 1500 });
      return false;
    } else {
      return true;
    }
  }

  function handleSubmit() {
    if (handleSave()) {
      console.log({
        meetingPointName,
        pricePerPaxMeeting,
        addRecommendations,
        thingsToNote,
      });
      navigate("/tour-guide/availability");
    }
  }

  return (
    <>
      <div className={styles.MeetingPointDiv}>
        <div className={styles.guideFormTitle}>Meeting Point</div>
        <div className={styles.productPricingData}>
          <input
            placeholder="Meeting Point Name"
            value={meetingPointName}
            onChange={handleMeetingPointNameChange}
            className={styles.typeOfAct}
          />
          <input
            placeholder="Price Per Pax"
            value={pricePerPaxMeeting}
            onChange={handlepricePerPaxMeetingChange}
            className={styles.typeOfAct}
          />
          <div className={styles.onArrivalDiv}>On Arrival</div>
          <input
            placeholder="Add Recommendations"
            value={addRecommendations}
            onChange={handleAddRecommendationsChange}
            className={styles.typeOfAct}
          />
          <div className={styles.onArrivalDiv}>Things to Note</div>
          <input
            placeholder="Things to Note"
            value={thingsToNote}
            onChange={handleThingsToNoteChange}
            className={styles.typeOfAct}
          />
        </div>
      </div>
      <div className={styles.titleSubmitDiv} onClick={handleSubmit}>
        Save & Next
      </div>
    </>
  );
}

export default Meetingpoint;

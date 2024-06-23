import React, { useState } from "react";
import styles from "./Uploadingdocs.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Uploadingdocs() {
  const [guidephoto, setGuidephoto] = useState("");
  const [guidecard, setGuidecard] = useState("");
  const navigate = useNavigate();

  function handleSave() {
    if (guidephoto.length === 0) {
      toast.error("Upload guide photo", { autoClose: 1500 });
      return false;
    } else if (guidecard.length == 0) {
      toast.error("Upload guide card", { autoClose: 1500 });
      return false;
    } else {
      return true;
    }
  }

  function handleSubmit() {
    if (handleSave()) {
      console.log({ guidephoto, guidecard });
      navigate("/tour-guide/guide_profile");
    }
  }

  return (
    <>
      <div className={styles.UploadDoc}>
        <div className={styles.guideFormTitle}>Upload documents</div>
        <div className={styles.GuidePhoto}>Upload tour guide photo</div>
        <label className={styles.fileUploadButton}>
          <input
            type="file"
            className={styles.uploadMedia}
            onChange={(e) => {
              setGuidephoto(e.target.files[0].name);
            }}
          />
          <div>{guidephoto.length === 0 ? "Add Photo" : `${guidephoto}`}</div>
        </label>
        <div className={styles.GuidePhoto}>Upload professional guide card</div>
        <label className={styles.fileUploadButton}>
          <input
            type="file"
            placeholder="Add Document"
            className={styles.uploadMedia}
            onChange={(e) => {
              setGuidecard(e.target.files[0].name);
            }}
          />
          <div>{guidecard.length === 0 ? "Add Document" : `${guidecard}`}</div>
        </label>
      </div>
      <div className={styles.titleSubmitDiv} onClick={handleSubmit}>
        Save & Next
      </div>
    </>
  );
}

export default Uploadingdocs;

import React, { useState } from "react";

import styles from "./Guide.module.css";

const Guide = () => {
  const [flag, setFlag] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [saveCount, setSaveCount] = useState(0);

  return (
    <div className={styles.GuideMain}>
      <div className={styles.titleForm}>
        <img
          onClick={() => {
            if (saveCount > 0) {
              setSaveCount(saveCount - 1);
            }
          }}
          src={"/svgs/Arrow_Down.svg"}
        />
        Be a Tour guide
      </div>{" "}
      <div className={styles.GuideForm}>
        {saveCount === 0 ? (
          <>
            <div className={styles.guideFormTitle}>
              {saveCount == 1
                ? "Create a Product"
                : saveCount === 0
                ? "Add Personal Details"
                : null}
            </div>
            <div
              onClick={() => {
                setFlag(!flag);
              }}
              className={styles.guideFullName}
            >
              {!selectedContent.length
                ? "What type of provider are you?"
                : selectedContent}
            </div>
            {flag ? (
              <>
                <div
                  onClick={() => {
                    setFlag(false);
                    setSelectedContent("I’m a local without experience");
                  }}
                  type="text"
                  placeholder=""
                  className={styles.guideFullNameOption}
                >
                  I’m a local without experience
                </div>
                <div
                  onClick={() => {
                    setFlag(false);
                    setSelectedContent("I’m an expert in showing my city!");
                  }}
                  type="text"
                  placeholder=""
                  className={styles.guideFullNameOption}
                >
                  I’m an expert in showing my city!
                </div>
                <div
                  onClick={() => {
                    setFlag(false);
                    setSelectedContent("I’m a professional local guide");
                  }}
                  type="text"
                  placeholder=""
                  className={styles.guideFullNameOption}
                >
                  I’m a professional local guide
                </div>
                <div
                  onClick={() => {
                    setFlag(false);
                    setSelectedContent("I have a guiding license");
                  }}
                  type="text"
                  placeholder=""
                  className={styles.guideFullNameOption}
                >
                  I have a guiding license
                </div>
              </>
            ) : null}

            <input
              type="text"
              placeholder="Full Name"
              className={styles.guideFullName}
            />
            <input
              type="text"
              placeholder="Email"
              className={styles.guideFullName}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className={styles.guideFullName}
            />
            <input
              type="text"
              placeholder="Country"
              className={styles.guideFullName}
            />
          </>
        ) : null}
        {saveCount === 1 ? (
          <>
            <div className={styles.guideFormTitle}>
              {saveCount === 0
                ? "Add Personal Details"
                : saveCount === 1
                ? "Create a Product"
                : null}
            </div>
            <div
              onClick={() => {
                setFlag(!flag);
              }}
              className={styles.guideFullName}
            >
              {!selectedContent.length
                ? "What type of provider are you?"
                : selectedContent}
            </div>
            {flag ? (
              <>
                <div
                  onClick={() => {
                    setFlag(false);
                    setSelectedContent("I’m a local without experience");
                  }}
                  type="text"
                  placeholder=""
                  className={styles.guideFullNameOption}
                >
                  I’m a local without experience
                </div>
                <div
                  onClick={() => {
                    setFlag(false);
                    setSelectedContent("I’m an expert in showing my city!");
                  }}
                  type="text"
                  placeholder=""
                  className={styles.guideFullNameOption}
                >
                  I’m an expert in showing my city!
                </div>
                <div
                  onClick={() => {
                    setFlag(false);
                    setSelectedContent("I’m a professional local guide");
                  }}
                  type="text"
                  placeholder=""
                  className={styles.guideFullNameOption}
                >
                  I’m a professional local guide
                </div>
                <div
                  onClick={() => {
                    setFlag(false);
                    setSelectedContent("I have a guiding license");
                  }}
                  type="text"
                  placeholder=""
                  className={styles.guideFullNameOption}
                >
                  I have a guiding license
                </div>
              </>
            ) : null}

            <input
              type="text"
              placeholder="Full Name"
              className={styles.guideFullName}
            />
            <input
              type="text"
              placeholder="Email"
              className={styles.guideFullName}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className={styles.guideFullName}
            />
            <input
              type="text"
              placeholder="Country"
              className={styles.guideFullName}
            />
          </>
        ) : null}
      </div>
      <div
        onClick={() => {
          setSaveCount(saveCount + 1);
        }}
        className={styles.titleSubmitDiv}
      >
        Save & Next
      </div>
    </div>
  );
};

export default Guide;

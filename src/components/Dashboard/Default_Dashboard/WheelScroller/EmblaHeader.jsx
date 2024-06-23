import React from "react";
import { useGlobalInfo } from "../../../../context/globalContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EmblaHeader = () => {
  const { t } = useTranslation();
  let { cancel, save, days, hours } = t("wheelscroller");
  let { happening_now_in } = t("dashboard");
  const { toggleScroller, events } = useGlobalInfo();
  const navigate = useNavigate();
  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";
  const handleSave = () => {
    toggleScroller();
    setTimeout(() => {
      navigate("/dashboard/itinerary");
    }, 800);
  };

  const handleCancel = () => {
    toggleScroller();
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  return (
    <header className="header_main">
      <button className="header_btn" onClick={handleCancel}>
        {cancel}
      </button>
      <div className="header">{happening_now_in}</div>
      <button className="header_btn" onClick={handleSave}>
        {save}
      </button>
    </header>
  );
};

export default EmblaHeader;

import React, { useState, useEffect } from "react";
import styles from "./EventDetails.module.css";
import SearchField from "./SearchOption/SearchField";
import CardNavbar from "./CardNavbarContainer/CardNavbar";
import Description from "./Description_Container/Description";
import Toggle from "./Toggle/Toggle";
import { useGlobalInfo } from "../../../context/globalContext";
import { useTranslation } from "react-i18next";
import Animated_Loader from "../Animated_Loader/Animated_Loader";

const EventDetails = () => {
  const { t } = useTranslation();
  const { no_event_data } = t("dashboard");
  const { selectedeventdetails, events, lang, loading } = useGlobalInfo();
  const [showMap, setShowMap] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (events && lang) {
      setFilteredEvents(events[lang] || []);
    }
  }, [events, lang]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (events && lang) {
      const filteredData = events[lang]?.filter((event) =>
        event.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredEvents(filteredData);
    }
  };

  if (!selectedeventdetails) {
    return <div>{no_event_data}</div>;
  }

  if (loading) {
    return (
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
        <Animated_Loader size={15}/>
      </div>
    );
  }

  return (
    <div
      className={`${styles.event_details_container} ${
        showMap ? "" : styles.showPadding
      }`}
    >
      {!showMap && (
        <div className={styles.searchBar_container}>
          <SearchField
            placeholder={`Have a show in mind?`}
            onSearch={handleSearch}
          />
        </div>
      )}
      {showMap ? (
        <div className={styles.map_container}>
          <Description
            event={selectedeventdetails}
            showOnlyMap={true}
            setShowMap={setShowMap}
          />
        </div>
      ) : (
        <div className={styles.card_details_container}>
          <div className={styles.card_navbar_container}>
            <CardNavbar event={selectedeventdetails} />
          </div>
          <div className={styles.description_container}>
            <Description event={selectedeventdetails} setShowMap={setShowMap} />
          </div>
          <div className={styles.toggle_container}>
            <Toggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;

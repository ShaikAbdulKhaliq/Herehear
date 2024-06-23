import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ConfirmedTickets.module.css";
import TicketStyle from "./TicketStyle/TicketStyle";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/react";
import { useGlobalInfo } from "../../../../context/globalContext";
import CircleSlider from "../../Default_Dashboard/CircleSlider/CircleSlider.jsx";
import { dashboard } from "../../../../Images/Image.js";
import { useTranslation } from "react-i18next";

const ConfirmedTickets = () => {
  const { usersData } = useGlobalInfo();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState({});
  const [expandedIndices, setExpandedIndices] = useState([]);

  const handleArrowClick = () => {
    navigate("/dashboard");
  };

  const lang = localStorage.getItem("i18nextLng")?.slice(0, 2) || "en";

  const categories = [
    { key: "tours", title: t("booking_history.tours"), filter: (event) => event.eventCategory === "Adventure" },
    { key: "concerts", title: t("booking_history.concerts"), filter: (event) => event.eventCategory === "Concerts" },
    { key: "events", title: t("booking_history.events"), filter: (event) => ["Fashion", "Sports", "Futuristic", "Comedy", "Magic", "Culture", "Others"].includes(event.eventCategory) },
    { key: "dining", title: t("booking_history.dining"), filter: (event) => ["Fine-Dine", "Food & Beverage"].includes(event.eventCategory) }
  ];

  const filterEvents = (query) => {
    if (!query) {
      return {};
    }

    const newFilteredEvents = {};
    const newExpandedIndices = [];

    categories.forEach(({ key, filter }, index) => {
      const events = usersData?.[lang]?.flatMap(user =>
        user?.bookedEvents?.filter(filter).filter(event =>
          event.eventName?.toLowerCase().includes(query) ||
          event.eventCategory?.toLowerCase().includes(query) ||
          event.eventAddress?.toLowerCase().includes(query) ||
          event.eventPickup?.toLowerCase().includes(query)
        )
      ) || [];

      if (events.length > 0) {
        newFilteredEvents[key] = events;
        newExpandedIndices.push(index);
      }
    });

    return { newFilteredEvents, newExpandedIndices };
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const { newFilteredEvents, newExpandedIndices } = filterEvents(query);
    setFilteredEvents(newFilteredEvents);
    setExpandedIndices(newExpandedIndices);
  };

  const toggleAccordion = (index) => {
    setExpandedIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const getEvents = (filter, key) => {
    return filteredEvents[key] || usersData?.[lang]?.flatMap(user =>
      user?.bookedEvents?.filter(filter)
    ) || [];
  };

  const renderEvents = (events) => {
    return events.length ? (
      events.map((event) => <TicketStyle key={event.bookingID} event={event} />)
    ) : (
      <span role="img" aria-label="Sad emoji" style={{ color: "white" }}>
        😞 {t("booking_history.nothing_to_show")}
      </span>
    );
  };

  return (
    <div className={styles.my_confirmed_tickets_parent}>
      <header className={`${styles.my_confirmed_tickets_parent_header} ${styles.arrowimg}`}>
        <img src="/svgs/cticketlogo.svg" alt="applogo" className={styles.choose_seats_events_logo} />
        <p className={styles.my_confirmed_tickets_content}>{t("booking_history.title_content")}</p>
      </header>
      <div className={styles.search_box_container}>
        <div className={styles.input_field_logo} onClick={handleArrowClick}>
          <img src="/svgs/ChooseSeatsarrow.svg" alt={t("booking_history.back_arrow")} className={styles.choose_seats_events_arrow} />
        </div>
        <div className={styles.search_bar}>
          <input
            type="text"
            placeholder={t("booking_history.search_placeholder")}
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className={styles.search_img}>
            <img src="/svgs/Search.svg" alt={t("booking_history.search_alt")} className={styles.img} />
          </div>
        </div>
      </div>
      <div className={styles.select_ticket_container}>
        <Accordion allowMultiple index={expandedIndices}>
          {categories.map(({ key, title, filter }, index) => {
            const events = getEvents(filter, key);
            const hasEvents = events.length > 0;
            return (
              <AccordionItem key={key} className={styles.AccordionItem}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      className={`${styles.AccordionButton} ${isExpanded && hasEvents ? styles.AccordionButtonExpanded : ""}`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <Box className={styles.AccordionBox} as="span" flex="1" textAlign="left">
                        {title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} className={`${styles.dropdown} ${isExpanded ? styles.margin_on_expanded : ""}`}>
                      {renderEvents(events)}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <footer className={styles.FooterContainer}>
        <div className={styles.menu_container}>
          <CircleSlider />
        </div>
        <div className={styles.logo_name}>
          <img src={dashboard.nexus_logo} alt={t("booking_history.logo")} />
        </div>
      </footer>
    </div>
  );
};

export default ConfirmedTickets;

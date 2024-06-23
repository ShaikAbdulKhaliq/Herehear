import React, { useState, useEffect } from "react";
import styles from "./Itinerary.module.css";
import EventCard from "./EventCard";
import { useGlobalInfo } from "../../../context/globalContext";
import { useNavigate } from "react-router-dom";

const Itinerary = () => {
  const [totaldays, setTotalDays] = useState(0);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [notInterestedEvents, setNotInterestedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedTime, events } = useGlobalInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTime.time === "Hours") {
      setTotalDays(1);
    } else {
      setTotalDays(selectedTime.count);
    }
  }, [selectedTime]);

  const eventsData =
    events && events["en"] && Array.isArray(events["en"]) ? events["en"] : [];

  const groupedData = eventsData.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const dateKey = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    if (!acc[dateKey]) {
      acc[dateKey] = {};
    }

    if (!acc[dateKey][curr.startTime]) {
      acc[dateKey][curr.startTime] = [];
    }

    acc[dateKey][curr.startTime].push(curr);

    return acc;
  }, {});

  const sortedGroupedData = Object.keys(groupedData)
    .sort((a, b) => new Date(a) - new Date(b))
    .reduce((acc, key) => {
      acc[key] = Object.keys(groupedData[key])
        .sort((a, b) => {
          const [timeA, periodA] = a.split(" ");
          const [timeB, periodB] = b.split(" ");

          if (periodA !== periodB) {
            return periodA === "AM" ? -1 : 1;
          }

          const [hourA, minuteA] = timeA.split(":").map(Number);
          const [hourB, minuteB] = timeB.split(":").map(Number);

          return hourA !== hourB ? hourA - hourB : minuteA - minuteB;
        })
        .reduce((timeAcc, timeKey) => {
          timeAcc[timeKey] = groupedData[key][timeKey];
          return timeAcc;
        }, {});

      return acc;
    }, {});

  const [selectedDate, setSelectedDate] = useState(
    Object.keys(sortedGroupedData)[0] || ""
  );

  const handleButtonClick = (dateKey) => {
    setSelectedDate(dateKey);
  };

  const handleSwipe = (item, direction) => {
    if (direction === "down") {
      setSelectedEvents((prevSelectedEvents) => {
        if (!prevSelectedEvents.includes(item.id)) {
          return [...prevSelectedEvents, item.id];
        }
        return prevSelectedEvents;
      });
      setNotInterestedEvents((prevNotInterestedEvents) =>
        prevNotInterestedEvents.filter((eventId) => eventId !== item.id)
      );
    } else if (direction === "up") {
      setNotInterestedEvents((prevNotInterestedEvents) => {
        if (!prevNotInterestedEvents.includes(item.id)) {
          return [...prevNotInterestedEvents, item.id];
        }
        return prevNotInterestedEvents;
      });
      setSelectedEvents((prevSelectedEvents) =>
        prevSelectedEvents.filter((eventId) => eventId !== item.id)
      );
    }
  };

  console.log("selectedEvents", selectedEvents);
  console.log("notInterestedEvents", notInterestedEvents);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter events based on the search term
  const filteredEventsData = eventsData.filter((event) => {
    return Object.values(event).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    );
  });

  // Group filtered events by date
  const filteredGroupedData = filteredEventsData.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const dateKey = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    if (!acc[dateKey]) {
      acc[dateKey] = {};
    }

    if (!acc[dateKey][curr.startTime]) {
      acc[dateKey][curr.startTime] = [];
    }

    acc[dateKey][curr.startTime].push(curr);

    return acc;
  }, {});

  const sortedFilteredGroupedData = Object.keys(filteredGroupedData)
    .sort((a, b) => new Date(a) - new Date(b))
    .reduce((acc, key) => {
      acc[key] = Object.keys(filteredGroupedData[key])
        .sort((a, b) => {
          const [timeA, periodA] = a.split(" ");
          const [timeB, periodB] = b.split(" ");

          if (periodA !== periodB) {
            return periodA === "AM" ? -1 : 1;
          }

          const [hourA, minuteA] = timeA.split(":").map(Number);
          const [hourB, minuteB] = timeB.split(":").map(Number);

          return hourA !== hourB ? hourA - hourB : minuteA - minuteB;
        })
        .reduce((timeAcc, timeKey) => {
          timeAcc[timeKey] = filteredGroupedData[key][timeKey];
          return timeAcc;
        }, {});

      return acc;
    }, {});

  // Determine which grouped data to display based on search term
  const dataToDisplay = searchTerm
    ? sortedFilteredGroupedData
    : sortedGroupedData;

  const displayedDays = Object.keys(dataToDisplay).slice(0, totaldays);

  return (
    <div className={styles.Itinerary_container}>
      <div className={styles.searchbar}>
        <div
          className={styles.img_container}
          onClick={() => navigate("/dashboard")}
        >
          <img src={"/svgs/arrowDown.svg"} alt="arrow" />
        </div>
        <div className={styles.search_event_container}>
          <input
            type="text"
            placeholder="Search events"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <img src={"/svgs/edit.svg"} alt="edit_icon" />
        </div>
      </div>

      <div className={styles.ItenaryComponentMain}>
        <div className={styles.dateButtons}>
          {displayedDays.map((dateKey, index) => (
            <div
              key={dateKey}
              onClick={() => handleButtonClick(dateKey)}
              className={
                dateKey === selectedDate
                  ? `${styles.dateButton} ${styles.active}`
                  : styles.dateButton
              }
            >
              {`Day ${index + 1}`}
            </div>
          ))}
        </div>
        <div className={styles.eventBoxParent}>
          {dataToDisplay[selectedDate] &&
            Object.keys(dataToDisplay[selectedDate]).map((timeKey) => (
              <div className={styles.eventBox} key={timeKey}>
                <div className={styles.linesDiv}>
                  <div className={styles.smallLine1}></div>
                  <div className={styles.bigLine}>
                    <div className={styles.bigLineContent}>{timeKey}</div>
                  </div>
                  <div className={styles.smallLine}></div>
                  <div className={styles.smallLine}></div>
                </div>
                <div className={styles.eventCardItenary}>
                  {dataToDisplay[selectedDate][timeKey].map((item) => (
                    <EventCard
                      item={item}
                      key={item.id}
                      onSwipe={handleSwipe}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;

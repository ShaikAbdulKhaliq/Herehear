import { React, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import styles from "./Ticket.module.css";
import { TicketTab } from "../../../../Images/Image";
import { useGlobalInfo } from "../../../../context/globalContext";
import { useTranslation } from "react-i18next";
import Animated_Loader from "../../Animated_Loader/Animated_Loader";

const Ticket = () => {
  const navigate = useNavigate();
  const ticketRef = useRef(null);
  const { selectedeventdetails, ticketPrice, selectedSeats, bookingID, loading } = useGlobalInfo();
  const { t } = useTranslation();
  console.log(selectedeventdetails);
  let {
    My_Ticket,
    Section,
    Row,
    Seat,
    Onwards,
    Price,
    Booking_ID,
    Place,
    Download,
    navigate_homepage,
  } = t("ticket");

  console.log(selectedSeats, " selectedSeats");

  const [output, setOutput] = useState("");
  const [row, setRow] = useState("");

  const charToValue = (char) => {
    const value = char.toUpperCase().charCodeAt(0) - 64;
    return value < 10 ? `0${value}` : `${value}`;
  };

  useEffect(() => {
    if (selectedSeats.length > 0) {
      const firstChars = selectedSeats.map((item) => item[0]);
      const uniqueChars = [...new Set(firstChars)];

      if (uniqueChars.length === 1) {
        setOutput(uniqueChars[0]);
        setRow(charToValue(uniqueChars[0]));
      } else {
        setOutput(uniqueChars.join(","));
        const rowValues = uniqueChars
          .map((char) => charToValue(char))
          .join(",");
        setRow(rowValues);
      }
    }
  }, [selectedSeats]);

  const [selectedSeatsString, setSelectedSeatsString] = useState("");
  console.log(selectedSeatsString, "selectedSeatsStringselectedSeatsString");

  useEffect(() => {
    setSelectedSeatsString(selectedSeats.join(", "));
  }, [selectedSeats]);

  useEffect(() => {
    if (Object.keys(selectedeventdetails)?.length === 0) {
      navigate("/dashboard/choose_seats");
    }
  }, [selectedeventdetails, navigate]);

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + "...";
    }
    return text;
  };

  const formatDate = (dateString) => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
    return formattedDate;
  };

  const handleDownload = async () => {
    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: null,
    });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "ticket.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("image downloaded");
  };

  if (loading) {
    return (
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
        <Animated_Loader size={15}/>
      </div>
    );
  }
  
  return (
    <div className={styles.ticket_container}>
      <div className={styles.header}>
        <div
          className={styles.arrow_block}
          onClick={() => navigate("/dashboard/eventdetails")}
        >
          <img src={TicketTab.arrow} alt="arrow" />
        </div>
        <span>{My_Ticket}</span>
      </div>

      <div
        className={styles.ticket_block}
        ref={ticketRef}
        style={{
          backgroundImage: 'url("/svgs/paper.svg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className={styles.heading_text}>
          {truncateText(selectedeventdetails?.name, 11)}
        </div>
        <div className={styles.heading_text1}>
          <div className={styles.block1}>
            <div className={styles.key}>{Section}</div>
            <div className={styles.value}>{output}</div>
          </div>
          <div className={styles.block1}>
            <div className={styles.key}>{Row}</div>
            <div className={styles.value}>{row}</div>
          </div>
          <div className={styles.block1}>
            <div className={styles.key}>{Seat}</div>
            <div className={styles.seats_text}>
              <div className={styles.value}>{selectedSeats[0]},..</div>
              <div className={styles.value2}>
                <img
                  src="/svgs/seat_icon.svg"
                  alt=""
                  className={styles.seats_icon}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.empty}>
          <img src="/svgs/Line.svg" alt="" />
        </div>
        <div
          className={styles.heading_text2}
          style={{
            backgroundImage: 'url("/svgs/barcode.svg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "relative",
          }}
        ></div>
        <div className={styles.heading_text3}>
          <div className={styles.block1}>
            <div className={styles.time_text}>
              {selectedeventdetails?.startTime} {Onwards}
            </div>
            <div className={styles.date_text}>
              {formatDate(selectedeventdetails?.date)}
            </div>
          </div>
          <div className={styles.block2}>
            <div className={styles.time_text}>{Price}</div>
            <div className={styles.date_text}>{ticketPrice}</div>
          </div>
        </div>
        <div className={styles.heading_text3}>
          <div className={styles.block1}>
            <div className={styles.time_text}>{Booking_ID}</div>
            <div className={styles.date_text}>{bookingID}</div>
          </div>
          <div className={styles.block2}>
            <div className={styles.time_text}>{Place}</div>
            <div className={`${styles.date_text} ${styles.address}`}>
              {truncateText(selectedeventdetails?.address, 12)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.button_container}>
        <button onClick={handleDownload}>{Download}</button>
      </div>
      <div className={styles.homepage_txt}>
        <span onClick={() => navigate("/dashboard")}>{navigate_homepage}</span>
      </div>
    </div>
  );
};

export default Ticket;

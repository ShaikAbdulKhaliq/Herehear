import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";
import { useGlobalInfo } from "../../../../context/globalContext";
import { bookEventTickets, updateBookHistory } from "../../../../API/useApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const Payment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNickname, setCardNickname] = useState("");
  const {
    selectedeventdetails,
    selected_seats,
    bookingdetails,
    usersData,
    events,
    bookingID,
    setBookingDate,
    setBookingTime,
    setBookingID,
    adultsCount,
    childrenCount,
    seniorsCount,
  } = useGlobalInfo();

  const { t } = useTranslation();
  let {
    payment,
    addNewCardMethod,
    cardNumberPlaceholder,
    validThroughPlaceholder,
    cvvPlaceholder,
    nameOnCardPlaceholder,
    cardNicknamePlaceholder,
    saveAndNext,
    invalidCardNumberError,
    invalidExpiryDateError,
    invalidCVVError,
  } = t("card_payment");

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";

  // Parse userDetails from localStorage
  let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

  const generateBookingID = () => {
    const min = 10000000;
    const max = 99999999;
    return Math.floor(min + Math.random() * (max - min + 1));
  };

  useEffect(() => {
    if (Object.keys(selectedeventdetails).length === 0) {
      navigate("/dashboard/choose_seats");
    }

    if (!bookingID) {
      const newBookingID = generateBookingID();
      setBookingID(newBookingID);
    }
  }, [selectedeventdetails, navigate, bookingID, setBookingID]);

  const validateCardNumber = (number) => {
    const re = /^\d{16}$/;
    return re.test(number);
  };

  const validateExpiryDate = (date) => {
    const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return re.test(date);
  };

  const handleChangeCVV = (e) => {
    if (cvv.length < 3) {
      setCvv(e.target.value);
    } else {
      toast.error(invalidCVVError);
    }
  };

  const handleSubmit = () => {
    if (!validateCardNumber(cardNumber)) {
      toast.error(invalidCardNumberError);
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      toast.error(invalidExpiryDateError);
      return;
    }

    const bookingDate = new Date().toLocaleDateString();
    const bookingTime = new Date().toLocaleTimeString();
    setBookingDate(bookingDate);
    setBookingTime(bookingTime);

    let booked_seats = [
      ...(selectedeventdetails?.booked_seats || []),
      ...(selected_seats || []),
    ];

    let bookingDetails = { ...bookingdetails };

    let updatedevent = {
      ...selectedeventdetails,
      booked_seats,
      bookingDetails: [...(selectedeventdetails?.bookingDetails || []), bookingDetails],
    };

    const userIndex = usersData[lang].findIndex(
      (user) => user?.mobileNumber === userDetails?.mobileNumber
    );

    const existingUserData = usersData[lang][userIndex];

    const updatedUserData = {
      ...existingUserData,
      bookedEvents: [
        ...(existingUserData?.bookedEvents || []),
        {
          bookingID: bookingID,
          eventId: selectedeventdetails?.id,
          eventName: selectedeventdetails?.name,
          eventStartTime: selectedeventdetails?.startTime,
          eventDate: selectedeventdetails?.date,
          eventAddress: selectedeventdetails?.address,
          eventCategory: selectedeventdetails?.eventCategory,
          eventPickup: selectedeventdetails?.pickup,
          eventSeats: selected_seats,
          totalPrice: bookingdetails?.totalPrice,
          ticketCounts: {
            adults: adultsCount,
            children: childrenCount,
            senior: seniorsCount
          },
          bookingDate: bookingDate,
          bookingTime: bookingTime,
        },
      ],
    };

    if (userIndex !== -1) {
      usersData[lang][userIndex] = updatedUserData;
      updateBookHistory(usersData);
    }

    const eventIndex = events[lang].findIndex(
      (event) => event.id === updatedevent.id
    );

    if (eventIndex !== -1) {
      events[lang][eventIndex] = updatedevent;
      bookEventTickets(events);
      navigate("/dashboard/ticket");
    }
  };

  return (
    <div className={styles.payment_container}>
      <div className={styles.pay_block_1}>
        <div
          className={styles.arrow_block}
          onClick={() => navigate("/dashboard/fill_details")}
        >
          <img src={"/svgs/Arrow_Down.svg"} alt="" className={styles.image} />
        </div>
        <div>{payment}</div>
      </div>
      <div className={styles.pay_block_2}>{addNewCardMethod}</div>
      <div className={styles.card_details_block}>
        <div className={styles.CardNumber}>
          <input
            type="text"
            placeholder={cardNumberPlaceholder}
            className={styles.payment_input}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className={styles.month_cvv}>
          <div className={styles.month}>
            <input
              type="text"
              pattern="\d{2}/\d{2}"
              required
              placeholder={validThroughPlaceholder}
              className={styles.payment_input}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className={styles.cvv}>
            <input
              type="number"
              placeholder={cvvPlaceholder}
              className={styles.payment_input}
              value={cvv}
              onChange={handleChangeCVV}
              required
            />
          </div>
        </div>
        <div className={styles.CardNumber}>
          <input
            type="text"
            placeholder={nameOnCardPlaceholder}
            className={styles.payment_input}
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            required
          />
        </div>
        <div className={styles.CardNumber}>
          <input
            type="text"
            placeholder={cardNicknamePlaceholder}
            className={styles.payment_input}
            value={cardNickname}
            onChange={(e) => setCardNickname(e.target.value)}
          />
        </div>
      </div>
      <button className={styles.next_button} onClick={handleSubmit}>
        {saveAndNext}
      </button>
    </div>
  );
};

export default Payment;

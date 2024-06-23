import React, { useState, useEffect } from "react";
import styles from "./FillDetails.module.css";
import { fill_details } from "../../../../Images/Image";
import { useNavigate } from "react-router-dom";
import { useGlobalInfo } from "../../../../context/globalContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import { updateBookHistory, bookEventTickets } from "../../../../API/useApi";

const FillDetails = () => {
  const navigate = useNavigate();
  const {
    selectedSeats,
    ticketPrice,
    handleSetBookingdetails,
    selectedeventdetails,
    selected_seats,
    bookingdetails,
    usersData,
    events,
    bookingID,
    setBookingID,
    setBookingDate,
    setBookingTime,
    adultsCount,
    childrenCount,
    seniorsCount,
  } = useGlobalInfo();

  const { t } = useTranslation();
  let {
    fullname,
    e_mail,
    paymentmethod,
    timeup,
    payment,
    timeleft,
    order_text,
    edit,
    adult_ticket,
    fees_text,
    conveniencefee,
    contact_text,
    fullNamePlaceholder,
    emailPlaceholder,
    title,
    seat,
    creditDebitCards,
    addNewCard,
    payWith,
    next,
    p1,
    p2,
    p3,
    p4
  } = t("fillDetails");

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";
  let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

  const generateBookingID = () => {
    const min = 10000000;
    const max = 99999999;
    return Math.floor(min + Math.random() * (max - min + 1));
  };

  useEffect(() => {
    if (Object.keys(selectedSeats).length === 0) {
      navigate("/dashboard/choose_seats");
    }

    if (!bookingID) {
      const newBookingID = generateBookingID();
      setBookingID(newBookingID);
    }
  }, [selectedSeats, navigate, bookingID, setBookingID]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const roundedTotalPrice = Number(
    typeof ticketPrice === "number" ? ticketPrice.toFixed(2) : 0
  );

  useEffect(() => {
    
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      toast.error(timeup, {
        onClose: () => navigate("/dashboard/eventdetails"),
      });
    }
  }, [timeLeft, navigate]);

  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const paymentMethods = [
    { value: "paypal", logo: "/svgs/filldetails_paypal.svg", name: p1 },
    { value: "pay", logo: "/svgs/filldetails_pay.svg", name: p2 },
    { value: "venmo", logo: "/svgs/filldetails_venmo.svg", name: p3 },
    { value: "Pay", logo: "/svgs/filldetails_gpay.svg", name: p4 },
  ];
  const validateFullName = (name) => {
    return name.length > 0;
  };
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const resetFormAndReload = () => {
      setFullName("");
      setEmail("");
      setPaymentMethod("");
      window.location.reload();
    };
    if (!validateFullName(fullName)) {
      toast.error(fullname, {
        onClose: resetFormAndReload,
      });
      return;
    }
    if (!validateEmail(email)) {
      toast.error(e_mail, {
        onClose: resetFormAndReload,
      });
      return;
    }
    if (!paymentMethod) {
      toast.error(paymentmethod, {
        onClose: resetFormAndReload,
      });
      return;
    }

    const formData = {
      fullName,
      email,
      paymentMethod,
      selectedSeats,
      totalPrice: ticketPrice,
      convenienceFee,
    };
    handleSetBookingdetails(formData);

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

  const calculateConvenienceFee = (totalPrice) => {
    const feeRate = 0.05;
    const fee = totalPrice * feeRate;
    return Math.round(fee * 100) / 100;
  };
  const convenienceFee = calculateConvenienceFee(ticketPrice);
  return (
    <form className={styles.fill_main_containter} onSubmit={handleSubmit}>
      <div className={styles.topBar}>
        <div className={styles.topBar_left}>
          <div
            className={styles.arrow_block}
            onClick={() => navigate("/dashboard/select_seats")}
          >
            <img
              src={"/svgs/Arrow_Down.svg"}
              alt="arrow"
              className={styles.image}
            />
          </div>
          <span className={styles.payment_txt}>{payment}</span>
        </div>
        <div className={styles.topBar_right}>
          <span className={styles.time_left}>
            {formatTimeLeft(timeLeft)} {timeleft}
          </span>
          &nbsp;&nbsp;
          <div className={styles.cross_img}>
            <img
              src={"/svgs/cross.svg"}
              alt="cross"
              onClick={() => navigate("/dashboard/eventdetails")}
            />
          </div>
        </div>
      </div>
      <div className={styles.middle_container}>
        <div className={styles.order_details_block}>
          <span className={styles.order_details_text}>{order_text}</span>
          <span className={styles.edit_text} onClick={() => navigate("/dashboard/select_seats")}>{edit}</span>
        </div>
        <div className={styles.main_form}>
          <div className={styles.form_block_1}>
            <div className={styles.ticket_block}>
              <span className={styles.adult_ticket_text}>{adult_ticket}</span>
              <span className={styles.total_price}>${roundedTotalPrice}</span>
            </div>
            <div className={styles.seat_no}>
              {seat} {selectedSeats.join(", ")}
            </div>
          </div>
          <div className={styles.form_block_2}>
            <div className={styles.fees_text}>{fees_text}</div>
            <div className={styles.ticket_block}>
              <span className={styles.adult_ticket_text}>{conveniencefee}</span>
              <span className={styles.total_price}>${convenienceFee}</span>
            </div>
          </div>
          <div className={styles.form_block_3}>
            <div className={styles.contact_info_text}>{contact_text}</div>
            <input
              type="text"
              placeholder={fullNamePlaceholder}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.payment_methods}>
            <div className={styles.card_block}>
              <div className={styles.title_div}>{title}</div>
              <div
                className={styles.add_card_block}
                onClick={() => navigate("/dashboard/fill_payment")}
              >
                <p>{creditDebitCards}</p>
                <div className={styles.plus_block}>
                  <img src={fill_details.addsign} alt="add" />
                  <span>{addNewCard}</span>
                </div>
              </div>
            </div>
            <div className={styles.payment}>
              <span className={styles.pay_with_text}>{payWith}</span>
              {paymentMethods.map((method, index) => (
                <label key={index} className={styles.radio_label}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={styles.radio_input}
                  />
                  <img
                    src={method.logo}
                    alt={method.name}
                    className={styles.radio_img}
                  />
                  &nbsp;&nbsp;
                  {method.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btn_container}>
        <button className={styles.next_button}>{next}</button>
      </div>
    </form>
  );
};
export default FillDetails;

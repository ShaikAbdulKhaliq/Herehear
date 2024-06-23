import React, { useState, useEffect, useMemo } from "react";
import styles from "./SeatCategory.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import { useGlobalInfo } from "../../../../context/globalContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const SeatCategory = () => {
  const navigate = useNavigate();
  const {
    totalSeatCount,
    selectedeventdetails,
    setTicketPrice,
    setAdultsCount,
    setChildrenCount,
    setSeniorsCount
  } = useGlobalInfo();
  const { t } = useTranslation();

  const {
    select_ticket_type_title,
    adult,
    child,
    age_child,
    senior,
    age_senior,
    description,
    next_button,
    error,
  } = t("select_ticket_type");

  useEffect(() => {
    if (!Object.keys(selectedeventdetails).length) {
      navigate("/dashboard");
    }
  }, [selectedeventdetails, navigate]);

  const [counts, setCounts] = useState({ adult: 0, child: 0, senior: 0 });
  const calculatePrice = (type, count) =>
    selectedeventdetails?.ticketPrice?.[type] * count || 0;

  const prices = useMemo(
    () => ({
      adult: calculatePrice("adults", counts.adult),
      child: calculatePrice("children", counts.child),
      senior: calculatePrice("senior", counts.senior),
      getTotal: function () {
        return this.adult + this.child + this.senior;
      },
    }),
    [counts, selectedeventdetails]
  );

  useEffect(() => {
    setTicketPrice(prices.getTotal());
  }, [prices, setTicketPrice]);

  const updateCount = (type, value) => {
    setCounts((prevCounts) => {
      const newCount = prevCounts[type] + value;
      if (
        newCount >= 0 &&
        totalSeatCount >=
          newCount +
            prevCounts.adult +
            prevCounts.child +
            prevCounts.senior -
            prevCounts[type]
      ) {
        return { ...prevCounts, [type]: newCount };
      }
      return prevCounts;
    });
  };

  const handleSubmit = () => {
    const totalSelectedSeats = counts.adult + counts.child + counts.senior;
    if (totalSeatCount !== totalSelectedSeats) {
      toast.error(error);
      return;
    }
    setAdultsCount(counts.adult);
    setChildrenCount(counts.child);
    setSeniorsCount(counts.senior);
    navigate("/dashboard/select_seats");
  };

  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div className={styles.SeatCategory_container}>
      <div className={styles.searchbar}>
        <Navbar />
      </div>
      <div className={styles.text1}>{select_ticket_type_title}</div>
      <div className={styles.category}>
        {[
          {
            label: truncateText(adult, 7),
            price: prices.adult,
            count: counts.adult,
            age: null,
            type: "adult",
          },
          {
            label: truncateText(child, 8),
            price: prices.child,
            count: counts.child,
            age: age_child,
            type: "child",
          },
          {
            label: truncateText(senior, 7),
            price: prices.senior,
            count: counts.senior,
            age: age_senior,
            type: "senior",
          },
        ].map(({ label, price, count, age, type }, index) => (
          <div className={styles.cat_block} key={index}>
            <div className={styles.category_1}>
              <div className={styles.category_text}>{label}</div>
              <div className={styles.category_price}>${price}</div>
              <div className={styles.category_count}>
                <div
                  className={styles.sub}
                  onClick={() => updateCount(type, -1)}
                >
                  <img
                    src="/svgs/sub.svg"
                    alt="subimage"
                    className={styles.img_icon}
                  />
                </div>
                <div>{count}</div>
                <div
                  className={styles.add}
                  onClick={() => updateCount(type, 1)}
                >
                  <img
                    src="/svgs/add.svg"
                    alt="subimage"
                    className={styles.img_icon}
                  />
                </div>
              </div>
            </div>
            {age && <div className={styles.span_block}>{age}</div>}
          </div>
        ))}
      </div>
      <div className={styles.Des}>{description}</div>
      <button className={styles.next_button} onClick={handleSubmit}>
        {next_button}
      </button>
    </div>
  );
};

export default SeatCategory;

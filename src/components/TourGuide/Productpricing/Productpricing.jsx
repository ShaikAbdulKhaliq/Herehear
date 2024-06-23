import React, { useState } from "react";
import styles from "./Productpricing.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Productpricing() {
  const [selectedActivityProduct, setSelectedActivityProduct] = useState("");
  const [pricePerPax, setPricePerPax] = useState("");
  const [minAdults, setMinAdults] = useState("");
  const [maxAdults, setMaxAdults] = useState("");
  const [passengersLimit, setPassengersLimit] = useState("");
  const [allowBooking, setAllowBooking] = useState("");
  const [allowChildren, setAllowChildren] = useState("");
  const navigate = useNavigate()
  const [isTypeOfActivityClicked, setIsTypeOfActivityClicked] = useState(false);
  const [isLimitOfPassengersClicked, setIsLimitOfPassengersClicked] =
    useState(false);
  const [isAllowBookingClicked, setIsAllowBookingClicked] = useState(false);
  const [isAllowChildrenClicked, setIsAllowChildrenClicked] = useState(false);

  const handleActivityClick = (activity) => {
    setSelectedActivityProduct(activity);
    setIsTypeOfActivityClicked(false);
  };

  const handlePassengersLimit = (limit) => {
    setPassengersLimit(limit);
    setIsLimitOfPassengersClicked(false);
  };

  const handleAllowBooking = (option) => {
    setAllowBooking(option);
    setIsAllowBookingClicked(false);
  };

  const handleAllowChildren = (option) => {
    setAllowChildren(option);
    setIsAllowChildrenClicked(false);
  };

  function handleSave() {
    if (selectedActivityProduct.length === 0) {
      toast.error("Select Activity", { autoClose: 1500 });
      return false;
    } else if (pricePerPax.length == 0) {
      toast.error("Enter pricePerPax", { autoClose: 1500 });
      return false;
    } else if (minAdults.length===0) {
      toast.error("Enter min Adults req", { autoClose: 1500 });
      return false;
    } else if (maxAdults.length === 0) {
      toast.error("Enter max Adults req", { autoClose: 1500 });
      return false;
    }else if (passengersLimit.length === 0) {
      toast.error("Select passengers Limit", { autoClose: 1500 });
      return false;
    } else if (allowBooking.length === 0) {
      toast.error("Select booking", { autoClose: 1500 });
      return false;
    } else if (allowChildren.length === 0) {
      toast.error("select children option", { autoClose: 1500 });
      return false;
    }  else {
      return true;
    }
  }

  function handleSubmit() {
    if (handleSave()) {
      console.log({
        selectedActivityProduct,
        pricePerPax,
        minAdults,
        maxAdults,
        passengersLimit,
        allowBooking,
        allowChildren
      });
      navigate("/tour-guide/meeting-point");
    }
  }



  return (
    <>
      <div className={styles.productPricingDiv}>
        <div className={styles.guideFormTitle}>Product Pricing</div>
        <div className={styles.productPricingData}>
          <div
            onClick={() => setIsTypeOfActivityClicked(!isTypeOfActivityClicked)}
            className={`${styles.typeOfAct} ${
              selectedActivityProduct === "Free" ? styles.freeActivity : ""
            }`}
          >
            {selectedActivityProduct.length
              ? selectedActivityProduct
              : "Type of activity"}
          </div>
          <div
            className={`${styles.activityOptionsProduct} ${
              isTypeOfActivityClicked ? styles.visible : ""
            }`}
          >
            <div
              className={styles.activity}
              onClick={() => handleActivityClick("Paid")}
            >
              Paid
            </div>
            <div
              className={styles.activity}
              onClick={() => handleActivityClick("Free")}
            >
              Free
            </div>
          </div>
          <input
            placeholder="Price p/ pax over limit | $"
            className={styles.typeOfAct}
            value={pricePerPax}
            onChange={(e) => setPricePerPax(e.target.value)}
          />
          <div className={styles.adultDetailDiv}>
            Adults required during booking
          </div>
          <div className={styles.rangeDiv}>
            <div className={styles.rangeMinDiv}>
              <input
                placeholder="Min"
                className={styles.rangeMinInput}
                value={minAdults}
                onChange={(e) => setMinAdults(e.target.value)}
              />
              <div className={styles.upDownIcons}>
                <div className={styles.upIcon}>
                  <img src={"/svgs/UpArrow.svg"} alt="Up Arrow" />
                </div>
                <div className={styles.downIcon}>
                  <img src={"/svgs/downArrow.svg"} alt="Down Arrow" />
                </div>
              </div>
            </div>
            <div className={styles.rangeMaxDiv}>
              <input
                placeholder="Max"
                className={styles.rangeMaxInput}
                value={maxAdults}
                onChange={(e) => setMaxAdults(e.target.value)}
              />
              <div className={styles.upDownIcons}>
                <div className={styles.upIcon}>
                  <img src={"/svgs/UpArrow.svg"} alt="Up Arrow" />
                </div>
                <div className={styles.downIcon}>
                  <img src={"/svgs/downArrow.svg"} alt="Down Arrow" />
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() =>
              setIsLimitOfPassengersClicked(!isLimitOfPassengersClicked)
            }
            className={`${styles.typeOfAct} ${
              passengersLimit ? styles.freeActivity : ""
            }`}
          >
            {passengersLimit
              ? passengersLimit
              : "Limit of passengers for free booking"}
          </div>
          <div
            className={`${styles.activityOptionsProduct} ${
              isLimitOfPassengersClicked ? styles.visible : ""
            }`}
          >
            <div
              className={styles.activity}
              onClick={() => handlePassengersLimit("1")}
            >
              1
            </div>
            <div
              className={styles.activity}
              onClick={() => handlePassengersLimit("2")}
            >
              2
            </div>
            <div
              className={styles.activity}
              onClick={() => handlePassengersLimit("3")}
            >
              3
            </div>
          </div>
          <div
            onClick={() => setIsAllowBookingClicked(!isAllowBookingClicked)}
            className={styles.typeOfAct}
          >
            {allowBooking.length
              ? allowBooking
              : "Allow to book and join during the Tour"}
          </div>
          <div
            className={`${styles.activityOptionsProduct} ${
              isAllowBookingClicked ? styles.visible : ""
            }`}
          >
            <div
              className={styles.activity}
              onClick={() => handleAllowBooking("Yes")}
            >
              Yes
            </div>
            <div
              className={styles.activity}
              onClick={() => handleAllowBooking("No")}
            >
              No
            </div>
          </div>
          <div
            onClick={() => setIsAllowChildrenClicked(!isAllowChildrenClicked)}
            className={`${styles.typeOfAct} ${
              allowChildren ? styles.freeActivity : ""
            }`}
          >
            {allowChildren.length
              ? allowChildren
              : "Allowing children in the booking"}
          </div>
          <div
            className={`${styles.activityOptionsProduct} ${
              isAllowChildrenClicked ? styles.visible : ""
            }`}
          >
            <div
              className={styles.activity}
              onClick={() => handleAllowChildren("One")}
            >
              One
            </div>
            <div
              className={styles.activity}
              onClick={() => handleAllowChildren("Two")}
            >
              Two
            </div>
            <div
              className={styles.activity}
              onClick={() => handleAllowChildren("Three")}
            >
              Three
            </div>
          </div>
        </div>
      </div>
      <div className={styles.titleSubmitDiv} onClick={handleSubmit}>
        Save & Next
      </div>
    </>
  );
}

export default Productpricing;

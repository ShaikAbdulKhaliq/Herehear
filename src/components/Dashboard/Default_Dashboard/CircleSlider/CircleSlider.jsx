import React, { useState, useEffect } from "react";
import "./CircleSlider.css";
import Heart from "/svgs/favourite_dashboard.svg";
import Ticket from "/svgs/Ticket.svg";
import Calander from "/svgs/Calander.svg";
import MenuIcon from "/svgs/MenuIcon.svg";
import TicketWhite from "/svgs/TicketWhite.svg";
import CalanderWhite from "/svgs/CalanderWhite.svg";
import HeartWhite from "/svgs/HeartWhite.svg";
import { useNavigate } from "react-router-dom";

const CircleSlider = () => {
  const navigate = useNavigate();

  const [showBig, setShowBig] = useState(false);
  const [angle, setAngle] = useState(-25);
  const [image1, setImage1] = useState(HeartWhite);
  const [image2, setImage2] = useState(Ticket);
  const [image3, setImage3] = useState(Calander);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("circleSliderState"));
    if (savedState) {
      setAngle(savedState.angle);
      setImage1(savedState.image1);
      setImage2(savedState.image2);
      setImage3(savedState.image3);
    }
  }, []);

  const saveStateAndNavigate = (
    newAngle,
    newImage1,
    newImage2,
    newImage3,
    path
  ) => {
    setAngle(newAngle);
    setImage1(newImage1);
    setImage2(newImage2);
    setImage3(newImage3);
    localStorage.setItem(
      "circleSliderState",
      JSON.stringify({
        angle: newAngle,
        image1: newImage1,
        image2: newImage2,
        image3: newImage3,
      })
    );
    setTimeout(() => {
      navigate(path);
    }, 1200);
  };

  const handleClickOption1 = () => {
    saveStateAndNavigate(
      -25,
      HeartWhite,
      Ticket,
      Calander,
      "/dashboard/favourites"
    );
  };

  const handleClickOption2 = () => {
    saveStateAndNavigate(
      20,
      Heart,
      TicketWhite,
      Calander,
      "/dashboard/confirmed_tickets"
    );
  };

  const handleClickOption3 = () => {
    saveStateAndNavigate(
      70,
      Heart,
      Ticket,
      CalanderWhite,
      "/dashboard/alleventsv1"
    );
  };

  return (
    <div className="circleSliderMain">
      <div
        onClick={() => {
          setShowBig(!showBig);
        }}
        className={"smallCircle" + (!showBig ? " smallCircleActive" : "")}
      >
        <img src={MenuIcon} />
      </div>
      <div
        onClick={() => {
          setTimeout(() => {
            setShowBig(!showBig);
          }, 1200);
        }}
        style={{
          transform: !showBig ? "translate(-80%, 80%)" : "translate(-37%, 5%)",
        }}
        className="bigCircle"
      >
        <div
          style={{ transform: `rotate(${angle}deg)` }}
          className="pie-chart"
        ></div>
        <div onClick={handleClickOption1} className="Option1Clider">
          <img src={image1} />
        </div>
        <div onClick={handleClickOption2} className="Option2Clider">
          <img src={image2} />
        </div>
        <div onClick={handleClickOption3} className="Option3Clider">
          <img src={image3} />
        </div>
      </div>
    </div>
  );
};

export default CircleSlider;

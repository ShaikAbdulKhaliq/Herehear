import React, { useEffect, useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import CarouselItem from "./CarouselItem";
import { useGlobalInfo } from "../../../../context/globalContext";
import "./Carousel.css";
import Animated_Loader from "../../Animated_Loader/Animated_Loader";

const Carousel = () => {
  const { events, setTotalEvents, loading } = useGlobalInfo();
  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";
  useEffect(() => {
    const carouselElement = document.querySelector(".carousel");
    let carouselInstance = null;
    if (events[lang]?.length > 0) {
      carouselInstance = M.Carousel.init(carouselElement, {});
      const autoplay = () => {
        carouselInstance.next();
        setTimeout(autoplay, 1500);
      };
      // autoplay();
    }
    return () => {
      if (carouselInstance) {
        carouselInstance.destroy();
      }
    };
  }, [events, lang]);
  useEffect(() => {
    setTotalEvents(events[lang]?.length);
  }, [events, lang, setTotalEvents]);

  if (loading) {
    return (
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
        <Animated_Loader size={15}/>
      </div>
    );
  }

  return (
    <div className="carousel">
      {events[lang]?.map((item, index) => (
        <CarouselItem key={index} {...item} />
      ))}
    </div>
  );
};
export default Carousel;

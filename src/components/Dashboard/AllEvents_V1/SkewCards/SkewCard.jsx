import React, { useEffect, useState } from "react";
import styles from "./SkewCard.module.css";
import AllEventsV2_Card from "../AllEventsV2_Card/AllEventsV2_Card";
import { useSwipeable } from "react-swipeable";
const SkewCard = ({
  eventsData,
  setShowSkewCard,
  setShowAllEventsCard,
  searchTerm, // Receive searchTerm prop
}) => {
  const [cards, setCards] = useState(eventsData);
  const handlers = useSwipeable({
    onSwipedRight: () => {
      setShowSkewCard(false);
      setShowAllEventsCard(true);
    },
    onSwipedUp: () => {
      animateSwap("up");
    },
    onSwipedDown: () => {
      animateSwap("down");
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  const animateSwap = (direction) => {
    if (cards.length < 2) return;
    const updatedCards = [...cards];
    if (direction === "up") {
      const firstCard = updatedCards.shift();
      updatedCards.push(firstCard);
    } else if (direction === "down") {
      const lastCard = updatedCards.pop();
      updatedCards.unshift(lastCard);
    }
    setCards(updatedCards);
  };
  useEffect(() => {
    const filteredData = eventsData.filter((event) =>
      event.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setCards(filteredData);
  }, [eventsData, searchTerm]);
  return (
    <div className={styles.stack} {...handlers}>
      {cards.map((event, index) => {
        return (
          <AllEventsV2_Card key={index} event={event} className={styles.card} />
        );
      })}
    </div>
  );
};
export default SkewCard;
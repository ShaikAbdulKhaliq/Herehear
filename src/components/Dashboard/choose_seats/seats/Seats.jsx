import React, { useState, useEffect } from "react";
import { useGlobalInfo } from "../../../../context/globalContext";
import "./Seats.css";
const Seats = ({ onSelectSeatsCount }) => {
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [bookedseats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const {
    updateSelectedSeats,
    numberofseats,
    selectedeventdetails,
  } = useGlobalInfo();

  const generateGrid = () => {
    const grid = [];
    const rowNames = generateRowNames();
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const columnName = j + 1;
        const boxValue = `${rowNames[i]}${columnName}`;
        const isSelected = selectedSeats.includes(boxValue);
        row.push(
          <div
            className={`box ${bookedseats.includes(boxValue) ? "booked" : ""} ${isSelected && !bookedseats.includes(boxValue) ? "selected" : ""
              }`}
            key={`${rowNames[i]}-${columnName}`}
            onClick={() => handleClick(boxValue)}
          >
            {boxValue}
          </div>
        );
      }
      grid.push(
        <div className="row" key={rowNames[i]}>
          {row}
        </div>
      );
    }
    return grid;
  };
  const generateRowNames = () => {
    const rowNames = [];
    for (let i = 0; i < rows; i++) {
      let name = "";
      let n = i;
      do {
        name = String.fromCharCode(65 + (n % 26)) + name;
        n = Math.floor(n / 26) - 1;
      } while (n >= 0);
      rowNames.push(name);
    }
    return rowNames;
  };
  const handleClick = (value) => {
    if (selectedSeats.includes(value)) {
      setSelectedSeats((prevSelectedSeats) => {
        const seatIndex = prevSelectedSeats.indexOf(value);
        const updatedSeats = [...prevSelectedSeats];
        updatedSeats.splice(seatIndex, 1);
        return updatedSeats;
      });
    } else if (
      selectedSeats.length < numberofseats &&
      !bookedseats.includes(value)
    ) {
      setSelectedSeats((prevSelectedSeats) => {
        return [...prevSelectedSeats, value];
      });
    }
  };
  useEffect(() => {
    setBookedSeats(selectedeventdetails.booked_seats);
  }, [selectedeventdetails]);
  useEffect(() => {
    updateSelectedSeats(selectedSeats);
    onSelectSeatsCount(selectedSeats.length, selectedSeats);
  }, [selectedSeats, selectedSeats.length]);
  return (
    <div>
      <div className="main_con">{generateGrid()}</div>
    </div>
  );
};
export default Seats;

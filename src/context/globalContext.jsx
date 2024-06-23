import React, { useContext, useState, useEffect } from "react";
import { fetchRadioStations } from "../API/ApiCall";
import { getUsersData, fetchEventCategories, fetchEvents } from "../API/useApi";

const GlobalContext = React.createContext();

export function useGlobalInfo() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const [state, setState] = useState("hearhere app");
  const [userMobile, setUserMobile] = useState("");
  const [userDetails, setUserDetails] = useState(() => {
    const savedDetails = localStorage.getItem("userDetails");
    return savedDetails
      ? JSON.parse(savedDetails)
      : {
          fullname: "",
          city: "",
          duration: "",
          purpose: "",
          numberOfGuests: "",
        };
  });
  const [categories, setCategories] = useState([]);
  const [showScroller, setShowScroller] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [previousData, setPreviousData] = useState("");
  const [nextData, setNextData] = useState(null);
  const [selectedTime, setSelectedTime] = useState({
    count: "",
    time: "Hours",
  });
  const [stage, setStage] = useState("Stage");
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState("Hours");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [updatedTotalPrice, setUpdatedTotalPrice] = useState(0);
  const [selectedeventdetails, setSelectedeventdetails] = useState({});
  const [numberofseats, setNumberofseats] = useState({});
  const [bookingdetails, setBookingdetails] = useState({});
  const [selected_seats, setSelected_seats] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [totalSeatCount, setTotalSeatCount] = useState(0);
  const [user, setUser] = useState(null);
  const [ticketPrice, setTicketPrice] = useState("");
  const [radioData, setRadioData] = useState([]); //whole radios stations
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allEventCategories, setAllEventCategories] = useState([]); //eventcategories data
  const [events, setEvents] = useState([]); //events data
  const [selectedCategory, setSelectedCategory] = useState(useState("All"));
  const [selectedAgeLimit, setSelectedAgeLimit] = useState("");
  const [usersData, setUsersData] = useState([]); //users data
  const [bookingID, setBookingID] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [seniorsCount, setSeniorsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);//filtered events
  const [output, setOutput] = useState("");

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSection = (section) => {
    setOutput(section);
  };
  function handleSetSelected_seats(seats) {
    setSelected_seats(seats);
  }

  function handleSetBookingdetails(details) {
    setBookingdetails(details);
  }

  function handleSetNumberofseats(total) {
    setNumberofseats(total);
  }

  function changeState(new_state) {
    setState(new_state);
  }

  function handleSelectedEventDetails(event) {
    setSelectedeventdetails(event);
  }

  useEffect(() => {
    setLoading(true);
    fetchUsersData();
    fetchRadioData();
    fetchEventCategoriesData();
    fetchEventData();
  }, []);

  const fetchUsersData = async () => {
    const data = await getUsersData();
    setUsersData(data);
    setLoading(false);
  };

  const fetchEventCategoriesData = async () => {
    const data = await fetchEventCategories();
    setAllEventCategories(data);
    setLoading(false);
  };

  const fetchRadioData = async () => {
    const data = await fetchRadioStations();
    setRadioData(data);
    setLoading(false);
  };

  const fetchEventData = async () => {
    const data = await fetchEvents();
    setEvents(data);
    setLoading(false);
  };

  const handleClick = (index) => {
    //const data = radioData[index];
    setShowPlayer(true);
    setIsPlaying(true);
    setSelectedData(index);
    setSelectedIndex(index);
    console.log(index, "selectedIndexselectedIndex");
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        changeState,
        userMobile,
        updateMobileNumber: (new_MobileNumber) => {
          setUserMobile(new_MobileNumber);
        },
        userDetails,
        changeUserDetails: setUserDetails,
        categories,
        changeCategories: (new_cat) => {
          setCategories(new_cat);
        },
        showScroller,
        toggleScroller: () => {
          setShowScroller((prevShowScroller) => !prevShowScroller);
        },
        currentData,
        changeCurrentData: (curr) => {
          setCurrentData(curr);
        },
        previousData,
        changePreviousData: (prev) => {
          setPreviousData(prev);
        },
        nextData,
        changeNextData: (next) => {
          setNextData(next);
        },
        stage,
        changeStage: (new_stage) => {
          setStage(new_stage);
        },
        selectedNumber,
        changeSelectedNumber: (new_no) => {
          setSelectedNumber(new_no);
        },
        selectedLabel,
        changeSelectedLabel: (new_label) => {
          setSelectedLabel(new_label);
        },
        selectedTime,
        updateSelectedTime: (newSelectedtime) => {
          setSelectedTime((oldval) => {
            return { ...oldval, ...newSelectedtime };
          });
        },
        selectedSeats,
        updateSelectedSeats: (newSelectedSeats) => {
          setSelectedSeats(newSelectedSeats);
        },
        updatedTotalPrice,
        updateTotalPrice: (newTotalPrice) => {
          setUpdatedTotalPrice(newTotalPrice);
        },
        selectedData,
        updateSelectedData: (selectedData) => {
          setSelectedData(selectedData);
        },
        totalSeatCount,
        setTotalSeatCount,
        selectedeventdetails,
        handleSelectedEventDetails,
        numberofseats,
        handleSetNumberofseats,
        bookingdetails,
        handleSetBookingdetails,
        selected_seats,
        handleSetSelected_seats,
        totalEvents,
        setTotalEvents,
        favorites,
        setFavorites,
        setUser,
        ticketPrice,
        setTicketPrice,
        radioData,
        setRadioData,
        showPlayer,
        setShowPlayer,
        selectedData,
        setSelectedData,
        selectedIndex,
        setSelectedIndex,
        isPlaying,
        setIsPlaying,
        handlePlayPause,
        handleClick,
        fetchRadioData,
        allEventCategories,
        setAllEventCategories,
        events,
        selectedCategory,
        selectedAgeLimit,
        usersData,
        bookingID,
        setBookingID,
        bookingDate,
        setBookingDate,
        bookingTime,
        setBookingTime,
        adultsCount,
        setAdultsCount,
        childrenCount,
        setChildrenCount,
        seniorsCount,
        setSeniorsCount,
        loading,
        output,
        handleSection,
        isReturningUser,
        setIsReturningUser,
        filteredEvents,
        setFilteredEvents
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchField.module.css";

const SearchField = ({ placeholder, onSearch, showSkewCard }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
    onSearch(value);
  };

  const handleArrowClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.SearchField_Container}>
      {showSkewCard ? (
        <img
          src="/svgs/LOGO2.png"
          alt=""
          className={styles.arrow_block1}
          onClick={handleArrowClick}
        />
      ) : (
        <div className={styles.arrow_block} onClick={handleArrowClick}>
          <img src="/svgs/Arrow_Down.svg" alt="" className={styles.arrow} />
        </div>
      )}
      <div className={styles.input_search}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
        />
        <div className={styles.search_img}>
          <img src={"/svgs/Search.svg"} alt="" className={styles.img} />
        </div>
      </div>
    </div>
  );
};

export default SearchField;

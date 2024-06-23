import React, { useState } from "react";
import styles from "./Search.module.css";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
    if (value === "") {
      onSearch("");
    }
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.logo_img}>
        <img src={"/svgs/logo.svg"} alt="" className={styles.img} />
      </div>
      <div className={styles.input_search}>
        <input
          type="text"
          placeholder="Have a show in mind?"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className={styles.search_img}>
          <img src={"/svgs/Search.svg"} alt="" className={styles.img} />
        </div>
      </div>
    </div>
  );
};

export default Search;

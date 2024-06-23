import React, { useState, useEffect } from "react";
import styles from "./Radio_List.module.css";
import SearchField from "../EventDetails/SearchOption/SearchField";
import Filter from "./Filter";
import Radio from "../Default_Dashboard/Radio/Radio.jsx";
import { Radio_List_Tab } from "../../../Images/Image.js";
import { useGlobalInfo } from "../../../context/globalContext.jsx";
import Animation from "./animation/Animation.jsx";

const Radio_List = () => {
  const {
    radioData,
    showPlayer,
    setSelectedData,
    handleClick,
    selectedIndex,
    isPlaying,
  } = useGlobalInfo();

  console.log(setSelectedData, "setSelectedDatasetSelectedDatasetSelectedData");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const context = useGlobalInfo();

  // useEffect(() => {
  //   const tagsData = radioData.map((res) => res.tags);
  //   const tags = tagsData
  //     .filter((str) => str.trim() !== "")
  //     .flatMap((str) => str.split(","));
  //   setTags(tags);
  // }, [radioData]);

  useEffect(() => {
    const tagsData = radioData.map((res) => res.tags);
    const uniqueTags = new Set(
      tagsData
        .filter((str) => str.trim() !== "")
        .flatMap((str) => str.split(","))
        .map((tag) => tag.trim().toLowerCase())
    );
    setTags([...uniqueTags]);
  }, [radioData]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    context.changeCurrentData(filteredRadioData[0]);
  }, []);

  const filteredRadioData = radioData.filter((station) => {
    const name = station.name.toLowerCase();
    const tags = station.tags.toLowerCase();
    const categoryMatch =
      selectedCategory === "All" ||
      tags.includes(selectedCategory.toLowerCase());
    const queryMatch =
      searchQuery === "" || name.includes(searchQuery.toLowerCase());
    return categoryMatch && queryMatch;
  });

  useEffect(() => {
    setSelectedData(filteredRadioData);
  }, [radioData]);
  console.log(filteredRadioData, "filteredRadioData");
  return (
    <div className={styles.radio_list_container}>
      <div className={styles.searchbar}>
        <SearchField
          placeholder={"Have a radio station in mind?"}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.filter_scroll_category}>
        {tags.length > 0 && (
          <Filter onSelectCategory={handleCategorySelect} tags={tags} />
        )}
      </div>
      <div className={styles.radio_container}>
        {filteredRadioData.map((radio, index) => (
          <div
            className={styles.radio_block}
            key={radio.id}
            onClick={() => handleClick(radio)}
          >
            <div className={styles.radio_left}>
              <div className={styles.img_block}>
                <img
                  src={
                    radio.favicon ? radio.favicon : "/svgs/LOGO2.png"
                  }
                  alt={radio?.name}
                />
              </div>
              <div className={styles.radio_details}>
                <span className={styles.radio_name}>{radio?.name}</span>
                <span className={styles.radio_station}>{radio?.name}</span>
              </div>
            </div>
            <div className={styles.radio_right}>
              {selectedIndex === index ? (
                <Animation />
              ) : (
                <img src={Radio_List_Tab.equilizer} alt="equilizer" />
              )}
            </div>
            {radio.showBorder && <div className={styles.border}></div>}
          </div>
        ))}
      </div>
      {showPlayer && (
        <div className={styles.footer_radio_block}>
          <Radio />
        </div>
      )}
    </div>
  );
};

export default Radio_List;

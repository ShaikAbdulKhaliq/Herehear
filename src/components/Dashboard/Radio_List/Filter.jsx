import React, { useState } from "react";
import styles from "../AllEvents_V1/Category/Category.module.css";

const Filter = ({ onSelectCategory, tags }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...tags];

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };
  
  return (
    <div className={styles.Category_container}>
      {categories.map((category, index) => (
        <div
          key={index}
          className={category === activeCategory ? styles.activeContainer : styles.container}
          onClick={() => handleSelectCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Filter;

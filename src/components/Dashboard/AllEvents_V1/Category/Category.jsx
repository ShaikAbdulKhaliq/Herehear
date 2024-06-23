import React from "react";
import styles from "./Category.module.css";
import { useTranslation } from "react-i18next";

const Category = ({ eventsData, onCategoryClick, selectedCategory }) => {
  const { t } = useTranslation();
  const { age_categories } = t("alleventstab");
  const categories = [
    "All",
    "18+ only",
    "Kids/Family-Friendly",
    "21+ only",
    "60+ only",
    "Environment Friendly",
  ];
  return (
    <div className={styles.Category_container}>
      {age_categories.map((category, index) => (
        <div
          key={index}
          className={`${styles.container} ${
            selectedCategory === categories[index]
              ? styles.selected_category
              : ""
          } ${
            selectedCategory === categories[index]
              ? styles.selected_background
              : ""
          }`}
          onClick={() => onCategoryClick(categories[index])}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Category;

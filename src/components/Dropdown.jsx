import styles from "../styles/components/Dropdown.module.css";
import { ArrowDown2 } from "iconsax-react";
import React from "react";

export default function Dropdown({
  title,
  id,
  setDropDown,
  setActiveSubCategory,
}) {
  return (
    <div
      className={`${styles.dropdown} hidden-on-small-screen`}
      onClick={() => {
        setDropDown((prev) => !prev);
        setActiveSubCategory(id);
      }}
    >
      <div className={styles["dropdown-btn"]}>
        {title}
        <ArrowDown2
          size="15"
          // color="grey"
          variant="Outline"
        />
      </div>
    </div>
  );
}

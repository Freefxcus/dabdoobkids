import styles from "../styles/components/Dropdown.module.css";
import { ArrowDown2 } from "iconsax-react";
import React from "react";

export default function Dropdown({
  title,
  items,
  dropDown,
  id,
  setDropDown,
  setDropDownType,
}) {

  return (
    <div
      className={`${styles.dropdown} hidden-on-small-screen`}
      onMouseEnter={() => {
        setDropDown(true);
        setDropDownType(id);
      }}
      onMouseLeave={() => {
        setDropDown(false);
      }}
    >
      <div className={styles["dropdown-btn"]}>
        {title}
        <ArrowDown2
          onClick={() => {}}
          size="15"
          // color="grey"
          variant="Outline"
        />
      </div>
    </div>
  );
}

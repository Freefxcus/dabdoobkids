import React from "react";
import styles from "../styles/components/Star.module.css";
import star1 from "../images/star1.svg";
import star2 from "../images/star2.svg";
import CountdownTimer from "../components/CountdownTimer";

export default function Star({ type,value }) {
  return (
    <>
      <img
        src={type === "a" ? star1 : star2}
        className={type === "a" ? styles.starA : styles.starB}
      />
      <div
        className={
          type === "a" ? styles["star-contentA"] : styles["star-contentB"]
        }
      >
        <div>{value}%</div>
        <div>Off</div>
      </div>
    </>
  );
}

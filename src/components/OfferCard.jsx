import React from "react";
import styles from "../styles/components/OfferCard.module.css";

export default function OfferCard({ item }) {
  return (
    <div className={styles.container}>
      <div className={styles["image-container"]}>
        {/* <img src={item.img} width="150px" /> */}
        <img loading="lazy" src={item.img}  alt="offer"/>
      </div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.description}>{item.body}</div>
    </div>
  );
}

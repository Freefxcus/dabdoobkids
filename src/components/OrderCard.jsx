import React from "react";
import styles from "../styles/components/OrderCard.module.css";
import lady from "../images/lady.png";
export default function OrderCard({ editable }) {
  return (
    // <div className={styles.container}>
    <div
      className={styles.container}
      style={{ justifyContent: "space-between" }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <img src={lady} className={styles.img} />
        <div className={styles.column}>
          <div className={styles.column}>
            <div className={styles.category}>Spring Collection</div>
            <div className={styles.title}>Women's Turtleneck Sweater</div>
          </div>
          <div className={`${styles.row} ${styles.subtitle}`}>
            <div>Spring Collection</div>
            <div className={styles.category}>|</div>
            <div className={styles.row} style={{ gap: "0" }}>
              <span>Pink &nbsp;</span>
              <span
                className={styles.color}
                style={{ backgroundColor: "pink" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <img src="./edit.svg" style={{ cursor: "pointer" }} />
        <img src="./remove.svg" style={{ cursor: "pointer" }} />
      </div>
      {/* <div className={styles.number} style={{ marginLeft: "auto" }}> */}
      <div className={styles.number}>
        <div>3</div>
        <div>x</div>
        <div>$ 500.00</div>
      </div>
      <div className={styles.total}>$ 500.00</div>
    </div>
  );
}

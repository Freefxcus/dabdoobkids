import React from "react";
import styles from "../styles/components/Plans.module.css";
import premium from "../images/premium.png";
import { ArrowRight2 } from "iconsax-react";
import check from "../images/check.svg";
export default function Plans() {
  return (
    <div className={`${styles.container} `}>
      <div className={`${styles["premium-container"]} margin-container`}>
        <div
          className={`${styles.column} ${styles["premium-head"]}`}
          style={{ width: "calc(100% - 30px)" }}
        >
          <div className={styles.row}>
            <img src={premium} width="50px" />
            <div>Premium plan</div>
          </div>
          <div className={styles.row}>
            <div>EGP 70</div>
            <div>/monthly</div>
          </div>
          <div className={styles.row}>
            <div>Get the best benefits with us</div>
          </div>
          <button className={`${styles["premium-button"]} ${styles.row}`}>
            Upgrade to pro plane
            <ArrowRight2
              onClick={() => {}}
              size="15"
              color="var(--white)"
              variant="Outline"
            />
          </button>
        </div>
        <div
          className={`${styles.column} ${styles["premium-body"]}`}
          style={{ width: "calc(100% - 30px)" }}
        >
          <div style={{ fontWeight: "bold" }}>What’s included?</div>
          <div className={styles.row}>
            <img src={check} />
            <div>Free Shipping all month upon every order</div>
          </div>
          <div className={styles.row}>
            <img src={check} />
            Special offers and flash sales alert
          </div>
          <div className={styles.row}>
            <img src={check} />
            Faster delivery
          </div>
          <div className={styles.row}>
            <img src={check} />( on the occasion of our launch ) 5% Discount
            code specially for you
          </div>
          <div className={styles.row}>
            <img src={check} />
            You can be a model baby for a day
          </div>
        </div>
      </div>
    </div>
  );
}

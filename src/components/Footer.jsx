import React from "react";

import styles from "../styles/components/Footer.module.css";

import { EmailOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* footer 1 */}
      <div
        className={`${styles["primary-footer-container"]} padding-container`}
      >
        <div
          className={styles.logo}
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          Logo
        </div>

        <div className={styles.section}>
          <div className={styles.header}>Help</div>
          <Link to="/returns-refunds" className={styles.link}>
            Exchanges & Returns
          </Link>
          <Link to="/payment-information" className={styles.link}>
            Payment Information
          </Link>
          <Link to="/privacy-policy" className={styles.link}>
            privacy policy
          </Link>
          <Link to="/faq" className={styles.link}>
            FAQs
          </Link>
        </div>
        <div className={styles.section}>
          <div className={styles.header}>Business</div>
          <Link to="/about" className={styles.link}>
            About Us
          </Link>
          <div className={styles.link}>Pop-up Store</div>
          <div className={styles.link}>Career</div>
          <Link to="/news" className={styles.link}>
            News
          </Link>
        </div>
        <div className={styles.section}>
          <div className={styles.header}>Find Us</div>
          <a href="##" target="_blank" className={styles.link} rel="noreferrer">
            Instagram
          </a>
          <a href="##" target="_blank" className={styles.link} rel="noreferrer">
            Facebook
          </a>
          <a href="##" target="_blank" className={styles.link} rel="noreferrer">
            Tiktok
          </a>
        </div>
        <div
          className={styles.section}
          style={{
            maxWidth: "350px",
            // marginLeft: "300px",
            justifyContent: "flex-start",
          }}
        >
          <div className={styles.header}>
            Sign up to our newsletter and keep up to date with the latest
            arrivals
          </div>
          <div className={styles["email-container"]}>
            <input className={styles["email-input"]} placeholder="You Email" />
            <EmailOutlined />
          </div>
        </div>
      </div>
      {/* footer 2 */}
      <div
        className={`${styles["secondary-footer-container"]} padding-container`}
      >
        Copyright © 2024- 2027
      </div>
    </>
  );
}

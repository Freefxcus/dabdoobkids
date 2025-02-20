import React, { useState, useEffect, useRef } from "react";

import styles from "../styles/components/Footer.module.css";
import logo from "../images/logo.svg";
import brownEmail from "../images/brown-email.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const [emailValue, setEmailInputValue] = useState("");
  const navigate = useNavigate();

  return (
    <>
      {/* footer 1 */}
      <div
        className={`${styles["primary-footer-container"]} padding-container`}
      >
        <img
          loading="lazy"
          src="/images/Footer Logo.png"
          className={styles.logo}
          alt="logo"
        />
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
          <a
            href="https://www.instagram.com/dabdoobkidz?igsh=MTJlMXN0ZWI4MmFxeQ=="
            target="_blank"
            className={styles.link}
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61555247997096&mibextid=JRoKGi"
            target="_blank"
            className={styles.link}
          >
            Facebook
          </a>
          <a
            href="https://www.tiktok.com/en/"
            target="_blank"
            className={styles.link}
          >
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
            <input
              className={styles["email-input"]}
              placeholder="You Email"
              onChange={(e) => {
                setEmailInputValue(e.target.value);
              }}
            />
            <img src={brownEmail} alt="email" />
          </div>
        </div>
      </div>
      {/* footer 2 */}
      <div
        className={`${styles["secondary-footer-container"]} padding-container`}
      >
        Copyright © 2020 - 2021 First Boulevard. All rights reserved.
      </div>
    </>
  );
}

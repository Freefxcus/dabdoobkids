import React, { useState } from "react";

import styles from "../styles/components/Footer.module.css";
//import logo from "../images/footer-logo.svg";
import logo from "../images/logo_insta.svg";
import CommercialRegistry from "../components/CommercialRegistry";
import { Link } from "react-router-dom";
import brownEmail from "../images/brown-email.svg";
import CommercialRegistry from "../components/CommercialRegistry";

export default function Footer() {
  const [emailValue, setEmailInputValue] = useState("");

  return (
    <>
      {/* footer 1 */}
      <div
        className={`${styles["primary-footer-container"]} padding-container`}
      >
        <div className={styles.logo}>
          <img
            loading="lazy"
            src={logo}
            alt="logo"
            width="186px"
            height="58px"
          />
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
          <a
            href="https://www.instagram.com/dabdoobkidz?igsh=MTJlMXN0ZWI4MmFxeQ=="
            target="_blank"
            className={styles.link}
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61555247997096&mibextid=JRoKGi"
            target="_blank"
            className={styles.link}
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.tiktok.com/@dabdoobkidz?lang=en"
            target="_blank"
            className={styles.link}
            rel="noreferrer"
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
        Copyright © 2024- 2027
      </div>
       <div
        className={`${styles["secondary-footer-container"]} padding-container`}
      >
        <CommercialRegistry
        crNumber="101300700109870" 
        showLabel
        groupSize={3}             
        copyable
        size="md"
      />
      </div>
    </>
  );
}

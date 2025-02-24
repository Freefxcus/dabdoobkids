import React from "react";
import styles from "../styles/components/PromoCard.module.css";
import promocard from "../images/promocard.png";
import copyIcon from "../images/copy.png";
import copy from "copy-text-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function OrderCard() {
  const notifySuccess = () => {
    toast.success("Code copied to clipboard!", {
      position: "top-center",
      autoClose: 1000, // Auto close the notification after 3000 milliseconds (3 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const notifyError = () => {
    toast.error("Operation failed!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  return (
    <div className={styles.container}>
      <img src={promocard} className={styles.img} />
      {/* <div className={styles.img_text}>30% off for Men's Clothing</div> */}
      <div>30% off for Men's Clothing</div>
      <div className={styles.row}>
        <div className={styles.code}>mens30</div>
        <img
          src={copyIcon}
          width="20px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            copy("🦄🌈");
            notifySuccess();
          }}
          alt="copy"
        />
      </div>
      <div className={styles.v_line}></div>
      <div className={styles.row}>
        <div className={styles.c}>12 December 2022</div>
        <div style={{ color: "var(--brown)" }}>T&C</div>
      </div>
      <ToastContainer />
    </div>
  );
}

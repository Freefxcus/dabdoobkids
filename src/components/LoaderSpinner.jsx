import React from "react";
import styles from "../styles/components/LoaderSpinner.module.css";

export default function LoaderSpinner({ small }) {
  return (
    <div
      className={`${small ? styles.small : styles.large} ${styles.spinner}`}
    ></div>
  );
}

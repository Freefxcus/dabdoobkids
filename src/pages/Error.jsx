import React from "react";
import styles from "../styles/pages/Error.module.css";
export default function Error() {
  return (
    <div className={styles.container}>
      <img src={"/error 404.svg"} alt="" width="200px" />
      <div className={styles.title}>Something’s Missing</div>
      <div className={styles.description}>
        Sorry, we can’t find the page you’re looking for.
      </div>
      <div className={styles.back}>back to home</div>
    </div>
  );
}

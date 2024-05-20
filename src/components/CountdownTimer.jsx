import React, { useState, useEffect } from "react";
import styles from "../styles/components/CountdownTimer.module.css";

const CountdownTimer = ({ hours = 0, minutes = 0, seconds = 0, type }) => {
  const [remainingTime, setRemainingTime] = useState({
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const countdownInterval = setInterval(() => {
      if (totalSeconds > 0) {
        const updatedHours = Math.floor(totalSeconds / 3600);
        const updatedMinutes = Math.floor((totalSeconds % 3600) / 60);
        const updatedSeconds = totalSeconds % 60;

        setRemainingTime({
          hours: updatedHours,
          minutes: updatedMinutes,
          seconds: updatedSeconds,
        });

        totalSeconds -= 1;
      } else {
        clearInterval(countdownInterval);
        // Handle countdown completion, e.g., display a message or trigger an action
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [hours, minutes, seconds]);

  return (
    <div className={type === "a" ? styles.containerA : styles.containerB}>
      <div className={type === "a" ? styles.borderA : ""}>
        {String(remainingTime.hours).padStart(2, "0")}
      </div>
      <div>:</div>
      <div className={type === "a" ? styles.borderA : ""}>
        {String(remainingTime.minutes).padStart(2, "0")}
      </div>
      <div>:</div>
      <div className={type === "a" ? styles.borderA : ""}>
        {String(remainingTime.seconds).padStart(2, "0")}
      </div>
    </div>
  );
};

export default CountdownTimer;

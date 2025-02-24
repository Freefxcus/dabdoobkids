import React, { useState, useEffect } from "react";
import styles from "../styles/components/CountdownTimer.module.css";
import PropTypes from "prop-types";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = new Date(targetDate) - now;
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { days, hours, minutes, seconds };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.timerContainer}>
      {timeLeft.days > 0 ? (
        <>
          <div className={styles.timeBox}>
            {String(timeLeft.days).padStart(2, "0")}
          </div>
          <span className={styles.separator}>:</span>
        </>
      ) : null}

      <div className={styles.timeBox}>
        {String(timeLeft.hours).padStart(2, "0")}
      </div>
      <span className={styles.separator}>:</span>

      <div className={styles.timeBox}>
        {String(timeLeft.minutes).padStart(2, "0")}
      </div>
      <span className={styles.separator}>:</span>

      <div className={styles.timeBox}>
        {String(timeLeft.seconds).padStart(2, "0")}
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  targetDate: PropTypes.string.isRequired,
};

export default CountdownTimer;

// const CountdownTimer = ({ hours = 0, minutes = 0, seconds = 0, type }) => {
//   const [remainingTime, setRemainingTime] = useState({
//     hours,
//     minutes,
//     seconds,
//   });

//   useEffect(() => {
//     let totalSeconds = hours * 3600 + minutes * 60 + seconds;

//     const countdownInterval = setInterval(() => {
//       if (totalSeconds > 0) {
//         const updatedHours = Math.floor(totalSeconds / 3600);
//         const updatedMinutes = Math.floor((totalSeconds % 3600) / 60);
//         const updatedSeconds = totalSeconds % 60;

//         setRemainingTime({
//           hours: updatedHours,
//           minutes: updatedMinutes,
//           seconds: updatedSeconds,
//         });

//         totalSeconds -= 1;
//       } else {
//         clearInterval(countdownInterval);
//       }
//     }, 1000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(countdownInterval);
//   }, [hours, minutes, seconds]);

//   return (
//     <div className={type === "a" ? styles.containerA : styles.containerB}>
//       <div className={type === "a" ? styles.borderA : ""}>
//         {String(remainingTime.hours).padStart(2, "0")}
//       </div>
//       <div>:</div>
//       <div className={type === "a" ? styles.borderA : ""}>
//         {String(remainingTime.minutes).padStart(2, "0")}
//       </div>
//       <div>:</div>
//       <div className={type === "a" ? styles.borderA : ""}>
//         {String(remainingTime.seconds).padStart(2, "0")}
//       </div>
//     </div>
//   );
// };

// export default CountdownTimer;

import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "../styles/components/Otp.module.css";
import envelope from "../images/envelope.png";
import otpSuccess from "../images/otp-success.png";
import { useMediaQuery } from "@mui/material";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:1024px)"
  );
  const isLargeScreen = useMediaQuery("(min-width:1025px)");

  return (
    <div className={styles.container}>
      {!isSuccess && (
        <>
          <img src={envelope} width="70px" alt="envelope"/>
          <div>Email Verification</div>
          <div>Check your spam folder if you cannot find it.</div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>&nbsp; &nbsp;</span>}
            placeholder=""
            inputType="tel"
            renderInput={(inputProps, index) => (
              <input
                {...inputProps}
                maxLength={1}
                key={index}
                style={{
                  width: isSmallScreen
                    ? "40px"
                    : isMediumScreen
                    ? "50px"
                    : "70px",
                  height: isSmallScreen
                    ? "40px"
                    : isMediumScreen
                    ? "50px"
                    : "70px",

                  // width: "50px",
                  // height: "50px",
                  fontSize: "18px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                  outline: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "var(--dr-white)",
                }}
              />
            )}
          />
          <div className={styles.resend}>Resend code</div>
        </>
      )}
      {isSuccess && (
        <>
          <img src={otpSuccess} width="200px" />
          <div className={styles.main_text}>Verification Success</div>
          <div className={styles.sub_text}>
            You successfully registered. Find the best outfit right now.
          </div>
          <button className={styles.button}>Login</button>
        </>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";

const PasswordRequirements = ({ password }) => {
  const [requirements, setRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const RequirementItem = ({ achieved, text }) => {
    return (
      <div className="flex items-center gap-2 mb-1" style={{ marginBottom: "10px", paddingLeft: "10px" }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px", // Space between square and text
            fontSize: "16px", // Adjust text size
          }}
        >
          {/* Square Indicator */}
          <span
            style={{
              width: "12px", // Adjust size
              height: "12px", // Adjust size
              backgroundColor: achieved ? "var(--green)" : "var(--brown)", // Match text color
              display: "inline-block",
              borderRadius: "2px", // Slight rounding for better look
              transition: "background-color 0.3s ease-in-out",
              flexShrink: 0, // Prevents shrinking
            }}
          ></span>
  
          {/* Text */}
          <span
            style={{
              color: achieved ? "var(--green)" : "var(--brown)",
              transition: "color 0.3s ease-in-out",
            }}
          >
            {text}
          </span>
        </span>
      </div>
    );
  };
  

  return (
    <div className="">
      <RequirementItem
        achieved={requirements.length}
        text="At least 8 characters long"
      />
      <RequirementItem
        achieved={requirements.lowercase}
        text="Include at least one lowercase letter"
      />
      <RequirementItem
        achieved={requirements.uppercase}
        text="Include at least one uppercase letter"
      />      
      <RequirementItem
        achieved={requirements.number}
        text="Include at least one number"
      />
      <RequirementItem
        achieved={requirements.special}
        text="Include at least one special character (@, #, $, etc.)"
      />
    </div>
  );
};

export default PasswordRequirements;

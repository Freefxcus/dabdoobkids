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

  const RequirementItem = ({ achieved, text }) => (
    <div className="flex items-center gap-2 mb-1">
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          achieved ? "bg-green-600" : "bg-amber-700"
        }`}
      />
      <span className="text-sm text-amber-700">{text}</span>
    </div>
  );

  return (
    <div className="mt-1 mb-4">
      <RequirementItem
        achieved={requirements.length}
        text="At least 8 characters long"
      />
      <RequirementItem
        achieved={requirements.lowercase && requirements.uppercase}
        text="Mix of uppercase and lowercase letters"
      />
      <RequirementItem
        achieved={requirements.number}
        text="At least one number"
      />
      <RequirementItem
        achieved={requirements.special}
        text="At least one special character (@, #, $, etc.)"
      />
    </div>
  );
};

export default PasswordRequirements;

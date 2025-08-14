import React, { useMemo, useState } from "react";

function normalizeDigits(input) {
  // يحوّل أي أرقام عربية/هندية إلى لاتينية، ويشيل أي رموز غير أرقام
  const arabicIndic = "٠١٢٣٤٥٦٧٨٩";
  const easternArabicIndic = "۰۱۲۳۴۵۶۷۸۹";
  let out = "";
  for (const ch of input) {
    if (ch >= "0" && ch <= "9") { out += ch; continue; }
    const ai = arabicIndic.indexOf(ch);
    if (ai !== -1) { out += String(ai); continue; }
    const ei = easternArabicIndic.indexOf(ch);
    if (ei !== -1) { out += String(ei); continue; }
  }
  return out;
}

function groupDigits(num, groupSize) {
  if (groupSize <= 0) return num;
  const parts = [];
  for (let i = 0; i < num.length; i += groupSize) {
    parts.push(num.slice(i, i + groupSize));
  }
  return parts.join(" ");
}

export default function CommercialRegistry({
  crNumber,
  showLabel = true,
  groupSize = 3,
  copyable = true,
  className = "",
  size = "md",
}) {
  const normalized = useMemo(() => normalizeDigits(crNumber), [crNumber]);
  const formatted = useMemo(() => groupDigits(normalized, groupSize), [normalized, groupSize]);
  const [copied, setCopied] = useState(false);

  const sizes = {
    sm: { label: "0.8rem", number: "1rem", pad: "0.4rem 0.6rem", radius: "0.6rem" },
    md: { label: "0.9rem", number: "1.3rem", pad: "0.6rem 0.8rem", radius: "0.8rem" },
    lg: { label: "1rem",   number: "1.6rem", pad: "0.8rem 1rem",  radius: "1rem"  },
  }[size];

  async function copy() {
    try {
      await navigator.clipboard.writeText(normalized);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { /* ignore */ }
  }

  return (
    <div
      className={className}
      dir="rtl"
      style={{ fontFamily: "system-ui, Segoe UI, Tahoma, Arial, sans-serif" }}
      aria-label="رقم السجل التجاري"
    >
      {showLabel && (
        <div style={{ marginBottom: "0.25rem", fontSize: sizes.label, color: "#4b5563" }}>
          السجلّ التجاري
        </div>
      )}

      <div
        dir="ltr"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "#0b0f14",
          color: "white",
          padding: sizes.pad,
          borderRadius: sizes.radius,
          boxShadow: "0 4px 14px rgba(0,0,0,.18)",
        }}
      >
        <code
          style={{
            fontSize: sizes.number,
            letterSpacing: "0.04em",
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
          }}
        >
          {formatted}
        </code>

        {copyable && (
          <button
            onClick={copy}
            title="نسخ الرقم"
            style={{
              border: "1px solid #233041",
              background: "#121924",
              color: "white",
              padding: "0.3rem 0.5rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copied ? "✔ تم" : "نسخ"}
          </button>
        )}
      </div>
    </div>
  );
}

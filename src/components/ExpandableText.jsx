import { useState, useEffect, useRef } from "react";
import styles from "../styles/components/ExpandableText.module.css";

const ExpandableText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowed(
          textRef.current.scrollHeight > textRef.current.clientHeight
        );
      }
    };

    checkOverflow();
  }, [text]);

  return (
    <div className={styles.container}>
      <p
        ref={textRef}
        className={`${styles.text} ${
          isExpanded ? "" : styles.lineClamp3 + " md:" + styles.lineClamp4
        }`}
      >
        {text}
      </p>

      {isOverflowed && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.button}
        >
          {isExpanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;

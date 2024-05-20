import React from "react";
import styles from "../styles/components/Category.module.css";
import bodySuit from "../images/body-suit.png";
import { useNavigate } from "react-router-dom";
export default function Category({ item }) {
  console.log(item);
  const navigate = useNavigate();

  return (
    <div
      className={styles.container}
      onClick={() => {
        // navigate(`search/${item.id}`);
        navigate(`search/?categoryId=${item.id}`);
      }}
    >
      <div className={styles["text-section"]}>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.subtitle}>2310 Product</div>
      </div>
      <img src={item?.images?.[0]} className={styles.image} />
    </div>
  );
}

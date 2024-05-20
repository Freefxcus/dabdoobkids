import { useState } from "react";
import styles from "../styles/pages/Categories.module.css";
import Category from "../components/Category";
export default function Categories() {
  const [largeImage, setLargeImage] = useState();

  return (
    <div className="section-top-padding section-bottom-padding">
      <div className={styles.title}>Categories</div>
      <div className={styles.cards_container}>
        {["", "", "", "", "", "", "", "", ""].map((item) => (
          <Category item={item} />
        ))}
      </div>
    </div>
  );
}

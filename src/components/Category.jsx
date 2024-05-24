import React from "react";
import styles from "../styles/components/Category.module.css";
import bodySuit from "../images/body-suit.png";
import { useNavigate } from "react-router-dom";
export default function Category({ item }) {
  console.log(item);
  const navigate = useNavigate();

  return (
    <div
      style={{margin : "48px auto" , }}
      onClick={() => {
        // navigate(`search/${item.id}`);
        navigate(`/search/?categoryId=${item.id}`);
      }}
    >
      <div style={{ display: "flex", alignItems: "center",gap :"16px",justifyContent : "center" , width : "400px" }}>
        <div style={{display : "flex" , flexDirection : "column" , width :"50%"}}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.subtitle}>2310 Product</div>
        </div>

        <img style={{width : "140px" , height : "140px"}} src={item?.images?.[0]} alt="Category Image" className={styles.image}  />
      </div>
    </div>
  );
}

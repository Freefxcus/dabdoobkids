import React from "react";
import styles from "../../styles/components/OrderCard.module.css";
import lady from "../../images/lady.png";
import DeleteModal from ".././cart/DeleteModal";
import Counter from ".././singleProduct/counter";
import CartCounter from ".././cart/CartCounter";
import EditModal from ".././cart/EditModal";
import { useDispatch } from "react-redux";
export default function OrderOverview({
  editable,
  item,
  setCartChanged,
  totalPrice,
}) {
  console.log(item, "item123123");
  
  const { product, variant } = item;



  const [productCount, setProductCount] = React.useState(item.count);
  const total = productCount * variant?.price;

  return (
    // <div className={styles.container}>
    <div style={{ display: "flex", flexDirection: "column"  }}>

        
      <div
        className={styles.container}
        style={{ justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <img src={product?.images[0]} alt="product" className={styles.img} />
          <div className={styles.column}>
            <div className={styles.column}>
              <div className={styles.category}>Spring Collection</div>
              <div className={styles.title}>{product?.name?.en}</div>
            </div>
            <div className={`${styles.row} ${styles.subtitle}`}>
              <div></div>

              <div className={styles.row} style={{ gap: "0" }}>
                <span>Size : </span>
                <span
                  style={{
                    marginLeft: "6px",
                    marginRight: "6px",
                    textTransform: "capitalize",
                  }}
                  className={styles.size}
                >
                  {variant?.size}
                </span>

                <span>Color : </span>
                <span
                  className={styles.color}
                  style={{
                    backgroundColor: `${variant?.color}`,
                    marginLeft: "6px",
                  }}
                ></span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.number} style={{ marginLeft: "auto" }}> */}

        <div className={styles.total}>{total}$</div>
      </div>
    </div>
  );
}

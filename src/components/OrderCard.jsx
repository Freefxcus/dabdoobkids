import React from "react";
import styles from "../styles/components/OrderCard.module.css";
import lady from "../images/lady.png";
import DeleteModal from "./cart/DeleteModal";
import Counter from "./singleProduct/counter";
import CartCounter from "./cart/CartCounter";
export default function OrderCard({
  editable,
  item,
  setCartChanged,
  totalPrice,
}) {
  console.log(item, "item123123");
  const { product, variant } = item;

  const [openDelete, setOpenDelete] = React.useState(false);
  const [productCount, setProductCount] = React.useState(item.count);
  const total = productCount * variant.price;
  const increment = () => {
    setProductCount((prev) => prev + 1);
  };
  const decrement = () => {
    setProductCount((prev) => prev - 1);
  };
  const [openEdit, setOpenEdit] = React.useState(false);
  return (
    // <div className={styles.container}>
    <div style={{display : "flex" , flexDirection : "column"}}>
      <div
        className={styles.container}
        style={{ justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <img src={product?.images[0]} alt="product" className={styles.img} />
          <div className={styles.column}>
            <div className={styles.column}>
              <div className={styles.category}>Spring Collection</div>
              <div className={styles.title}>{product.name.en}</div>
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
                  {variant.size}
                </span>

                <span>Color : </span>
                <span
                  className={styles.color}
                  style={{
                    backgroundColor: `${variant.color}`,
                    marginLeft: "6px",
                  }}
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <img src="./edit.svg" alt="edit" style={{ cursor: "pointer" }} />
          <img
            onClick={() => {
              setOpenDelete(true);
            }}
            src="./remove.svg"
            alt="remove"
            style={{ cursor: "pointer" }}
          />
          <DeleteModal
            open={openDelete}
            setOpen={setOpenDelete}
            ProductId={product.id}
            variantId={variant.id}
            setCartChanged={setCartChanged}
          />
        </div>
        {/* <div className={styles.number} style={{ marginLeft: "auto" }}> */}
        <div className={styles.number}>
          <div>{productCount}</div>
          <div>x</div>
          <div>{variant.price}</div>
        </div>
        <CartCounter
          increment={increment}
          decrement={decrement}
          count={productCount}
        />
        <div className={styles.total}>{total}</div>
        
      </div>

    </div>
  );
}

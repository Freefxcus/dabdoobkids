import React from "react";
import styles from "../../styles/components/OrderCard.module.css";
export default function OrderOverview({
  editable,
  item,
  setCartChanged,
  totalPrice,
}) {
  console.log(item, "item123123");

  const { product, variant } = item;

  const finalPrice =
    Math.trunc(Number(item?.totalPrice) - Number(item?.discount)) ||
    item?.totalPrice;

  return (
    // <div className={styles.container}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className={styles.container}
        style={{ justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <img
            src={product?.images?.[0]}
            alt="product"
            className={styles.img}
          />
          <div className={styles.column}>
            <div className={styles.column}>
              {/* <div className={styles.category}>Spring Collection</div> */}
              <div className={styles.title}>{product?.name}</div>
            </div>
            <div className={`${styles.row} ${styles.subtitle}`}>
              {variant?.options.length
                ? variant?.options?.map((variantItem, index) => (
                    <div
                      key={index + variantItem?.id}
                      className={styles.row}
                      style={{ gap: "0" }}
                    >
                      <span>{variantItem?.option?.name} : </span>
                      <span
                        style={{
                          marginLeft: "6px",
                          marginRight: "6px",
                          textTransform: "capitalize",
                        }}
                        className={styles.size}
                      >
                        {variantItem?.value?.value}
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        {/* <div className={styles.number} style={{ marginLeft: "auto" }}> */}

        <div className={styles.total}>{finalPrice}EGY</div>
      </div>
    </div>
  );
}

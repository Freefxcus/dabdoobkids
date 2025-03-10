import React, { useEffect } from "react";
import styles from "../../styles/components/OrderCard.module.css";
import { calcDiscount } from "../../utils/general";

export default function SummaryOrderProductCard({ item }) {
  const finalPrice = calcDiscount(item?.variant, item?.product);

  // {sale.discountType === "percentage"
  //                     ? productDetails.price -
  //                       (productDetails?.price *
  //                         productDetails.sale.discountAmount) /
  //                         100
  //   : finalPrice.price - +productDetails.sale.discountAmount
  // }

  const totalPrice =
    item?.count * !item.product?.sale
      ? finalPrice.discount
        ? finalPrice.priceAfter
        : finalPrice.price
      : item?.product?.sale?.discountType === "percentage"
      ? item.product.price -
        (item.product.price * item.product.sale.discountAmount) / 100
      : finalPrice.price - +item.product.sale.discountAmount;

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        width: "100%",
        justifyContent: "",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "18px",
      }}
    >
      <img
        style={{ height: "150px", width: "116px", objectFit: "cover" }}
        src={item?.product?.images[0]}
        alt="Checkout"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div>
          {/* <h2 style={{ fontSize: "18px", fontWeight: "400" }}>
        Spring Collection
      </h2> */}
          <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
            {item?.product?.name}
          </h2>
        </div>

        {item?.variant?.options.length && (
          <div style={{ display: "flex" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "400",
                textTransform: "capitalize",
              }}
            >
              {" Size "}
              {item?.variant?.options[0].name} :{" "}
            </h2>
            <span
              style={{
                marginLeft: "6px",
                marginRight: "6px",
                textTransform: "capitalize",
              }}
              className={styles.size}
            >
              {item?.variant?.options[0].value?.value}
            </span>
          </div>
        )}
      </div>
      <div
        style={{
          fontWeight: "500",
          display: "flex",
          gap: "32px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontWeight: "500",
            display: "flex",

            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",

              border: "1px solid var(--dreamy-cloud)",
              fontWeight: "400",
              padding: "8px 14px",
            }}
          >
            <h2 style={{ fontWeight: "400" }}>{item?.count}</h2>
            <h2 style={{ fontWeight: "400" }}>x</h2>
            <h2 style={{ fontWeight: "400" }}>
              {finalPrice.discount
                ? finalPrice.priceAfter
                : item.product.sale
                ? item.product.price -
                  (item.product.price * item.product.sale.discountAmount) / 100
                : finalPrice.price}
              EGP
            </h2>
          </div>
        </div>

        <div
          style={{
            fontWeight: "500",
            display: "flex",

            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <div style={{ backgroundColor: "transparent" }}>
            <h2 style={{ fontWeight: "400" }}>{totalPrice}EGP</h2>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

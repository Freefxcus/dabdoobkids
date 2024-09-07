import React from "react";
import styles from "../../styles/components/OrderCard.module.css";
import { calcDiscount } from "../../utils/general";

export default function SummaryOrderProductCard({ item }) {
  const finalPrice = calcDiscount(item?.variant, item?.product);
  const totalPrice =
    item?.count *
    (finalPrice.discount ? finalPrice.priceAfter : finalPrice.price);

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        width: "100%",
        justifyContent: "space-between",
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
          justifyContent: "space-between",
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

        {item?.variant?.options.length
          ? item?.options?.map((variantItem, index) => (
              <div
                key={index + variantItem?.id}
                style={{ display: "flex", gap: "12px" }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                >
                  {" "}
                  {variantItem?.option?.name} :{" "}
                </h2>
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
              padding:"8px 14px"
            }}
          >
            <h2 style={{ fontWeight: "400" }}>{item?.count}</h2>
            <h2 style={{ fontWeight: "400" }}>x</h2>
            <h2 style={{ fontWeight: "400" }}>
              {finalPrice.discount ? finalPrice.priceAfter : finalPrice.price}
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

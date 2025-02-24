import React from "react";
import styles from "../../styles/components/OrderCard.module.css";
import { newCalcDiscount } from "../../utils/general";
import { Box, Typography } from "@mui/material";

export default function SummaryOrderProductCard({ item }) {
  // {sale.discountType === "percentage"
  //                     ? productDetails.price -
  //                       (productDetails?.price *
  //                         productDetails.sale.discountAmount) /
  //                         100
  //   : finalPrice.price - +productDetails.sale.discountAmount
  // }

  const { totalPrice, priceAfter, price, discountStatus } =
    newCalcDiscount(item);

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
      <Box
        sx={{
          fontWeight: "500",
          display: "flex",
          gap: "32px",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          "@media (max-width:767px)": {
            flexWrap: "wrap",
          },
        }}
      >
        <Box
          sx={{
            fontWeight: "500",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {discountStatus && (
              <p
                style={{
                  fontWeight: "400",
                  textDecoration: "line-through",
                  color: "#ccc",
                  fontSize: "24px",
                  textWrap: "nowrap",
                }}
              >
                {price} EGP
              </p>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--dreamy-cloud)",
                fontWeight: "400",
                padding: "8px 14px",
                gap: "4px",
                "@media (max-width:767px)": {
                  width: "100%",
                },
              }}
            >
              <Typography style={{ fontSize: "24px", color: "black" }}>
                {item?.count}
              </Typography>
              <Typography style={{ fontSize: "24px", color: "black" }}>
                x
              </Typography>
              <Typography style={{ fontSize: "24px", color: "black" }}>
                {priceAfter}
                EGP
              </Typography>
            </Box>
          </Box>
        </Box>

        <div
          style={{
            fontWeight: "500",
            display: "flex",

            justifyItems: "center",
            alignItems: "center",
            textWrap: "nowrap",
          }}
        >
          <div>
            <p
              style={{
                color: "black",
                fontSize: "24px",
              }}
            >
              {totalPrice} EGP
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
}

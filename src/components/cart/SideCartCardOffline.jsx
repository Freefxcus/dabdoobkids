import { Box } from "@mui/material";
import React from "react";
import { newCalcDiscount } from "../../utils/general";

export default function SideCartCardOffline({ item }) {
  const { price, totalPrice, discountStatus, priceAfter } = newCalcDiscount({
    count: item.count,
    product: item,
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "150px",
            width: "150px",
            height: "auto",
            maxHeight: "150px",
            border: "1px solid #b1b1b133",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Box
            component={"img"}
            sx={{
              maxWidth: "150px",
              border: "1px solid #b1b1b133",
              width: "100%",
              height: "auto",
              maxHeight: "150px",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "20px",
            }}
            alt={item.name}
            src={item?.images?.[0]}
          />

          {/* {discountStatus ? (
            <Box
              sx={{
                position: "absolute",
                bottom: "8px",
                left: "2px",
                padding: "4px 6px",
                backgroundColor: "var(--brown)",
                borderRadius: "4px",
                color: "#fff",
              }}
            >
              {(+item?.product?.discount)?.toFixed()}
              {item?.product?.discountType === "percentage" ? "%" : "EGP"}
            </Box>
          ) : null} */}
        </Box>
        <div
          style={{
            width: "80%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div>
            <div
              style={{
                marginBottom: "10px",
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--grey-text)",
              }}
            >
              {item.brand?.name}
            </div>
            <div
              style={{
                marginBottom: "10px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#1B1B1B",
              }}
            >
              {item.name}
            </div>
          </div>

          <Box
            sx={{
              display: "block",
              "@media (min-width:600px)": {
                display: "none",
              },
            }}
          >
            {item?.variantInformation?.options?.[0]?.value?.value}
          </Box>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              rowGap: "8px",
            }}
          >
            {/* <Counter
              setCount={setCount}
              count={+count}
              handleUpdateQuantity={handleUpdateQuantity}
              item={item.product}
              CartAddLoad={CartAddLoad}
              selectedVariantObject={item.variant}
            /> */}

            <div
              style={{
                fontSize: "16px",
                fontWeight: "800",
              }}
            >
              {item.count}X
            </div>
            <Box
              sx={{
                display: "none",
                "@media (min-width:600px)": {
                  display: "block",
                },
              }}
            >
              {item?.variantInformation?.options?.[0]?.value?.value}
            </Box>

            <div>
              {discountStatus ? (
                <>
                  {" "}
                  <Box
                    component={"s"}
                    sx={{
                      // display:{xs:"none",sm:"flex"},
                      fontSize: { md: "1rem", sm: "0.75rem", xs: "0.7rem" },
                      fontWeight: "500",
                      color: "var(--grey-text)",
                    }}
                  >
                    EGP {price}{" "}
                  </Box>{" "}
                  <Box
                    component={"span"}
                    sx={{
                      fontSize: { md: "1.25rem", sm: "1rem", xs: "0.85rem" },
                      fontWeight: "700",
                      color: "#1B1B1B",
                    }}
                  >
                    EGP {priceAfter}
                  </Box>
                </>
              ) : (
                <span>EGP {price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
          borderTop: "1px solid #E8E8E8",
          width: "80%",
        }}
      ></div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { calcDiscount, notifySuccess } from "../../utils/general";
import Counter from "../singleProduct/counter";
import { useAddToCartMutation } from "../../Redux/cartApi";
import { Box } from "@mui/material";

export default function SideCartCard({ item }) {
  // const [count, setCount] = useState(1);

  // const [addToCart, { isLoading: CartAddLoad }] = useAddToCartMutation();

  // const handleUpdateQuantity = async (itemObj) => {
  //   let newCount = itemObj ? Math.trunc(count - itemObj?.count) : count || 1;
  //   if (newCount === 0) return 0;
  //   let NewItem = [
  //     {
  //       product: +itemObj?.product?.id,
  //       count: newCount,
  //       variant: +itemObj?.variant?.id,
  //     },
  //   ];
  //   try {
  //     const response = await addToCart(NewItem).unwrap();
  //     const message = `Updated Item to cart!`;
  //     notifySuccess(message);
  //   } catch (error) {
  //     const errorMessage = "Failed to Updated to cart";
  //     // notifyError(errorMessage);
  //   }
  // };

  // useEffect(() => {
  //   setCount(item?.count);
  // }, [item]);
  // useEffect(() => {
  //   handleUpdateQuantity(item);
  // }, [count]);
  const finalPrice = calcDiscount(item?.variant, item?.product);

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
            width:"150px",
            height: "auto",
            maxHeight:"150px",
            border: "1px solid #b1b1b133",
            borderRadius: "20px",
            overflow:"hidden"
          }}
        >
          <Box
            component={"img"}
            sx={{  maxWidth: "150px",  border: "1px solid #b1b1b133",
            width:"100%",
            height: "auto",
            maxHeight:"150px",
              objectFit: "cover",
              objectPosition: "center",
               borderRadius: "20px",
            }}
            alt={item.product.name}
            src={item?.product?.images?.[0]}
          />
         {finalPrice?.discount? <Box
            sx={{
              position: "absolute",
              bottom: "8px",
              left: "2px",
              padding: "4px 6px",
              backgroundColor:"var(--brown)",
              borderRadius:"4px",
              color:"#fff"
            }}
          >
            {(+item?.product?.discount)?.toFixed() }{item?.product?.discountType==="percentage"?"%":"EGP"}
          </Box>:null}
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
              {item.product?.brand?.name}
            </div>
            <div
              style={{
                marginBottom: "10px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#1B1B1B",
              }}
            >
              {item.product.name}
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {item.product.description}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
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

            <div>
              {finalPrice?.discount ? (
                <>
                  {" "}
                  <Box component={"s"}
                    sx={{ 
                      // display:{xs:"none",sm:"flex"},
                      fontSize: {md:"1rem",sm: "0.75rem",xs:"0.7rem"},
                      fontWeight: "500",
                      color: "var(--grey-text)",
                    }}
                  >
                    EGP {finalPrice.price}{" "}
                  </Box>{" "}
                  <Box component={"span"}
                    sx={{
                      fontSize:  {md:"1.25rem",sm: "1rem",xs:"0.85rem"},
                      fontWeight: "700",
                      color: "#1B1B1B",
                    }}
                  >
                    EGP {finalPrice.priceAfter}
                  </Box>
                </>
              ) : (
                <span>EGP {finalPrice.price}</span>
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

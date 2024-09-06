import React, { useEffect, useState } from "react";
import { calcDiscount, notifySuccess } from "../../utils/general";
import Counter from "../singleProduct/counter";
import { useAddToCartMutation } from "../../Redux/cartApi";

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
        <img src={item.product.images[0]} height="150px" />
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
                  <s
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "var(--grey-text)",
                    }}
                  >
                    EGP {finalPrice.price}{" "}
                  </s>{" "}
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: "#1B1B1B",
                    }}
                  >
                    EGP {finalPrice.priceAfter}
                  </span>
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

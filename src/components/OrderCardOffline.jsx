import React from "react";
import styles from "../styles/components/OrderCard.module.css";
import DeleteModal from "./cart/DeleteModal";
import CartCounter from "./cart/CartCounter";
import { useDispatch } from "react-redux";

import { Trash } from "iconsax-react";
import { cartActions } from "../Redux/store";
import { newCalcDiscount } from "../utils/general";
export default function OrderCardOffline({ item }) {
  const dispatch = useDispatch();
  const [productCount, setProductCount] = React.useState(item?.count);

  console.log("item", item);

  const { price, discountStatus, priceAfter, totalPrice } = newCalcDiscount({
    count: item?.count,
    product: item || {},
  });

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleUpdateQuantity = (count) => {
    dispatch(cartActions.updateCount({ id: item.id, count }));
  };

  const increment = () => {
    setProductCount((prev) => prev + 1);
    handleUpdateQuantity(item.count + 1);
  };
  const decrement = () => {
    setProductCount((prev) => prev - 1);
    handleUpdateQuantity(item.count - 1);
  };

  return (
    <>
      <div style={{ flexDirection: "column" }} className={styles.forDesktop}>
        <div
          className={styles.container}
          style={{
            justifyContent: "space-between",
            paddingBottom: "20px",
            borderBottom: " 0.5px solid #E8E8E8",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <img src={item?.images?.[0]} alt="product" className={styles.img} />
            <div className={styles.column}>
              <div className={styles.column}>
                {/* <div className={styles.category}>{product?.brand?.name}</div> */}
                <div className={styles.title}>{item?.name}</div>
              </div>
              <div className={`${styles.row} ${styles.subtitle}`}>
                {item?.variantInformation?.options.length && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                      }}
                    >
                      {" Size "}
                      {item?.variantInformation?.options[0].name} :{" "}
                    </h2>
                    <span
                      style={{
                        marginLeft: "6px",
                        marginRight: "6px",
                        textTransform: "capitalize",
                      }}
                      className={styles.size}
                    >
                      {item?.variantInformation?.options[0].value?.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
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
              id={item?.id}
            />
          </div>
          {/* <div className={styles.number} style={{ marginLeft: "auto" }}> */}
          <div className={styles.column}>
            <span style={{ textAlign: "center" }}>price</span>
            <div style={{ alignSelf: "center", display: "flex ", gap: "8px" }}>
              {discountStatus && (
                <div>
                  <span
                    style={{
                      color: "GrayText",
                      textDecoration: "line-through",
                    }}
                  >
                    EGP {price.toFixed(2)}
                  </span>
                </div>
              )}

              <div>
                <span>EGP {priceAfter.toFixed(2)}</span>
              </div>
            </div>
            <div></div>
          </div>

          <div className={styles.column}>
            <span>Quantity</span>
            <CartCounter
              // CartAddLoad={CartAddLoad}
              increment={increment}
              decrement={decrement}
              count={productCount}
            />
            <div></div>
          </div>

          <div className={styles.column}>
            <span>SubTotal</span>
            <div className={styles.total}>{totalPrice}EGP</div>
            <div></div>
          </div>
        </div>
      </div>

      {/* moblie */}

      <div className={`${styles.product}   ${styles.forMobile} `}>
        <div className={styles.content}>
          <div className={styles.product2}>
            <img
              className={styles.photoIcon}
              src={item?.images?.[0]}
              alt="product"
            />
            <div className={styles.productContent}>
              <div className={styles.productName}>
                {/* <div className={styles.springCollection}>Spring Collection</div> */}
                <div className={styles.mensUaStorm}>{item?.name}</div>
              </div>
              <div className={styles.frameParent}>
                <div className={styles.frameGroup}>
                  {item?.variantInformation?.options.length && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "18px",
                          fontWeight: "400",
                          textTransform: "capitalize",
                        }}
                      >
                        {" Size "}
                        {item?.variantInformation?.options[0].name} :{" "}
                      </h2>
                      <span
                        style={{
                          marginLeft: "6px",
                          marginRight: "6px",
                          textTransform: "capitalize",
                        }}
                        className={styles.size}
                      >
                        {item?.variantInformation?.options[0].value?.value}
                      </span>
                    </div>
                  )}
                </div>
                <div className={styles.frameGroup}>
                  <Trash
                    color="#F04438"
                    onClick={() => {
                      setOpenDelete(true);
                    }}
                    style={{ cursor: "pointer" }}
                  />

                  <DeleteModal
                    open={openDelete}
                    setOpen={setOpenDelete}
                    id={item?.id}
                    // ProductId={product?.id}
                    // variantId={variant?.id}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.parent}>
            <div className={styles.div}>
              {discountStatus && (
                <div>
                  <span
                    style={{
                      color: "GrayText",
                      textDecoration: "line-through",
                    }}
                  >
                    EGP {price.toFixed(2)}
                  </span>
                </div>
              )}

              <div>
                <span>EGP {priceAfter.toFixed(2)}</span>
              </div>
            </div>
            <div className={""}>
              <CartCounter
                // CartAddLoad={CartAddLoad}
                increment={increment}
                decrement={decrement}
                count={productCount}
              />
            </div>
            <div
              className={styles.div2}
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#1B1B1B",
              }}
            >
              EGP{totalPrice}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

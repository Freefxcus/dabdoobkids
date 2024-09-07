import React, { useEffect } from "react";
import styles from "../styles/components/OrderCard.module.css";
import lady from "../images/lady.png";
import DeleteModal from "./cart/DeleteModal";
import Counter from "./singleProduct/counter";
import CartCounter from "./cart/CartCounter";
import EditModal from "./cart/EditModal";
import { useDispatch, useSelector } from "react-redux";

import { useAddToCartMutation } from "../Redux/cartApi";
import { calcDiscount, notifyError, notifySuccess } from "../utils/general";
import { Trash } from "iconsax-react";
export default function OrderCard({
  editable,
  item,
  allCarts,
  setCartChanged,
  
}) {
  const { product, variant } = item;
  const dispatch = useDispatch();
  const [productCount, setProductCount] = React.useState(item.count);
  const total = productCount * +(variant?.price || product?.price);

  const [openDelete, setOpenDelete] = React.useState(false);

  let itemForCart = allCarts?.find(
    (cartItem) =>
      cartItem?.product.id == product?.id &&
      cartItem?.variant?.id == variant?.id
  );
  const [addToCart, { isLoading: CartAddLoad }] = useAddToCartMutation();

  const handleUpdateQuantity = async (Count) => {
    let newCount = itemForCart ? Math.trunc(Count - itemForCart.count) : Count;
    if (newCount === 0) return 0;
    let item = [
      {
        product: +product?.id,
        count: newCount,
        variant: variant?.id,
      },
    ];
    try {
      const response = await addToCart(item).unwrap();
      const message = `Updated Item to cart!`;
      notifySuccess(message);
    } catch (error) {
      const errorMessage = "Failed to Updated to cart";
      notifyError(errorMessage);
    }
  };

  const increment = () => {
    setProductCount((prev) => prev + 1);
    handleUpdateQuantity(productCount + 1);
  };
  const decrement = () => {
    setProductCount((prev) => prev - 1);
    handleUpdateQuantity(productCount - 1);
  };
  const finalPrice = calcDiscount(item?.variant, item?.product);

  const totalPrice =item?.count * (finalPrice.discount?finalPrice.priceAfter:finalPrice.price)

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
            <img
              src={product?.images[0]}
              alt="product"
              className={styles.img}
            />
            <div className={styles.column}>
              <div className={styles.column}>
                {/* <div className={styles.category}>{product?.brand?.name}</div> */}
                <div className={styles.title}>{product.name}</div>
              </div>
              <div className={`${styles.row} ${styles.subtitle}`}>
                {item?.variant?.options?.length
                  ? item?.variant?.options?.map((variantItem, index) => (
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
              id={item.id}
              ProductId={product?.id}
              variantId={variant?.id}
            />
          </div>
          {/* <div className={styles.number} style={{ marginLeft: "auto" }}> */}
          <div className={styles.column}>
            <span>price</span>
            <div style={{ alignSelf: "center" }}>
              <div>
                {" "}
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
                        fontSize: "1.1rem",
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
            <div></div>
          </div>

          <div className={styles.column}>
            <span>Quantity</span>
            <CartCounter
              CartAddLoad={CartAddLoad}
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

      <div className={`${styles.product}   ${styles.forMobile} ` }>
        <div className={styles.content}>
          <div className={styles.product2}>
            <img
              className={styles.photoIcon}
              src={product?.images[0]}
              alt="product"
            />
            <div className={styles.productContent}>
              <div className={styles.productName}>
                {/* <div className={styles.springCollection}>Spring Collection</div> */}
                <div className={styles.mensUaStorm}>{product.name}</div>
              </div>
              <div className={styles.frameParent}>
                <div className={styles.frameGroup}>
                {item?.variant?.options.length
                  ? item?.variant?.options?.map((variantItem, index) => (
                      <div
                        key={index + variantItem?.id}
                        className={styles.row}
                        style={{ gap: "0" }}
                      >
                      
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
              id={item.id}
              ProductId={product?.id}
              variantId={variant?.id}
            />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.parent}>
            <div className={styles.div}><div>
                {" "}
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
                        fontSize: "1.1rem",
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
              </div></div>
            <div className={""}>
            <CartCounter
              CartAddLoad={CartAddLoad}
              increment={increment}
              decrement={decrement}
              count={productCount}
            />
            </div>
            <div className={styles.div2}   style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#1B1B1B",
                      }}>
            EGP{totalPrice}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

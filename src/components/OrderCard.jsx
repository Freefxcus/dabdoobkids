import React from "react";
import styles from "../styles/components/OrderCard.module.css";
import lady from "../images/lady.png";
import DeleteModal from "./cart/DeleteModal";
import Counter from "./singleProduct/counter";
import CartCounter from "./cart/CartCounter";
import EditModal from "./cart/EditModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utils/apiCalls";
import { cartActions } from "../Redux/store";
export default function OrderCard({
  editable,
  item,
  allCarts,
  setCartChanged,
  totalPrice,
}) {
  console.log(item, "item123123");

  const { product, variant } = item;

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const dispatch = useDispatch();
  const [productCount, setProductCount] = React.useState(item.count);
  const total = productCount * +product.price;
  const cart = useSelector((state) => state.cart.value);

  const increment = () => {
    setProductCount((prev) => prev + 1);
    let NewCarts = cart
      ?.filter((itemCart) =>
        +itemCart?.product != +item.product.id 
      )
    ;
    dispatch(
      cartActions.add({
        product: item?.product?.id,
        count: productCount + 1,
        variant: item?.variant?.id,
      })
    );
  

    addToCart([
      ...NewCarts,
      {
        product: item?.product?.id,
        count: productCount + 1,
        variant: item?.variant?.id,
      },
    ]);
  };
  const decrement = () => {
    setProductCount((prev) => prev - 1);
    let NewCarts = cart
    ?.filter((itemCart) =>
      +itemCart?.product != +item.product.id 
    )
  ;
  dispatch(
    cartActions.add({
      product: item?.product?.id,
      count: productCount - 1,
      variant: item?.variant?.id,
    })
  );


  addToCart([
    ...NewCarts,
    {
      product: item?.product?.id,
      count: productCount - 1,
      variant: item?.variant?.id,
    },
  ]);
  };
  return (
    // <div className={styles.container}>
    <div style={{ display: "flex", flexDirection: "column" }}>
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
          <img src={product?.images[0]} alt="product" className={styles.img} />
          <div className={styles.column}>
            <div className={styles.column}>
              <div className={styles.category}>Spring Collection</div>
              <div className={styles.title}>{product.name}</div>
            </div>
            <div className={`${styles.row} ${styles.subtitle}`}>
              <div></div>

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
            ProductId={product?.id}
            variantId={variant?.id}
            setCartChanged={setCartChanged}
          />
        </div>
        {/* <div className={styles.number} style={{ marginLeft: "auto" }}> */}
        <div className={styles.column}>
          <span>price</span>
          <div style={{ alignSelf: "center" }} className={styles.number}>
            <div>{productCount}</div>
            <div>x</div>
            <div>{+product.price}$</div>
          </div>
          <div></div>
        </div>

        <div className={styles.column}>
          <span>Quantity</span>
          <CartCounter
            increment={increment}
            decrement={decrement}
            count={productCount}
          />
          <div></div>
        </div>

        <div className={styles.column}>
          <span>SubTotal</span>
          <div className={styles.total}>{total}$</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

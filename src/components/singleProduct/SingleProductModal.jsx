import { Box, Modal } from "@mui/material";
import Counter from "./counter";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAddToCartMutation } from "../../Redux/cartApi";
import { notifyError, notifySuccess } from "../../utils/general";

export default function SingleProductModal({
  open,
  cartItems,
  handleClose,
  productDetails,
  selectedVariantObject,
}) {
  const navigate = useNavigate();

  const [count, setCount] = useState(1);

  let itemForCart = cartItems?.find(
    (cartItem) =>
      cartItem?.product.id == productDetails?.id &&
      cartItem?.variant?.id == selectedVariantObject?.id
  );
  const [addToCart, { isLoading: CartAddLoad }] = useAddToCartMutation();

  const handleUpdateQuantity = async () => {
    let newCount = itemForCart ? Math.trunc(count - itemForCart.count) : count;
    if (newCount === 0) return 0;
    let item = [
      {
        product: +productDetails?.id,
        count: newCount,
        variant: selectedVariantObject?.id,
      },
    ];
    try {
      const response = await addToCart(item).unwrap();
      const message = `Updated Item to cart!`;
      notifySuccess(message);
    } catch (error) {
      const errorMessage = "Failed to Updated to cart";
      // notifyError(errorMessage);
    }
  };

  useEffect(() => {
    let itemForCart = cartItems?.find(
      (cartItem) =>
        cartItem?.product.id == productDetails?.id &&
        cartItem?.variant?.id == selectedVariantObject?.id
    );
    setCount(itemForCart?.count);
  }, [cartItems]);
  useEffect(() => {
    handleUpdateQuantity();
  }, [count]);
  return (
    <Modal open={open}>
      <Box>
        <Box sx={style}>
          <div
            style={{
              width: "100%",
              margin: "6px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ marginBottom: "16px", fontWeight: "500" }}>
                Added to Cart
              </h2>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleClose(false)}
              >
                x
              </span>
            </div>
            <div style={{ display: "flex", width: "100%", gap: "8px" }}>
              <img
                style={{ width: "116px", height: "150px", flex: 1 }}
                src={productDetails?.images[0]}
                alt="product"
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 2,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {productDetails?.name}
                  </h2>
                </div>
                <div>
                  <h5
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      whiteSpace: "pre-wrap",
                      color: "var(--placeholder-text)",
                    }}
                  >
                    {productDetails?.description}
                  </h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Counter
                    setCount={setCount}
                    count={+count}
                    handleUpdateQuantity={handleUpdateQuantity}
                    item={productDetails}
                    CartAddLoad={CartAddLoad}
                    selectedVariantObject={selectedVariantObject}
                  />
                  <h3>
                    {+selectedVariantObject?.price || +productDetails?.price}$
                  </h3>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <h2>Subtotal</h2>
              <h2>
                {count
                  ? Math.trunc(
                      +count *
                        (+selectedVariantObject?.price ||
                          +productDetails?.price)
                    )
                  : null}
                $
              </h2>
            </div>

            <p style={{ marginTop: "16px" }}>
              Taxes and shipping fee will be calculated at checkout
            </p>

            <div
              style={{
                display: "flex",
                gap: "32px",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--errie-black)",
                  padding: "12px 32px",
                  fontWeight: "400",
                  fontSize: "18px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/cart");
                  handleClose(false);
                }}
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  navigate("/checkout");
                  handleClose(false);
                }}
                style={{
                  backgroundColor: "var(--brown)",
                  color: "white",
                  border: "none",
                  padding: "12px 32px",
                  fontWeight: "400",
                  fontSize: "18px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </Box>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  bgcolor: "background.paper",

  boxShadow: 24,
  borderRadius: "10px",

  p: 4,
};

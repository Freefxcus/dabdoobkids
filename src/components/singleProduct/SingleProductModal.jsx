import { Box, Modal } from "@mui/material";
import Counter from "./counter";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAddToCartMutation } from "../../Redux/cartApi";
import { calcDiscount, notifyError, notifySuccess } from "../../utils/general";
import { TickCircle } from "iconsax-react";

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

  const finalPrice = calcDiscount(selectedVariantObject, productDetails);

  return (
    <Modal open={open}>
      <Box>
        <Box sx={style}>
          <Box
            sx={{
              width:  "clamp(15rem, 80vw, 30rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #aaaaaa33",
                height: "auto",
              }}
            >
              <h2
                style={{
                  marginBottom: "16px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TickCircle size="32" color="#039855" variant="Bulk" /> Added to
                Cart
              </h2>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleClose(false)}
              >
                x
              </span>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "8px",
                marginTop: "14px",
              }}
            >
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
                  flex: 3,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontWeight: "500",
                      color: "rgba(27, 27, 27, 0.70)",
                      fontSize: " 0.875rem",
                    }}
                  >
                    {productDetails?.category?.name}
                  </h2>

                  <h2
                    style={{
                      fontWeight: "600",
                      color: "#1B1B1B",
                      fontSize: "1rem",
                    }}
                  >
                    {productDetails?.name}
                  </h2>
                </div>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "100%",
                    gap: "5px",
                    maxHeight: { sx: "auto", sm: "1.875rem" },
                    fontWeight: "800",
                    color: "#1B1B1B",
                    fontSize: "1rem",
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
                  <Box
                    component={"h5"}
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "1rem" },
                      whiteSpace: "nowrap",
                      display: "flex",
                      px: "0.3rem",
                      gap: "0.5rem",
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    {finalPrice?.discount ? (
                      <>
                        <span style={{ whiteSpace: "nowrap" }}>
                          EGP {finalPrice.priceAfter}
                        </span>{" "}
                        <Box
                          component={"s"}
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "0.5rem", sm: "0.75rem" },
                            fontWeight: "500",
                            color: "var(--grey-text)",
                          }}
                        >
                          EGP {finalPrice.price}{" "}
                        </Box>
                      </>
                    ) : (
                      <span>EGP {finalPrice.price}</span>
                    )}
                  </Box>
                </Box>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
                fontSize: "1.25rem",
              }}
            >
              <h4
                style={{
                  fontSize: "1.25rem",
                }}
              >
                Subtotal
              </h4>
              <h4
                style={{
                  fontSize: "1.25rem",
                }}
              >
                {count
                  ? Math.trunc(
                      +count *
                        +(finalPrice?.discount
                          ? finalPrice.priceAfter
                          : finalPrice.price)
                    )
                  : null}
                EGP
              </h4>
            </div>

            <p style={{ marginTop: "16px" }}>
              Taxes and shipping fee will be calculated at checkout
            </p>

            <Box
              sx={{
                display: "flex",
                gap: { sm: "32px", xs: "16px" },
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Box
                component={"button"}
                sx={{
                  backgroundColor: "white",
                  border: "1px solid var(--errie-black)",
                  padding: { sm: "12px 32px", xs: "8px 12px" },
                  fontWeight: "400",
                  fontSize: "18px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  flex: "1 1 0%",
                }}
                onClick={() => {
                  navigate("/cart");
                  handleClose(false);
                }}
              >
                View Cart
              </Box>
              <Box
                component={"button"}
                sx={{
                  backgroundColor: "var(--brown)",
                  color: "white",
                  border: "none",

                  padding: { sm: "12px 32px", xs: "8px 12px" },
                  fontWeight: "400",
                  fontSize: "18px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  flex: "1 1 0%",
                }}
                onClick={() => {
                  navigate("/checkout");
                  handleClose(false);
                }}
              >
                Checkout
              </Box>
            </Box>
          </Box>
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

  p: "1.5rem 1.25rem",
};

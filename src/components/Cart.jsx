import LinearProgress from "@mui/material/LinearProgress";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/Cart.module.css";

import { Box } from "@mui/material";
import {
  useDeleteAllCartMutation,
  useGetAllCartsQuery,
} from "../Redux/cartApi";
import { newCalcDiscount } from "../utils/general";
import SideCartCard from "./cart/SideCartCard";
import CartProgress from "./CartProgress";

export default function Cart({ toggleDrawer }) {
  const navigate = useNavigate();
  const [useWallet, setUseWallet] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const { data: cartData, isLoading } = useGetAllCartsQuery();
  const cartItems = cartData?.data || [];

  const [deleteAllCart] = useDeleteAllCartMutation();

  const totalPrice = useMemo(() => {
    return (
      cartItems?.reduce((acc, item) => {
        return acc + newCalcDiscount(item).totalPrice;
      }, 0) || 0
    );
  }, [cartItems]);

  const percentage = (totalPrice / 3500) * 100;
  const handleCheckout = () => {
    const searchParams = new URLSearchParams({
      useWallet,
      promocode,
      paymentMethod,
    });
    navigate(`/checkout?${searchParams.toString()}`);
  };
  return (
    <div className={styles["container-cart"]}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        <div style={{ cursor: "pointer" }}>Your cart</div>
        <div
          style={{ color: "var(--error)", cursor: "pointer" }}
          onClick={deleteAllCart}
        >
          Clear all
        </div>
      </div>

      <Box sx={{ mb: "24px" }}>
        <CartProgress percentage={percentage} value={totalPrice} />
      </Box>
      {cartItems == undefined ||
        (!cartItems && (
          <div
            style={{
              width: "80%",
              color: "var(--brown)",
              fontSize: "20px",
              marginTop: "30px",
            }}
          >
            No items in your cart!
          </div>
        ))}
      {isLoading && (
        <div style={{ width: "80%", color: "var(--brown)" }} spacing={2}>
          <LinearProgress color="inherit" />
        </div>
      )}
      {cartItems?.length > 0 && (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {cartItems.map((item) => (
              <SideCartCard item={item} key={item.id} />
            ))}
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <div>Subtotal</div>
            <div>
              {/* {!checkout?.status && !isChecking && <div>.......</div>}
              {checkout?.status && <div>EGP 3.010.00</div>}
              {isChecking && (
                <div
                  style={{ width: "100px", color: "var(--brown)" }}
                  spacing={2}
                >
                  <LinearProgress color="inherit" />
                </div>
              )} */}
              {totalPrice}EGP
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              fontWeight: "500",
              color: "#1B1B1BB2",
            }}
          >
            Taxes and shipping fee will be calculated at checkout
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => {
                navigate("/cart");
                toggleDrawer();
              }}
              style={{
                cursor: "pointer",
                width: "150px",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: "var(--white)",
                color: "var(--black)",
                border: "1px solid var(--black)",
              }}
            >
              View cart
            </button>
            <button
              style={{
                cursor: "pointer",
                width: "150px",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: "var(--brown)",
                color: "var(--white)",
                border: "1px solid var(--brown)",
              }}
              onClick={() => {
                handleCheckout();
                toggleDrawer();
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

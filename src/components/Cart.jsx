import { useState, useEffect, useMemo } from "react";
import {
  getCart,
  orderCheckout,
  emptyCart,
  orderSummary,
} from "../utils/apiCalls";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "../styles/components/Cart.module.css";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useNavigate, useSearchParams } from "react-router-dom";
import { use } from "i18next";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/store";
import { Box } from "@mui/material";
import CartProgress from "./CartProgress";
import { useGetAllCartsQuery } from "../Redux/cartApi";

export default function Cart({ toggleDrawer }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState({});
  const [isChecking, seIsChecking] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const dispatch = useDispatch();
  const { data: cartData,isLoading } = useGetAllCartsQuery();
  const cartItems = cartData?.data || [];
 

  const totalPrice = useMemo(() => {
    return cartItems?.reduce(
      (acc, item) => acc + item?.count *(+item?.variant?.price ||+item?.product?.price),
      0
    )||0;
  }, [cartItems,isLoading]);
  
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
          onClick={() => {
            setCart([]);
            emptyCart().then(() => {
              setCart(undefined);
              seIsChecking(false);
            });
            dispatch(cartActions.clearCart());
            toggleDrawer();
          }}
        >
          Clear all
        </div>
      </div>

      <Box sx={{ mb: "24px" }}>
        <CartProgress percentage={percentage} value={totalPrice} />
      </Box>
      {cartItems == undefined ||!cartItems&& (
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
      )}
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
                          color: "#1B1B1BB2",
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
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "800",
                        }}
                      >
                        {item.count}X
                      </div>
                      <div>
                        <span
                          style={{
                            color: "#1B1B1BB2",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          {+item?.variant?.price ||+item?.product?.price}
                        </span>
                        &nbsp; &nbsp;
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "800",
                          }}
                        >
                          $ {item.totalPrice}
                        </span>
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
              {checkout?.status && <div>$ 3.010.00</div>}
              {isChecking && (
                <div
                  style={{ width: "100px", color: "var(--brown)" }}
                  spacing={2}
                >
                  <LinearProgress color="inherit" />
                </div>
              )} */}
              {totalPrice}$
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
            onClick={() => {
              setUseWallet((prev) => !prev);
            }}
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
          >
            <Checkbox
              // checked={checked}
              checked={useWallet}
              sx={{
                // color: pink[800],
                padding: 0,
                "&.Mui-checked": {
                  color: "var(--brown)",
                },
              }}
            />
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#1B1B1BB2",
              }}
            >
              Use Wallet
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-end",
            }}
          >
            <FormControl sx={{ minWidth: 180, mt: "20px" }} size="small">
              <InputLabel id="demo-select-small-label">
                Payment Method
              </InputLabel>
              <Select
                disabled={useWallet}
                size="small"
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={paymentMethod}
                label="Payment Method"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Promocode"
              variant="outlined"
              size="small"
              sx={{ width: 180 }}
              value={promocode}
              onChange={(e) => {
                setPromocode(e.target.value);
              }}
            />
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

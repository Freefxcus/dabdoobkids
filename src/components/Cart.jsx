import { useState, useEffect } from "react";
import { getCart, orderCheckout, emptyCart } from "../utils/apiCalls";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "../styles/components/Cart.modules.css";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState({});
  console.log("checkout:", checkout);
  const [isChecking, seIsChecking] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  useEffect(() => {
    getCart().then((res) => {
      console.log(res);
      console.log(res?.items);
      setCart(res?.items);
    });
  }, []);
  return (
    <div
      style={{
        margin: "30px",
        width: "400px",
      }}
    >
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
          }}
        >
          Clear all
        </div>
      </div>
      {cart === undefined && (
        <div
          style={{
            width: "100%",
            color: "var(--brown)",
            fontSize: "20px",
            marginTop: "30px",
          }}
        >
          No items in your cart!
        </div>
      )}
      {cart?.length === 0 && (
        <div style={{ width: "100%", color: "var(--brown)" }} spacing={2}>
          <LinearProgress color="inherit" />
        </div>
      )}
      {cart?.length > 0 && (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {cart.map((item) => (
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
                      width: "400px",
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
                        {item.product.name.en}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        {item.product.description.en}
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
                        {/* <span
                          style={{
                            color: "#1B1B1BB2",
                            fontSize: "16px",
                            fontWeight: "600",
                            textDecoration: "line-through",
                          }}
                        >
                          $ 900
                        </span>
                        &nbsp; &nbsp; */}
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
                    width: "100%",
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
              {!checkout?.status && !isChecking && <div>.......</div>}
              {checkout?.status && <div>$ 3.010.00</div>}
              {isChecking && (
                <div
                  style={{ width: "100px", color: "var(--brown)" }}
                  spacing={2}
                >
                  <LinearProgress color="inherit" />
                </div>
              )}
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
              marginTop: "20px",
            }}
          >
            <button
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
                seIsChecking(true);
                orderCheckout(promocode, useWallet, paymentMethod)
                  .then((res) => {
                    console.log(res);
                    setCheckout(res);
                    seIsChecking(false);
                  })
                  .catch((err) => {
                    // console.log(err);
                    // alert(err);
                    seIsChecking(false);
                    setPromocode("");
                  });
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
import { useEffect, useState } from "react";
import styles from "../styles/pages/Cart.module.css";
import promo from "../images/promo.png";
import x from "../images/x.png";
import add from "../images/add.png";
import edit from "../images/edit.png";
import fedex from "../images/fedex.png";
import dabdobkidz from "../images/dabdobkidz.png";
import OrderCard from "../components/OrderCard";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Popup from "../components/Popup";
import { useSelector } from "react-redux";
import { getCart } from "../utils/apiCalls";
import { use } from "i18next";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const navigate = useNavigate();
  const [promocode, setPromocode] = useState("");

  const [open, setOpen] = useState(false);
  const [cartChanged, setCartChanged] = useState(false);
  const [address, setAddress] = useState({});
  const [paymentOption, setPaymentOption] = useState("Credit Card"); // "Cash on Delivery"

  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      setCart(cart);
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      setCart(cart);
    };
    fetchCart();
  }, [cartChanged]);

  console.log(cart, "cart123123123");
  const totalPrice = cart?.items?.reduce(
    (acc, item) => acc + item.variant.price * item.count,
    0
  );
  return (
    <div className={`${styles.container} padding-container`}>
      <Popup open={open} setOpen={setOpen} type="create_address" />
      <div className={styles.column}>
        <div className={styles.title_main}>Summary Order</div>
        {cart?.items?.map((item) => (
          <OrderCard
            item={item}
            editable={true}
            setCartChanged={setCartChanged}
            totalPrice={totalPrice}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <p style={{ flex: "2" }}>
          Taxes and shipping fee will be calculated at checkout
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between ",
            flex: "1",
          }}
        >
          <h2>Subtotal</h2>
          <h2>{totalPrice}</h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          gap: "12px",
        }}
      >
        <button
          style={{
            backgroundColor: "white",
            border: "1px solid var(--errie-black)",
            padding: "12px 32px",
            fontWeight: "600",
            fontSize: "18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Continue Shopping
        </button>
        <button
          onClick={() => {
            navigate("/checkout");
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
  );
}

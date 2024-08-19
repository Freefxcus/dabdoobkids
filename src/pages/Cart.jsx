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
import CartProgress from "../components/CartProgress";
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
  const totalPrice = cart?.reduce(
    (acc, item) => acc + ((+item.product.price )* item.count),
    0
  );
  const generateDiscountMesage = (totalPrice) => {
    if (totalPrice < 3500) {
      return "Add more items to your cart to get discount";
    }
    const requiredPriceForDiscount = (totalPrice / 3500) * 100;
    if (requiredPriceForDiscount > 50 && requiredPriceForDiscount < 100) {
      return "you are almost there! Add more items to get discount";
    }
    if (requiredPriceForDiscount >= 100) {
      return "Congratulations! You are eligible for discount";
    }
  };
  const requiredPriceForDiscount = (totalPrice / 3500) * 100;
  const messageforDiscount = generateDiscountMesage(totalPrice);
  if (!cart) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img src="/empty-wishlist.svg" alt="empy cart" />
        <h2>Empty Cart</h2>
        <p>Looks like you haven't added any products to your Cart yet.</p>
        <button
          onClick={() => {
            navigate("/");
          }}
          style={{
            backgroundColor: "var(--brown)",
            color: "white",
            border: "none",
            padding: "12px 48px",
            fontWeight: "400",
            fontSize: "18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          continue shopping
        </button>
      </div>
    );
  }
   
  return (
    <div
      style={{ minHeight: "54vh" }}
      className={`${styles.container} padding-container`}
    >
      <Popup open={open} setOpen={setOpen} type="create_address" />
      <div className={styles.column}>
        <div className={styles.title_main}>My Shopping Cart </div>
        <div style={{ margin: "0px auto" }}>
            <CartProgress
              value={totalPrice}
              percentage={requiredPriceForDiscount}
            />
          <h4 style={{ textAlign: "center", marginTop: "12px" }}>
            {messageforDiscount}
          </h4>
        </div>
        {cart?.map((item) => (
          <OrderCard
            item={item}
            editable={true}
            allCarts={cart}
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
          flexWrap: "wrap",
          backgroundColor: "#FAFAFA",
          padding: "12px",
        }}
      >
        <p style={{ flex: "2" }}>
          Taxes and shipping fee will be calculated at checkout
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between ",
            flexWrap: "wrap",
            flex: "1",
            gap: "12px",
          }}
        >
          <h2>Subtotal</h2>
          <h2>{totalPrice}$</h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          gap: "12px",
          flexWrap: "wrap",
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

import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProgress from "../../components/CartProgress";
import OrderCard from "../../components/OrderCard";
import Popup from "../../components/Popup";
import { useGetAllCartsQuery } from "../../Redux/cartApi";
import styles from "../../styles/pages/Cart.module.css";
import { calcDiscount, newCalcDiscount } from "../../utils/general";
export default function Cart() {
  const navigate = useNavigate();
  const [promocode, setPromocode] = useState("");

  const [open, setOpen] = useState(false);

  const [address, setAddress] = useState({});
  const [paymentOption, setPaymentOption] = useState("Credit Card"); // "Cash on Delivery"
  const { data: cartData } = useGetAllCartsQuery();
  const cartItems = cartData?.data || [];

  const totalPrice = useMemo(() => {
    return (
      cartItems?.reduce((acc, item) => {
        return acc + newCalcDiscount(item).totalPrice;
      }, 0) || 0
    );
  }, [cartItems]);

  const generateDiscountMesage = (totalPrice) => {
    if (totalPrice < 3500) {
      return "Add more items to your cart to get Free Shipping";
    }
    const requiredPriceForDiscount = (totalPrice / 3500) * 100;
    if (requiredPriceForDiscount > 50 && requiredPriceForDiscount < 100) {
      return "you are almost there! Add more items to get Free Shipping";
    }
    if (requiredPriceForDiscount >= 100) {
      return "Congratulations! You are eligible for Free Shipping";
    }
  };

  const requiredPriceForDiscount = (totalPrice / 3500) * 100;
  const messageforDiscount = generateDiscountMesage(totalPrice);

  if (!cartItems?.length) {
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
      className={`${styles.container} padding-container container`}
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
        {/* <div >
          <div
            className={stylesComponent.container}
            style={{
              justifyContent: "space-between",
              paddingBottom: "20px",
              borderBottom: " 0.5px solid #E8E8E8",
            }}
          >
            <div className={stylesComponent.column}>Product</div>
            <div className={stylesComponent.column}>
              <span></span>
            </div>
            <div className={stylesComponent.column}>
              <span></span>
            </div>
            <div className={stylesComponent.column}>
              <span>price</span>
            </div>

            <div className={stylesComponent.column}>
              <span>Quantity</span>
            </div>

            <div className={stylesComponent.column}>
              <span>SubTotal</span>
            </div>
          </div>
        </div> */}
        {cartItems?.map((item) => (
          <OrderCard
            item={item}
            key={item.id}
            editable={true}
            allCarts={cartItems}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between ",
            flexWrap: "wrap",
            flex: "1",
            gap: "12px",
            fontSize: { md: "1rem", xs: "0.75rem" },
          }}
        >
          <h2>Subtotal</h2>
          <h2>{totalPrice}EGP</h2>
        </Box>
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
        <Box
          component={"button"}
          sx={{
            backgroundColor: "white",
            border: "1px solid var(--errie-black)",
            padding: { md: "12px 32px", xs: "8px 16px" },
            fontWeight: "400",
            fontSize: { md: "1.2rem", xs: "1rem" },
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Continue Shopping
        </Box>
        <Box
          component={"button"}
          sx={{
            backgroundColor: "var(--brown)",
            color: "white",
            border: "none",
            padding: { md: "12px 32px", xs: "8px 16px" },
            fontWeight: "400",
            fontSize: { md: "1.2rem", xs: "1rem" },
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Checkout
        </Box>
      </div>
    </div>
  );
}

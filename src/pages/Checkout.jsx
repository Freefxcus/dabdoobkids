import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getAddress,
  getCart,
  orderCheckout,
  orderSummary,
} from "../utils/apiCalls";
import ConfirmPayment from "../components/checkout/ConfirmPayment";
import BillingDetails from "../components/checkout/BillingDetails";
import { Box } from "@mui/material";
import SummaryOrderProductCard from "../components/checkout/SummaryOrderProductCard";
export default function Checkout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [payemntMethod, setPaymentMethod] = useState(
    searchParams.get("paymentMethod") || "cash"
  );
  const [promoCode, setPromoCode] = useState(
    searchParams.get("promocode") || ""
  );
  const [addressActive, setAddressActive] = useState(null);

  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getCart();
      setCart(cartData);
    };

    const fetchAddress = async () => {
      const addressData = await getAddress();
      setAddress(addressData);
      setAddressActive(
        addressData?.items?.length
          ? addressData?.items?.filter((item) => item?.primary).id ||
              addressData?.items?.[0]?.id
          : null
      );
    };

    fetchCart();
    fetchAddress();
  }, []);

  useEffect(() => {
    if (!searchParams.get("paymentMethod")) {
      setSearchParams((prev) => {
        prev.set("paymentMethod", "Cash on Delivery");
        return prev;
      });
    }
  }, []);

  useEffect(() => {
    const data = {
      promocode: promoCode,
      useWallet: payemntMethod === "wallet",
      paymentMethod: payemntMethod,
      address: address?.items?.[0]?.id,
    };
    const fetchOrder = async () => {
      const orderData = await orderSummary(data);
      setOrder(orderData);
    };
    fetchOrder();
  }, [address?.items, payemntMethod, promoCode]);
  console.log(order, "orderrrrr123123");

  return (
    <div
      style={{
        display: "flex",
        gap: "52px",
        justifyContent: "center",
        flexWrap: "wrap",
        background: "#FAFAFA",
        paddingTop: "50px",
        paddingBottom: "100px",
      }}
      className="padding-container"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          flex: 3,

        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "500" }}>Summary Order</h1>

        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "12px",
          }}
        >
          {" "}
          {cart?.map((item) => (
          <SummaryOrderProductCard item={item} key={item.id} />
          ))}
        </Box>
        <BillingDetails
          address={address}
          addressActive={addressActive}
          setAddressActive={setAddressActive}
        />
      </div>

      <ConfirmPayment
        address={address}
        addressActive={addressActive}
        orderSummary={order}
      />
    </div>
  );
}

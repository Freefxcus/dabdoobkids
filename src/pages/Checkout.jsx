import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import BillingDetails from "../components/checkout/BillingDetails";
import ConfirmPayment from "../components/checkout/ConfirmPayment";
import SummaryOrderProductCard from "../components/checkout/SummaryOrderProductCard";
import { userInfoActions } from "../Redux/store";
import {
  authorize,
  getAddress,
  getCart,
  orderSummary,
} from "../utils/apiCalls";
import instance from "../utils/interceptor";
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
  const [DataSubmit, setDataSubmit] = useState();
  const [phone, setPhone] = useState("");
  const [ForceReload, setForceReload] = useState(false);
  const [isUseWallet, setIsUseWallet] = useState(
    searchParams.get("useWallet") || false
  );
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
  }, [ForceReload]);

  //* profile
  const dispatch = useDispatch();
  useEffect(() => {
    instance
      .get("/profile", {
        // params: { page: 1 },
      })
      .then((response) => {
        dispatch(userInfoActions.update(response.data?.data));
      })
      .catch((err) => {
        if (err === "Unauthorized") authorize(setForceReload);
      });
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
      useWallet: isUseWallet,
      paymentMethod: searchParams.get("paymentMethod"),
      address: address?.items?.[0]?.id,
      phone: phone,
    };
    setDataSubmit(data);
  }, [
    address?.items,
    payemntMethod,
    promoCode,
    searchParams,
    phone,
    isUseWallet,
  ]);

  useEffect(() => {
    const data = {
      promocode: promoCode,
      useWallet: isUseWallet,
      paymentMethod: searchParams.get("paymentMethod"),
      address: address?.items?.[0]?.id,
      phone: phone,
    };
    setDataSubmit(data);
    const fetchOrder = async () => {
      const orderData = await orderSummary(data);
      setOrder(orderData);
    };
    fetchOrder();
  }, [address?.items, payemntMethod, promoCode, searchParams, isUseWallet]);

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
          {cart?.map((item) => (
            <SummaryOrderProductCard item={item} key={item.id} />
          ))}
        </Box>
        <BillingDetails
          address={address}
          addressActive={addressActive}
          setAddressActive={setAddressActive}
          phone={phone}
          setPhone={setPhone}
          ForceReload={ForceReload}
          setForceReload={setForceReload}
        />
      </div>

      <ConfirmPayment
        address={address}
        addressActive={addressActive}
        orderSummary={order}
        promoCodeMain={promoCode}
        setPromoCodeMain={setPromoCode}
        isUseWallet={isUseWallet}
        DataSubmit={DataSubmit}
        setIsUseWallet={setIsUseWallet}
        cartItems={cart}
      />
    </div>
  );
}

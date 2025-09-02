// src/pages/Checkout.jsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";

import BillingDetails from "../components/checkout/BillingDetails";
import ConfirmPayment from "../components/checkout/ConfirmPayment.jsx";
import SummaryOrderProductCard from "../components/checkout/SummaryOrderProductCard";

import { userInfoActions } from "../Redux/store";
import { authorize, getAddress, getCart, orderSummary } from "../utils/apiCalls";
import instance from "../utils/interceptor";

/** Normalize any incoming query string into your internal enum-ish values */
const normalizeMethod = (m) => {
  if (!m) return "COD";
  const x = String(m).toLowerCase();
  if (x.includes("cod") || x.includes("cash")) return "COD";
  if (x.includes("card") || x.includes("credit")) return "CARD";
  if (x.includes("wallet")) return "WALLET";
  if (x.includes("valu")) return "VALU";
  if (x.includes("kiosk") || x.includes("fawry")) return "KIOSK";
  return "COD";
};

export default function Checkout() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Query params (safe parsing)
  const qpPayment = useMemo(
    () => normalizeMethod(searchParams.get("paymentMethod")),
    [searchParams]
  );
  const qpPromo = useMemo(() => searchParams.get("promocode") || "", [searchParams]);
  const qpUseWallet = useMemo(
    () => searchParams.get("useWallet") === "true",
    [searchParams]
  );

  // Local state
  const [paymentMethod, setPaymentMethod] = useState(qpPayment || "COD");
  const [promoCode, setPromoCode] = useState(qpPromo);
  const [isUseWallet, setIsUseWallet] = useState(qpUseWallet);

  const [addressActive, setAddressActive] = useState(null);
  const [address, setAddress] = useState({ items: [] });

  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  const [phone, setPhone] = useState("");
  const [forceReload, setForceReload] = useState(false);

  const dispatch = useDispatch();

  /** Ensure we always have a paymentMethod in the URL for consistency */
  useEffect(() => {
    if (!searchParams.get("paymentMethod")) {
      setSearchParams((prev) => {
        const sp = new URLSearchParams(prev);
        sp.set("paymentMethod", "COD");
        return sp;
      });
    }
  }, [searchParams, setSearchParams]);

  /** Keep local state in sync with query changes (if user modifies URL) */
  useEffect(() => {
    setPaymentMethod(qpPayment || "COD");
    setPromoCode(qpPromo || "");
    setIsUseWallet(qpUseWallet);
  }, [qpPayment, qpPromo, qpUseWallet]);

  /** Fetch cart + addresses */
  useEffect(() => {
    const load = async () => {
      try {
        const cartData = await getCart();
        setCart(Array.isArray(cartData) ? cartData : []);
      } catch (e) {
        console.error("Failed to load cart:", e);
        setCart([]);
      }

      try {
        const addressData = await getAddress();
        const items = addressData?.items ?? [];
        setAddress({ items });

        // Pick primary address if present, otherwise first, otherwise null
        const primary = items.find((it) => it?.primary);
        setAddressActive(primary?.id ?? items[0]?.id ?? null);
      } catch (e) {
        console.error("Failed to load addresses:", e);
        setAddress({ items: [] });
        setAddressActive(null);
      }
    };
    load();
  }, [forceReload]);

  /** Load profile (kept your original logic) */
  useEffect(() => {
    instance
      .get("/profile")
      .then((response) => {
        dispatch(userInfoActions.update(response.data?.data));
      })
      .catch((err) => {
        // authorize triggers login refresh if needed
        if (err === "Unauthorized") authorize(setForceReload);
      });
  }, [dispatch]);

  /** Build payload for summary + fetch order summary whenever inputs change */
  const dataSubmit = useMemo(() => {
    return {
      promocode: promoCode,
      useWallet: isUseWallet,
      paymentMethod, // normalized value (COD/CARD/WALLET/VALU/KIOSK)
      address: addressActive ?? address?.items?.[0]?.id ?? null,
      phone,
    };
  }, [promoCode, isUseWallet, paymentMethod, addressActive, address?.items, phone]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await orderSummary(dataSubmit);
        setOrder(orderData || null);
      } catch (e) {
        console.error("orderSummary failed:", e);
        setOrder(null);
      }
    };
    fetchOrder();
  }, [dataSubmit]);

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
          minWidth: 320,
          maxWidth: 900,
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 500 }}>Summary Order</h1>

        <Box sx={{ backgroundColor: "#fff", p: "24px", borderRadius: "12px" }}>
          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((item) => <SummaryOrderProductCard item={item} key={item.id} />)
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Box>

        <BillingDetails
          address={address}
          addressActive={addressActive}
          setAddressActive={setAddressActive}
          phone={phone}
          setPhone={setPhone}
          ForceReload={forceReload}
          setForceReload={setForceReload}
        />
      </div>

      <ConfirmPayment
        address={address}
        addressActive={addressActive}
        orderSummary={order}
        promoCodeMain={promoCode}
        setPromoCodeMain={(v) => {
          setPromoCode(v);
          setSearchParams((prev) => {
            const sp = new URLSearchParams(prev);
            if (v) sp.set("promocode", v);
            else sp.delete("promocode");
            return sp;
          });
        }}
        isUseWallet={isUseWallet}
        setIsUseWallet={(v) => {
          setIsUseWallet(!!v);
          setSearchParams((prev) => {
            const sp = new URLSearchParams(prev);
            sp.set("useWallet", !!v);
            return sp;
          });
        }}
        DataSubmit={dataSubmit}
        cartItems={cart}
        paymentMethod={paymentMethod}
        setPaymentMethod={(m) => {
          const nm = normalizeMethod(m);
          setPaymentMethod(nm);
          setSearchParams((prev) => {
            const sp = new URLSearchParams(prev);
            sp.set("paymentMethod", nm);
            return sp;
          });
        }}
      />
    </div>
  );
}

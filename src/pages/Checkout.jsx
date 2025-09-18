import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";

import BillingDetails from "../components/checkout/BillingDetails";
import ConfirmPayment from "../components/checkout/ConfirmPayment";
import SummaryOrderProductCard from "../components/checkout/SummaryOrderProductCard";

import { userInfoActions } from "../Redux/store";
import { authorize, getAddress, getCart, orderSummary } from "../utils/apiCalls";
import instance from "../utils/interceptor";

export default function Checkout() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  // ———————————————————————————————————
  // Local state
  // ———————————————————————————————————
  const [paymentMethod, setPaymentMethod] = useState(
    searchParams.get("paymentMethod") || "Cash on Delivery"
  );
  const [promoCode, setPromoCode] = useState(searchParams.get("promocode") || "");
  const [addressActive, setAddressActive] = useState(null);

  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState({ items: [] });

  const [phone, setPhone] = useState("");
  const [forceReload, setForceReload] = useState(false);

  // Treat query param "useWallet" as boolean
  const initialUseWalletParam = searchParams.get("useWallet");
  const [isUseWallet, setIsUseWallet] = useState(
    initialUseWalletParam === "true" || initialUseWalletParam === true
  );

  // Guard flag set by ConfirmPayment after success (we only read it here)
  const orderComplete = useMemo(
    () => sessionStorage.getItem("orderComplete") === "1",
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.key] // recompute when navigating
  );

  // ———————————————————————————————————
  // Helpers
  // ———————————————————————————————————
  const methodMap = {
    "Credit Card": "CARD",
    "Cash on Delivery": "COD",
    Wallet: "WALLET",
    ValU: "VALU",
  };

  const buildBody = (raw) => {
    const body = {
      useWallet: raw?.useWallet === true || raw?.useWallet === "true",
      paymentMethod: methodMap[raw?.paymentMethod] ?? raw?.paymentMethod,
      address: raw?.address, // expect address id
      promocode: raw?.promocode || undefined,
      phone: raw?.phone || undefined,
    };
    Object.keys(body).forEach((k) => body[k] === undefined && delete body[k]);
    return body;
  };

  // Keep DataSubmit in sync with form/searchParams
  const DataSubmit = useMemo(
    () => ({
      promocode: promoCode,
      useWallet: isUseWallet,
      paymentMethod: paymentMethod || searchParams.get("paymentMethod"),
      address: address?.items?.[0]?.id, // default to first address for now
      phone,
    }),
    [promoCode, isUseWallet, paymentMethod, searchParams, address?.items, phone]
  );

  // ———————————————————————————————————
  // Ensure paymentMethod query param exists for shareable URLs
  // ———————————————————————————————————
  useEffect(() => {
    if (!searchParams.get("paymentMethod")) {
      setSearchParams((prev) => {
        prev.set("paymentMethod", "Cash on Delivery");
        return prev;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep local state aligned with query param if it changes elsewhere
  useEffect(() => {
    const pm = searchParams.get("paymentMethod");
    if (pm && pm !== paymentMethod) setPaymentMethod(pm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // ———————————————————————————————————
  // Fetch profile (redux)
  // ———————————————————————————————————
  useEffect(() => {
    instance
      .get("/profile")
      .then((response) => {
        dispatch(userInfoActions.update(response.data?.data));
      })
      .catch((err) => {
        if (err === "Unauthorized") authorize(setForceReload);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ———————————————————————————————————
  // Fetch cart + addresses
  // ———————————————————————————————————
  useEffect(() => {
    let mounted = true;

    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        if (!mounted) return;
        // Support both array or {items: []}
        const items = Array.isArray(cartData) ? cartData : cartData?.items ?? [];
        setCart(items);
      } catch {
        if (mounted) setCart([]);
      }
    };

    const fetchAddress = async () => {
      try {
        const addressData = await getAddress();
        if (!mounted) return;
        const items = addressData?.items ?? [];
        setAddress({ items });

        // FIX: find primary else first
        const primary = items.find((it) => it?.primary);
        setAddressActive(primary?.id ?? items[0]?.id ?? null);
      } catch {
        if (mounted) {
          setAddress({ items: [] });
          setAddressActive(null);
        }
      }
    };

    fetchCart();
    fetchAddress();

    return () => {
      mounted = false;
    };
  }, [forceReload]);

  // ———————————————————————————————————
  // Fetch order summary (guarded + abortable)
  // ———————————————————————————————————
  useEffect(() => {
    const controller = new AbortController();

    // Guards: do not fetch summary if...
    if (orderComplete) return; // just completed an order
    if (location.pathname.toLowerCase().includes("thank")) return; // on thank-you route
    if (!Array.isArray(cart) || cart.length === 0) return; // cart empty
    if (!address?.items?.[0]?.id) return; // need a valid address id

    const run = async () => {
      try {
        const payload = buildBody({
          promocode: promoCode,
          useWallet: isUseWallet,
          paymentMethod, // UI label → enum via buildBody
          address: address?.items?.[0]?.id,
          phone,
        });

        const orderData = await orderSummary(payload, { signal: controller.signal });
        setOrder(orderData);
      } catch (err) {
        // Swallow "cart is empty" to avoid noisy UX if racing with a successful checkout
        const msg = err?.response?.data?.message || err?.message;
        if (msg && /cart is empty/i.test(String(msg))) return;

        // Ignore aborts
        if (err?.name === "CanceledError" || err?.name === "AbortError") return;

        // Otherwise, surface the error (optional: toast/log)
        // console.error("orderSummary error:", err);
      }
    };

    run();

    return () => controller.abort();
  }, [
    // deps that truly change the inputs to orderSummary:
    orderComplete,
    location.pathname,
    cart,
    address?.items,
    promoCode,
    isUseWallet,
    paymentMethod,
    phone,
  ]);

  // ———————————————————————————————————
  // Render
  // ———————————————————————————————————
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
          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((item) => <SummaryOrderProductCard item={item} key={item.id ?? item._id} />)
          ) : (
            <div style={{ opacity: 0.7, fontSize: 14 }}>Your cart is empty.</div>
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
        setPromoCodeMain={setPromoCode}
        isUseWallet={isUseWallet}
        DataSubmit={DataSubmit}
        setIsUseWallet={setIsUseWallet}
        cartItems={cart}
      />
    </div>
  );
}

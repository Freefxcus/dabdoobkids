import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteAllCartMutation } from "../../Redux/cartApi";

import {
  checkPromoCode,
  getUserPaymentLink,
  getWallet,
  orderCheckout,
} from "../../utils/apiCalls";
import "./style.css";
import { newCalcDiscount, notifySuccess,notifyError } from "../../utils/general";
import ModalPaymentLink from "./ModalPaymentLink";

export default function ConfirmPayment({
  orderSummary,
  address,           // { items: [...] }
  addressActive,     // selected address id from parent
  promoCodeMain,
  setPromoCodeMain,
  isUseWallet,
  setIsUseWallet,
  DataSubmit,        // { promocode, useWallet, paymentMethod, address, phone }
  cartItems = [],
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteAllCart] = useDeleteAllCartMutation();

  // ---------- helpers ----------
  const toApiPayment = (m) => {
    switch (m) {
      case "CARD":   return "Credit Card";
      case "COD":    return "Cash on Delivery";
      case "WALLET": return "E-Wallet";
      default:       return m || "Cash on Delivery";
    }
  };

  const normalizePayment = (raw) => {
    switch ((raw || "").toLowerCase()) {
      case "credit+card":
      case "credit_card":
      case "card":
        return "Credit Card";
      case "wallet":
        return "E-Wallet";
      case "valu":
        return "VALU";
      case "kiosk":
        return "KIOSK";
      case "cash":
      case "cod":
      case "cash on delivery":
        return "Cash on Delivery";
      default:
        return "Cash on Delivery";
    }
  };
  const parseBool = (v) => v === true || v === "true" || v === "1";

  // ---------- local state ----------
  const [paymentMethod, setPaymentMethod] = useState(
    normalizePayment(searchParams.get("paymentMethod") || "COD")
  );
  const [promoCode, setPromoCode] = useState(
    searchParams.get("promocode") || ""
  );
  const [promoSuccess, setPromoSuccess] = useState();
  const [paymentLink, setPaymentLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState();
  const [open, setOpen] = useState(false);

  const addrId = addressActive || address?.items?.[0]?.id || null;

  // keep URL sane on first load
  useEffect(() => {
    const sp = new URLSearchParams(searchParams);
    let changed = false;
    if (!sp.get("paymentMethod")) {
      sp.set("paymentMethod", paymentMethod);
      changed = true;
    }
    if (isUseWallet !== undefined && !sp.get("useWallet")) {
      sp.set("useWallet", String(!!isUseWallet));
      changed = true;
    }
    if (changed) setSearchParams(sp, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // read wallet once
  useEffect(() => {
    getWallet().then(setWallet).catch(() => {});
  }, []);

  // ---------- computed prices ----------
  const price = useMemo(() => {
    const totalPriceProduct = (cartItems || []).reduce(
      (acc, curr) => acc + newCalcDiscount(curr).totalPrice,
      0
    );

    const discount =
      promoSuccess?.type === "percentage"
        ? (totalPriceProduct * (promoSuccess?.amount || 0)) / 100
        : promoSuccess?.amount || 0;

    const maxedDiscount =
      promoSuccess?.maxAmount && discount > promoSuccess.maxAmount
        ? promoSuccess.maxAmount
        : discount;

    // shipping rule from your code: free > 3500 else from summary
    const shipping =
      totalPriceProduct - maxedDiscount > 3500
        ? 0
        : orderSummary?.data?.data?.shipping || 0;

    return {
      totalPriceProduct,           // items before discounts/shipping
      discount: maxedDiscount,     // effective discount
      shipping,
      totalDue: Math.max(
        0,
        totalPriceProduct - maxedDiscount + shipping
      ),
    };
  }, [cartItems, promoSuccess, orderSummary]);

  // ---------- promo ----------
  const validatePromoCode = async () => {
    const data = await checkPromoCode(promoCode);
    if (data?.data?.status === "success") {
      setPromoCodeMain(promoCode);
      const sp = new URLSearchParams(searchParams);
      sp.set("promocode", promoCode);
      setSearchParams(sp);
      setPromoSuccess(data?.data?.data);
    } else {
      setPromoSuccess(undefined);
      setPromoCodeMain("");
    }
  };

  const clearPromoCode = () => {
    setPromoCode("");
    const sp = new URLSearchParams(searchParams);
    sp.set("promocode", "");
    setSearchParams(sp);
    setPromoCodeMain("");
    setPromoSuccess(undefined);
  };

  // ---------- payment ----------
const handlePayment = async () => {
  // require a selected address
  if (!addrId) {
    notifyError("Please select an address before continuing.");
    return;
  }

  try {
    setLoading(true);

    // NOTE: you're already using human labels in state ("Credit Card" | "Cash on Delivery" | "E-Wallet")
    // so no need to re-map again here.
    const method = paymentMethod; // human label

    // ---- Online flows: "Credit Card" and "E-Wallet"
    if (method === "Credit Card" || method === "E-Wallet") {
      // 1) reuse cached link if exists
      const cached = JSON.parse(localStorage.getItem("paymentURL") || "null");
      if (cached?.link) {
        setPaymentLink(cached.link);   // string URL
        setOpen(true);                 // open modal (no handleOpenModal())
        return;
      }

      // 2) request a fresh link
      // If your backend needs an order first, call the correct API that creates the order+link.
      // Here we assume getUserPaymentLink returns { link }
      const linkResp = await getUserPaymentLink({
        orderId: orderSummary?.data?.data?.orderId,   // pass if available; harmless if undefined
        paymentMethod: method,                         // "Credit Card" | "E-Wallet"
        amount: price.totalDue,                        // optional; server can recalc
      });

      const url =
        linkResp?.link || linkResp?.data?.link || linkResp?.url || linkResp?.data?.url;

      if (!url) {
        notifyError("Server didn't return a payment URL.");
        return;
      }

      setPaymentLink(url);
      localStorage.setItem("paymentURL", JSON.stringify({ link: url }));
      notifySuccess("Redirecting to Payment Gateway");
      setOpen(true);
      return;
    }

    // ---- COD flow: place order directly
    if (method === "Cash on Delivery") {
      const payload = {
        // build payload explicitly; don't rely on stale DataSubmit
        promocode: promoCodeMain || undefined,
        useWallet: false,
        paymentMethod: "Cash on Delivery",
        address: Number(addrId),
        phone: undefined,
      };

      // IMPORTANT: call the function you actually import
      const res = await orderCheckout(payload);

      if (res?.data?.status === "success") {
        notifySuccess("Order Placed Successfully");
        await deleteAllCart();
        navigate("/");
        return;
      }

      // fallthrough: unexpected shape
      notifyError(res?.data?.message || "Checkout failed.");
      return;
    }

    // unsupported method (e.g., VALU/KIOSK if you wire them later)
    notifyError("Selected payment method is not supported yet.");
  } catch (e) {
    const msg =
      e?.response?.data?.message ||
      e?.message ||
      "Checkout failed.";
    console.error("[checkout] error:", msg, e?.response?.data);
    notifyError(msg);
  } finally {
    setLoading(false);
  }
};


  const disablePayBtn =
    loading ||
    !addrId ||
    (paymentMethod === "WALLET" && (!DataSubmit?.phone || DataSubmit.phone.length < 11));

  return (
    <Box sx={{ flex: 2, width: "70%" }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <h2>Price Summary</h2>

        {/* Wallet switch (kept commented like your file) */}
        {/* ... */}

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h3>Promo Code</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div className="input-code-container">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                type="text"
                className="btn input-code"
                placeholder="Enter Promo Code"
              />
              {promoSuccess ? (
                <CloseIcon onClick={clearPromoCode} className="btn-clear" />
              ) : null}
            </div>
            <button
              onClick={validatePromoCode}
              disabled={!promoCode || !!promoSuccess}
              className="btn promo-code"
            >
              Add
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ fontWeight: 500, fontSize: "16px" }}>SubTotal</h2>
            <h2 style={{ fontWeight: 500, fontSize: "16px" }}>
              {price.totalPriceProduct} EGP
            </h2>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ fontWeight: 500, fontSize: "16px" }}>Shipping</h2>
            <h2 style={{ fontWeight: 500, fontSize: "16px" }}>
              {price.shipping} EGP
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#444",
            }}
          >
            <h2 style={{ fontWeight: 500, fontSize: "16px" }}>Discount</h2>
            <h2 style={{ fontWeight: 500, fontSize: "16px" }}>
              {price.discount} EGP
            </h2>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ fontWeight: 500, fontSize: "16px" }}>Total Due</h2>
            <h2 style={{ fontWeight: 500, fontSize: "16px" }}>
              {price.totalDue} EGP
            </h2>
          </div>

          <div style={{ textAlign: "center", color: "#888" }}>
            {!addrId ? "please enter address" : null}
          </div>

          <button
            onClick={handlePayment}
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
            disabled={disablePayBtn}
          >
            {loading ? (
              <Stack
                direction="row"
                justifyContent={"center"}
                gap={2}
                alignItems={"center"}
              >
                <CircularProgress color="inherit" size="1rem" />
                Loading
              </Stack>
            ) : (
              "Continue to Payment"
            )}
          </button>
        </div>

        <ModalPaymentLink
          closeModal={() => setOpen(false)}
          open={open}
          paymentLink={paymentLink}
          addressInfo={
            address?.items?.find((item) => item.id === addrId) || {}
          }
          paymentAmount={price.totalDue}
          orderSummary={cartItems}
          paymentMethod={paymentMethod}
          price={price}
        />
      </Box>
    </Box>
  );
}

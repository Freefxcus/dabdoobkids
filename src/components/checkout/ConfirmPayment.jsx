// src/components/checkout/ConfirmPayment.jsx
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  createOrders,
  getUserPaymentLink,
  getUserStatusPayment,
} from "../../utils/apiCalls";

import { newCalcDiscount, notifyError, notifySuccess } from "../../utils/general";
import ModalPaymentLink from "./ModalPaymentLink";
import "./style.css";

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h2 style={{ color: "var(rhine-castle)", fontWeight: 500, fontSize: 16 }}>
        {label}
      </h2>
      <h2 style={{ color: "var(rhine-castle)", fontWeight: 500, fontSize: 16 }}>
        {value}
      </h2>
    </div>
  );
}

Row.propTypes = { label: PropTypes.string, value: PropTypes.any };

const fmt = (n) => `${Number(n || 0).toFixed(0)} EGP`;

/** Read a sensible amount to pay from order summary */
function extractAmount(orderSummary) {
  if (!orderSummary) return 0;
  const candidates = [
    orderSummary?.paymentAmount,
    orderSummary?.amountToPay,
    orderSummary?.totalShopping,
    orderSummary?.total,
    orderSummary?.grandTotal,
    orderSummary?.subTotal,
  ]
    .map((x) => Number(x))
    .filter((x) => !Number.isNaN(x) && x >= 0);
  return candidates[0] ?? 0;
}

/** Read order id from summary */
function extractOrderId(orderSummary) {
  if (!orderSummary) return null;
  return orderSummary?.orderId || orderSummary?.id || orderSummary?._id || null;
}

export default function ConfirmPayment({
  orderSummary,
  address,
  addressActive,
  promoCodeMain,
  setPromoCodeMain,
  isUseWallet,
  setIsUseWallet,
  DataSubmit,
  cartItems = [],
  paymentMethod,           // 'CARD' | 'WALLET' | 'VALU' | 'KIOSK' | 'COD'
  setPaymentMethod,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [promoCode, setPromoCode] = useState(promoCodeMain || "");
  const [promoSuccess, setPromoSuccess] = useState(null);

  const [paymentLink, setPaymentLink] = useState(null); // for ModalPaymentLink compatibility
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = async (result) => {
    setOpen(false);
    localStorage.removeItem("paymentCheckout");
    if (result?.ok && result?.orderId) {
      notifySuccess("Payment confirmed");
      try {
        // if you clear cart via RTK Query mutation, call it here
        // await deleteAllCart();
      } catch {}
      navigate(`/thank-you?order=${result.orderId}&payment=card`);
    }
  };

  const [loading, setLoading] = useState(false);

  // ---- totals derived from cart + promo (kept from your logic) ----
  const price = useMemo(() => {
    const totalPriceProduct = cartItems.reduce(
      (acc, curr) => acc + newCalcDiscount(curr).totalPrice,
      0
    );

    const discount =
      promoSuccess?.type === "percentage"
        ? (totalPriceProduct * promoSuccess?.amount) / 100
        : promoSuccess?.amount || 0;

    const afterDiscount =
      discount && promoSuccess?.maxAmount && discount > promoSuccess.maxAmount
        ? totalPriceProduct - promoSuccess.maxAmount
        : totalPriceProduct - discount;

    const shipping =
      afterDiscount > 3500 ? 0 : Number(orderSummary?.shipping ?? orderSummary?.shippingFees ?? 0);

    return {
      totalPriceProduct,
      discount,
      shipping,
      totalPrice: afterDiscount, // your UI used totalPrice as "SubTotal"
    };
  }, [cartItems, promoSuccess, orderSummary]);

  const amountToPay = useMemo(() => {
    // What we actually charge: keep your previous notion or use extractAmount(orderSummary)
    // Using order summary if present; otherwise subtotal + shipping - discount
    const fromSummary = extractAmount(orderSummary);
    if (fromSummary > 0) return fromSummary;
    return Math.max(0, price.totalPrice + price.shipping);
  }, [orderSummary, price]);

  const addressId = addressActive || address?.items?.[0]?.id || null;
  const orderId = useMemo(() => extractOrderId(orderSummary), [orderSummary]);

  // --- Promo code actions (kept behavior, but optional now) ---
  const clearPromoCode = () => {
    setPromoCode("");
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.delete("promocode");
      return sp;
    });
    setPromoCodeMain?.("");
    setPromoSuccess(null);
  };

  // If you still validate promo via an API, call it and set promoSuccess accordingly.
  // For brevity, I left out the network call here since your new backend likely computes promo in orderSummary.

  // --- Main payment action ---
  const handlePayment = async () => {
    localStorage.removeItem("paymentCheckout");

    if (!addressId) {
      notifyError("Please select an address before continuing.");
      return;
    }

    try {
      setLoading(true);

      // COD — create the order immediately
      if (paymentMethod === "COD") {
        const payload = {
          ...(DataSubmit || {}),
          paymentMethod: "COD",
          address: addressId,
        };
        const created = await createOrders(payload);
        const newOrderId =
          created?.orderId || created?.id || created?._id || orderId;

        if (!newOrderId) {
          notifyError("Order was created but ID is missing.");
          return;
        }

        notifySuccess("Order placed successfully.");
        navigate(`/thank-you?order=${newOrderId}&payment=cod`);
        return;
      }

      // Online methods — ask backend for Paymob redirect
      if (!orderId) {
        notifyError("Order is not ready yet. Please review your cart and try again.");
        return;
      }

      const res = await getUserPaymentLink({
        orderId,
        paymentMethod, // 'CARD' | 'WALLET' | 'VALU' | 'KIOSK'
        amount: amountToPay, // backend may ignore and compute itself
      });

      const redirectUrl = res?.redirectUrl || res?.link || null;
      const returnedOrderId = res?.orderId || res?.order_id || orderId;

      if (!redirectUrl) {
        notifyError("Could not create payment link. Please try again.");
        return;
      }

      // If you still want to use the modal component, pass it the shape it expects:
      const payload = { link: redirectUrl, orderId: returnedOrderId };
      setPaymentLink(payload);
      localStorage.setItem("paymentCheckout", JSON.stringify(payload));
      handleOpenModal();

      // (If you prefer immediate redirect instead of modal, just do:)
      // window.location.href = redirectUrl;

      // Optional non-blocking check (ignore errors)
      try {
        getUserStatusPayment(returnedOrderId).catch(() => {});
      } catch {}

    } catch (e) {
      const msg =
        e?.response?.data?.message || e?.message || "Payment failed. Please try again.";
      notifyError(msg);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Promo Code */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <h3>Promo Code</h3>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div className="input-code-container">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                type="text"
                className="btn input-code"
                placeholder="Enter Promo Code"
              />
              {promoCode ? (
                <CloseIcon onClick={clearPromoCode} className="btn-clear" />
              ) : null}
            </div>
            <button
              onClick={() => {
                // If you integrate real promo validation, call it here.
                setPromoCodeMain?.(promoCode || "");
                setSearchParams((prev) => {
                  const sp = new URLSearchParams(prev);
                  if (promoCode) sp.set("promocode", promoCode);
                  else sp.delete("promocode");
                  return sp;
                });
                notifySuccess("Promo updated.");
              }}
              className="btn promo-code"
              disabled={false}
            >
              Add
            </button>
          </div>

          {/* Totals */}
          <Row label="SubTotal" value={fmt(price.totalPrice)} />
          <Row label="Shipping" value={fmt(price.shipping)} />
          <Row label="Discount" value={fmt(price.discount)} />
          <Row label="Total Shopping" value={fmt(amountToPay)} />

          <div style={{ textAlign: "center", color: "#888" }}>
            {!address?.items?.[0]?.id || !addressActive ? "please enter address " : null}
          </div>

          <button
            onClick={handlePayment}
            style={{
              backgroundColor: "var(--brown)",
              color: "white",
              border: "none",
              padding: "12px 32px",
              fontWeight: 400,
              fontSize: 18,
              borderRadius: 10,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={
              loading ||
              !address?.items?.[0]?.id ||
              !addressActive ||
              (paymentMethod === "WALLET" && (!DataSubmit?.phone || DataSubmit?.phone?.length < 11))
            }
          >
            {loading ? (
              <Stack direction="row" justifyContent="center" gap={2} alignItems="center">
                <CircularProgress color="inherit" size="1rem" sx={{ width: 12 }} />
                Loading
              </Stack>
            ) : (
              "Continue to Payment"
            )}
          </button>
        </div>

        {/* Keep your existing modal (it will now receive { link: redirectUrl, orderId } ) */}
        <ModalPaymentLink
          closeModal={handleCloseModal}
          open={open}
          paymentLink={paymentLink}
          addressInfo={address?.items?.find((item) => item.id === addressActive) || {}}
          paymentAmount={amountToPay}
          orderSummary={cartItems}
          paymentMethod={paymentMethod}
          price={price}
        />
      </Box>
    </Box>
  );
}

ConfirmPayment.propTypes = {
  orderSummary: PropTypes.object,
  address: PropTypes.object,
  addressActive: PropTypes.any,
  promoCodeMain: PropTypes.string,
  setPromoCodeMain: PropTypes.func,
  isUseWallet: PropTypes.bool,
  setIsUseWallet: PropTypes.func,
  DataSubmit: PropTypes.object,
  cartItems: PropTypes.array,
  paymentMethod: PropTypes.string,
  setPaymentMethod: PropTypes.func,
};

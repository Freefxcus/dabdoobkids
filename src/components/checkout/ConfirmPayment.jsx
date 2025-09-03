import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mapUiToDtoMethod } from "../../utils/paymentMap";
import { createOrders, getUserPaymentLink } from "../../utils/apiCalls";
import { newCalcDiscount, notifyError, notifySuccess } from "../../utils/general";
import ModalPaymentLink from "./ModalPaymentLink";
import "./style.css";

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h2 style={{ color: "var(rhine-castle)", fontWeight: 500, fontSize: 16 }}>{label}</h2>
      <h2 style={{ color: "var(rhine-castle)", fontWeight: 500, fontSize: 16 }}>{value}</h2>
    </div>
  );
}
Row.propTypes = { label: PropTypes.string, value: PropTypes.any };

const fmt = (n) => `${Number(n || 0).toFixed(0)} EGP`;

// best-effort read from summary
function extractAmount(summary) {
  const nums = [
    summary?.paymentAmount,
    summary?.amountToPay,
    summary?.total,
    summary?.totalShopping,
    summary?.grandTotal,
    summary?.subTotal,
  ]
    .map(Number)
    .filter((x) => Number.isFinite(x) && x >= 0);
  return nums[0] ?? 0;
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
  paymentMethod,     // 'COD' | 'CARD' | 'WALLET'
  setPaymentMethod,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [promoCode, setPromoCode] = useState(promoCodeMain || "");
  const [promoSuccess, setPromoSuccess] = useState(null);

  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState(); // { link, orderRef? }
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = async (result) => {
    setOpen(false);
    localStorage.removeItem("paymentCheckout");
    if (result?.ok && (result?.orderId || result?.orderRef)) {
      notifySuccess("Payment confirmed");
      navigate(`/thank-you?payment=card`);
    }
  };

  // totals (kept same behavior)
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
      totalPrice: afterDiscount, // used as "SubTotal" label in UI
    };
  }, [cartItems, promoSuccess, orderSummary]);

  const amountToPay = useMemo(() => {
    const fromSummary = extractAmount(orderSummary);
    return fromSummary > 0 ? fromSummary : Math.max(0, price.totalPrice + price.shipping);
  }, [orderSummary, price]);

  const addressId = addressActive || address?.items?.[0]?.id || null;

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

const handlePayment = async () => {
  localStorage.removeItem("paymentCheckout");

  if (!addressId) {
    notifyError("Please select an address before continuing.");
    return;
  }

  try {
    setLoading(true);

    const dtoMethod = mapUiToDtoMethod(paymentMethod);

    // 1) COD — create order now
    if (dtoMethod === "Cash on Delivery") {
      const payload = {
        ...(DataSubmit || {}),
        paymentMethod: dtoMethod,
        address: Number(addressId),
      };

      const created = await createOrders(payload);
      const newId = created?.orderId || created?.id || created?.data?.orderId || created?.data?.id;

      notifySuccess("Order placed successfully.");
      navigate(newId ? `/thank-you?order=${newId}&payment=cod` : `/thank-you?payment=cod`);
      return;
    }

    // 2) Online (Credit Card / E-Wallet) — ask backend for Paymob link
    if (dtoMethod !== "Credit Card" && dtoMethod !== "E-Wallet") {
      notifyError("Unsupported payment method.");
      return;
    }

    // Check if we already have a payment link in storage
    const storedPayment = localStorage.getItem("paymentCheckout");
    if (storedPayment) {
      const { link, orderId } = JSON.parse(storedPayment);
      setPaymentLink({ link, orderId });
      handleOpenModal();
      return;
    }

    // Get new payment link from backend
    const { link, orderId } = await getUserPaymentLink(Number(amountToPay));
    
    if (!link) {
      notifyError("Could not create payment link. Please try again.");
      return;
    }

    setPaymentLink({ link, orderId });
    localStorage.setItem("paymentCheckout", JSON.stringify({ link, orderId }));
    handleOpenModal();

  } catch (e) {
    const msg = e?.response?.data?.message || e?.message || String(e) || "Payment failed. Please try again.";
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
              {promoCode ? <CloseIcon onClick={clearPromoCode} className="btn-clear" /> : null}
            </div>
            <button
              onClick={() => {
                setPromoCodeMain?.(promoCode || "");
                setSearchParams((prev) => {
                  const sp = new URLSearchParams(prev);
                  if (promoCode) sp.set("promocode", promoCode);
                  else sp.delete("promocode");
                  return sp;
                });
              }}
              className="btn promo-code"
            >
              Add
            </button>
          </div>

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
              (mapUiToDtoMethod(paymentMethod) === "E-Wallet" &&
                (!DataSubmit?.phone || DataSubmit?.phone?.length < 11))
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

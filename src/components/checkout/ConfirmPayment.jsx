import { useState } from "react";
import {
  checkPromoCode,
  emptyCart,
  orderCheckout,
  ordersCallback,
} from "../../utils/apiCalls";
import { useNavigate, useSearchParams } from "react-router-dom";
import { set } from "lodash";
import { Box, CircularProgress, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useDeleteAllCartMutation } from "../../Redux/cartApi";
import "./style.css"
export default function ConfirmPayment({
  orderSummary,
  address,
  addressActive,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentMethod = searchParams.get("paymentMethod");
  const addressId = addressActive || address?.items?.[0]?.id;
  const [promoCode, setPromoCode] = useState("");
  const [paymentLink, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteAllCart] = useDeleteAllCartMutation();
  const validatePromoCode = async () => {
    checkPromoCode(promoCode);
  };
  const handlePayment = async () => {
    setLoading(true);
    const checkout = await orderCheckout(paymentMethod, addressId);

    if (checkout?.data?.data?.url) {
      toast.success("Redirecting to Payment Gateway");
      setPaymentMethod(checkout?.data?.data?.url);
    } else if (checkout?.data?.status === "success") {
      toast.success("Order Placed Successfully");
      deleteAllCart().then(() => {
        navigate("/");
      });
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        flex: 2,
        width: "70%",
      }}
    >
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
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h3>Promo Code</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          ><div className="input-code-container">
            <input
            
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              type="text"
              className="btn input-code"
              placeholder="Enter Promo Code"
            /></div>
            <button
              onClick={validatePromoCode}
              disabled={!promoCode}
             className="btn promo-code"

            >
              Add
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{
                color: "var(rhine-castle)",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Total Shopping
            </h2>
            <h2
              style={{
                color: "var(rhine-castle)",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {orderSummary?.data?.data?.total}EGP
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{
                color: "var(rhine-castle)",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Shipping
            </h2>
            <h2
              style={{
                color: "var(rhine-castle)",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {orderSummary?.data?.data?.shipping}EGP
            </h2>
          </div>
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2
            style={{
              color: "var(rhine-castle)",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            Tax
          </h2>
          <h2
            style={{
              color: "var(rhine-castle)",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            $10
          </h2>
        </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: " #AD6B46",
            }}
          >
            <h2
              style={{
                color: "var(rhine-castle)",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Discount
            </h2>
            <h2
              style={{
                color: "var(rhine-castle)",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {orderSummary?.data?.data?.discount}EGP
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              SubTotal
            </h2>
            <h2
              style={{
                color: "var(rhine-castle)",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {orderSummary?.data?.data?.subtotal}EGP
            </h2>
          </div>
          <div style={{ textAlign: "center", color: "red" }}>
            {!address?.items?.[0]?.id || !addressActive
              ? "please enter address "
              : null}
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
            disabled={loading || !address?.items?.[0]?.id || !addressActive}
          >
            {loading ? (
              <Stack
                direction="row"
                justifyContent={"center"}
                gap={2}
                alignItems={"center"}
              >
                {" "}
                <CircularProgress
                  color="inherit"
                  size="1rem"
                  sx={{ width: "12px" }}
                />{" "}
                Loading
              </Stack>
            ) : (
              "Continue to Payment"
            )}
          </button>
        </div>

        {paymentLink && (
          <iframe
            src={paymentLink}
            title="Paymob"
            style={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              zIndex: "9999",
              inset: "0",
            }}
          />
        )}
      </Box>
    </Box>
  );
}

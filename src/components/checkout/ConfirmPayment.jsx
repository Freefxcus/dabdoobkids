import { useEffect, useState } from "react";
import {
  checkPromoCode,
  emptyCart,
  getWallet,
  orderCheckout,
  ordersCallback,
} from "../../utils/apiCalls";
import { useNavigate, useSearchParams } from "react-router-dom";
import { set } from "lodash";
import { Box, CircularProgress, Stack, Switch } from "@mui/material";
import { toast } from "react-toastify";
import { useDeleteAllCartMutation } from "../../Redux/cartApi";
import "./style.css";
import CloseIcon from "@mui/icons-material/Close";
import { Wallet3 } from "iconsax-react";
export default function ConfirmPayment({
  orderSummary,
  address,
  addressActive,
  promoCodeMain,
  setPromoCodeMain,
  isUseWallet,
  setIsUseWallet,
  DataSubmit,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentMethod = searchParams.get("paymentMethod");
  const addressId = addressActive || address?.items?.[0]?.id;
  const [promoCode, setPromoCode] = useState(promoCodeMain);
  const [promoSuccess, setPromoSuccess] = useState();
  const [paymentLink, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteAllCart] = useDeleteAllCartMutation();
  const [wallet, setWallet] = useState();

  useEffect(() => {
    getWallet().then((res) => {
      setWallet(res);
    });
  }, []);

  const validatePromoCode = async () => {
    let data = await checkPromoCode(promoCode);

    if (data?.data?.status === "success") {
      console.log(data);
      setPromoCodeMain(promoCode);
      setSearchParams((prev) => {
        prev.set("promocode", promoCode);
        return prev;
      });
      setPromoSuccess(data?.data?.data);
    } else {
      setPromoSuccess();
      setPromoCodeMain("");
    }
  };

  const clearPromoCode = async () => {
    setPromoCode("");

    setSearchParams((prev) => {
      prev.set("promocode", "");
      return prev;
    });
    setPromoCodeMain("");
    setPromoSuccess("");
  };
  const handlePayment = async () => {
    setLoading(true);
    const checkout = await orderCheckout(DataSubmit);

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
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "0.751rem",
            border: "1px solid  #F4F4F4",

            borderRadius: "12px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Wallet3 />{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",

                gap: "4px",
              }}
            >
              <h4>Use wallet credits</h4>
              <h5>you have {wallet?.balance} EGP</h5>
            </div>
          </div>
          <Switch
            // checked={isUseWallet}
            checked={wallet?.balance === 0 ? false : isUseWallet}
            disabled={wallet?.balance === 0}
            onChange={() => {
              setIsUseWallet((prev) => !prev);
              setSearchParams((prev) => {
                prev.set("useWallet", !isUseWallet);
                return prev;
              });
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>

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
                <CloseIcon
                  onClick={() => clearPromoCode()}
                  className="btn-clear"
                />
              ) : null}
            </div>
            <button
              onClick={validatePromoCode}
              disabled={!promoCode || promoSuccess}
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
              SubTotal
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
              Total Shipping
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
            disabled={
              loading ||
              !address?.items?.[0]?.id ||
              !addressActive ||
              (DataSubmit.paymentMethod === "E-Wallet" &&
                DataSubmit?.phone?.length < 11)
            }
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

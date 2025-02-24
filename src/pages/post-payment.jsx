import { CardMedia, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PostPayment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentMethod = searchParams.get("success");
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentMethod === "true") localStorage.removeItem("paymentURL");
  }, [paymentMethod]);

  return (
    <Stack
      gap={"12px"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ minHeight: "57vh" }}
    >
      {paymentMethod === "true" ? (
        <>
          <CardMedia
            component={"img"}
            sx={{ width: "90px" }}
            src="/success.svg"
            alt="failure"
          />

          <h1>Payment Successful</h1>
          <p>
            Your payment has been successfully processed. Your order will be
            delivered soon.
          </p>
          <button
            onClick={() => {
              navigate("/");
            }}
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
          >
            Return to Home
          </button>
        </>
      ) : (
        <>
          <CardMedia
            component={"img"}
            sx={{ width: "90px" }}
            src="/failure.svg"
            alt="failure"
          />
          <h1 style={{ fontSize: "32px" }}>Payment Failed</h1>
          <p>
            Your payment has been failed. Please try again or contact support.
          </p>
          <button
            onClick={() => {
              navigate("/");
            }}
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
          >
            Return to Home
          </button>
        </>
      )}
    </Stack>
  );
}

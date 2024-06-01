import { useState } from "react";
import {
  checkPromoCode,
  orderCheckout,
  ordersCallback,
} from "../../utils/apiCalls";
import { useSearchParams } from "react-router-dom";
import { set } from "lodash";

export default function ConfirmPayment({ orderSummary, address }) {
  console.log(address, "address123123zzzzzz");
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentMethod = searchParams.get("paymentMethod");
  const addressId = address?.items?.[0]?.id;
  const [promoCode, setPromoCode] = useState("");
  const [paymentLink, setPaymentMethod] = useState("");
  const validatePromoCode = async () => {
    checkPromoCode(promoCode);
  };
  console.log(paymentMethod, addressId, "paymentMethod123123zzzzzz");
  const handlePayment = async () => {
    const checkout = await orderCheckout(paymentMethod, addressId);
    
    if (checkout?.data?.data?.url) {
      console.log(checkout, "checkout123123");
      setPaymentMethod(checkout?.data?.data?.url);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        flex: 1,
        width: "70%",
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
        >
          <input
            style={{
              border: "2px solid var(--dreamy-cloud) ",
              padding: "12px 12px ",
              flex: 2,
            }}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            type="text"
            placeholder="Enter Promo Code"
          />
          <button
            onClick={validatePromoCode}
            style={{
              backgroundColor: "var(--dreamy-cloud)",
              border: "none",
              padding: "12px 24px",
            }}
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
            {orderSummary?.data?.data?.total}$
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
            {orderSummary?.data?.data?.shipping}$
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
            {orderSummary?.data?.data?.discount}$
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
            {orderSummary?.data?.data?.subtotal}$
          </h2>
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
        >
          Contuinue to Payment
        </button>
      </div>

      {paymentLink && <iframe  src={paymentLink} title="Paymob" style={{position : "fixed" , height : "100vh" , width : "100vw" , zIndex : "9999" , inset : "0"}} />}
    </div>
  );
}

export default function ConfirmPayment() {
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
            type="text"
            placeholder="Enter Promo Code"
          />
          <button
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
            $3.040.00
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
            $10
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
        </div>
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
            -50$
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
            $3.000.00
          </h2>
        </div>
        <button
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
    </div>
  );
}

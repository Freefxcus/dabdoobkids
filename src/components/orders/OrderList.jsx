import React, { useState } from "react";
import styles from "../../styles/pages/Profile.module.css";
import OrderCard from "../OrderCard";
import OrderOverview from "./orderOverView";
import { useNavigate } from "react-router-dom";

export default function OrderList({ orders }) {
  console.log(orders, "ziadorderedsdsadsa");
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState(null);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "90%",
        margin: "0px auto",
      }}
    >
      {/* {orders === null && <Loader open={true} />} */}
      {/* {orders.length === 0 && <div>No Orders Created ...</div>} */}
      {/* {orders.length > 0 && currentOrder === null && (

    )} */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {orders?.map((order) => (
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>Order ID : {order?.id}</div>
              <div
                style={{
                  borderRadius: "20px",
                  padding: "6px 8px 6px 8px",
                  backgroundColor: "#F4F5F6", // In Delivery
                  color: "#000",
                  // backgroundColor: "#FFF7E5", // Waiting Payment
                  // color: "#FFAB00",
                  // backgroundColor: "#FFF2F0", // Waiting Payment
                  // color: "#FF5630",
                }}
              >
                In Delivery
              </div>
            </div>
            {order?.items?.map((item) => (
              <>
                <OrderOverview item={item} />
                <div
                  style={{
                    width: "100%",
                    borderBottom: "1px solid #EDEDED",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
              </>
            ))}
            <button
              style={{
                width: "140px",
                height: " 32px",
                padding: "6px 12px 6px 12px",
                borderRadius: "8px",
                backgroundColor: "#AD6B46",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={() => {
                navigate(`/order/${order?.id}`);
              }}
            >
              Detail
            </button>
          </div>
        ))}
      </div>
      {currentOrder !== null && (
        <>
          {orders
            .filter((order) => order.id === currentOrder)
            .map((order) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <div className={styles.row_wrap}>
                  <img
                    src="./back.png"
                    style={{ height: "20px", cursor: "pointer" }}
                    onClick={() => {
                      setCurrentOrder(null);
                    }}
                  />
                  <div>Order ID: {order.id}</div>
                  <img
                    src="./close.svg"
                    style={{
                      height: "20px",
                      cursor: "pointer",
                      marginLeft: "auto",
                    }}
                    onClick={() => {
                      setCurrentOrder(null);
                    }}
                  />
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Status</div>
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "6px 8px 6px 8px",
                      backgroundColor: "#F4F5F6", // In Delivery
                      color: "#000",
                      // backgroundColor: "#FFF7E5", // Waiting Payment
                      // color: "#FFAB00",
                      // backgroundColor: "#FFF2F0", // Waiting Payment
                      // color: "#FF5630",
                    }}
                  >
                    In Delivery
                  </div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Purchase date</div>
                  <div
                    style={{
                      color: "#000",
                    }}
                  >
                    Sunday, 9th of October 2022, 10:12 AM
                  </div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Invoice</div>
                  <div
                    style={{
                      color: "var(--brown)",
                    }}
                  >
                    INV/20221114/MPL/28203158839
                  </div>
                </div>
                <div className={styles.main_title}>Product Detail</div>
                {["", ""].map((item) => (
                  <>
                    <OrderCard />
                    <div
                      style={{
                        width: "100%",
                        borderBottom: "1px solid #EDEDED",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    />
                  </>
                ))}
                <div className={styles.main_title}>Payment Details</div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Total Shoping</div>
                  <div>$ 1.500.00</div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Shipping</div>
                  <div>$ 10.00</div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Tax</div>
                  <div>$ 10.00</div>
                </div>
                <div className={styles.row_wrap}>
                  <div
                    className={styles.left_title}
                    style={{ color: "var(--brown)" }}
                  >
                    Discount
                  </div>
                  <div style={{ color: "var(--brown)" }}>-$ 50.00</div>
                </div>
                <div className={styles.row_wrap} style={{ fontWeight: "bold" }}>
                  <div
                    className={styles.left_title}
                    style={{ fontWeight: "bold", color: "#000" }}
                  >
                    Subtotal
                  </div>
                  <div>$ 1.570.00</div>
                </div>
                <button
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "13px",
                    borderRadius: "10px",
                    border: "2px",
                    gap: "12px",
                    color: "#F04438",
                    border: "2px solid #F04438",
                    backgroundColor: "transparent",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Refund
                </button>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/pages/Profile.module.css";
import { useEffect, useState } from "react";
import {
  getInvoiceOrder,
  getOrderInvoice,
  getSingleOrder,
  orderRefund,
  orderReturn,
} from "../../utils/apiCalls";
import OrderCard from "../OrderCard";
import OrderOverview from "./orderOverView";
// import { use } from "i18next";
import { Box } from "@mui/material";
import { LogoutCurve } from "iconsax-react";

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [orderInvoice, setOrderInvoice] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getSingleOrder(id).then((res) => {
      setOrder(res?.data?.data);
    });

    getOrderInvoice(id).then((res) => {
      setOrderInvoice(res?.data?.data);
    });
  }, []);
  const purchaseDate = new Date(order?.createdAt).toLocaleString();
  const handleGetInvoice = async (id) => {
    try {
      const response = await getInvoiceOrder(id);
      
      // Check if the response has a blob method (i.e., it's a valid Response object)
      // if (!response.ok) {
      //   throw new Error('Failed to fetch the invoice.'); // Handle error response
      // }
  
      const blob = await response.blob(); // Convert to blob
  
      console.log("blob", blob);
      
      // Create a link element to download the file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'file.pdf'); // Specify the file name
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up
    } catch (error) {
      console.error("Error while fetching the invoice:", error);
    }
  };
  return (
    <div className={`${styles.bg} padding-container`}>
      <div className={styles.row}>
        <div className={styles.header}>Profile</div>
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          {/* { id: "8", title: "My Promo" }, */}
          {[
            { id: "1", title: "Profile" },
            { id: "2", title: "Wallet" },
            { id: "3", title: "Order List" },
            { id: "4", title: "Returns and Refunds" },
            { id: "5", title: "Term and Condition" },
            { id: "6", title: "Privacy Policy" },
            { id: "7", title: "Help Page" },

            { id: "9", title: "Log out" },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item?.id === "9") {
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("refresh_token");
                  navigate("/login");
                }

                navigate("/profile/" + item?.id);
              }}
              className={styles.sidebar_item}
              style={{
                color:
                  item?.id === "8" || item?.id === "9"
                    ? "var(--error)"
                    : "initial",
              }}
            >
              {item?.title}
              {item?.id === "9" ? (
                <LogoutCurve size="24" color="var(--error)" />
              ) : null}
            </div>
          ))}
        </div>
        {/* "Profile" */}

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingTop: "50px",
            paddingBottom: "100px",
            px:"20px",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            minHeight: "50vh",

          }}
        >
          <div className={styles.row_wrap}>
            <img
              src="/back.png"
              style={{ height: "20px", cursor: "pointer" }}
              onClick={() => navigate("/profile/3")}
            />
            <div>Order ID: {order?.id}</div>
            <img
              src="/close.svg"
              style={{
                height: "20px",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={() => navigate("/profile/3")}
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
              {order?.orderStatus}
            </div>
          </div>
          <div className={styles.row_wrap}>
            <div className={styles.left_title}>Purchase date</div>
            <div
              style={{
                color: "#000",
              }}
            >
              {purchaseDate}
            </div>
          </div>
          <div className={styles.row_wrap}>
            <div className={styles.left_title}>Invoice</div>
            <div onClick={()=>handleGetInvoice(id)}
              style={{
                color: "var(--brown)",
              }}
            >{order?.orderReference}</div>
          </div>
          <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid #EDEDED",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              />
          <div className={styles.main_title}>Shipping</div>
          <div className={styles.row_wrap}>
            <div className={styles.left_title}>Address</div>
            <div
              style={{
                color: "#000",
              }}
            >
              {order?.governorate}{" , "}  {order?.city}
            </div>
          </div>
          <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid #EDEDED",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              />
          <div className={styles.main_title}>Product Detail</div>
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
          <div className={styles.main_title}>Payment Details</div>
          <div className={styles.row_wrap}>
            <div className={styles.left_title}>Total Shoping</div>
            <div>{order?.totalPrice - order?.shippingFees}EGP</div>
          </div>
          <div className={styles.row_wrap}>
            <div className={styles.left_title}>Shipping</div>
            <div>{order?.shippingFees}EGP</div>
          </div>

          <div className={styles.row_wrap}>
            <div
              className={styles.left_title}
              style={{ color: "var(--brown)" }}
            >
              Discount
            </div>
            <div style={{ color: "var(--brown)" }}>-EGP {order?.discount}</div>
          </div>
          <div className={styles.row_wrap} style={{ fontWeight: "bold" }}>
            <div
              className={styles.left_title}
              style={{ fontWeight: "bold", color: "#000" }}
            >
              Subtotal
            </div>
            <div>EGP {order?.totalPrice}</div>
          </div>
          <button
            onClick={() =>
              order?.cancellable && !order?.refundable
                ? orderRefund({
                    order: order.id,
                    items: order?.items?.map((item) => item.id),
                    requestType: "cancel",
                  })
                : !order?.cancellable && order?.refundable
                ? orderRefund({
                    order: order.id,
                    items: order?.items?.map((item) => item.id),
                    requestType: "refund",
                  })
                : null
            }
            style={{
              width: "100%",
              height: "48px",
              padding: "13px",
              borderRadius: "10px",
              gap: "12px",
              color: "#F04438",
              border: "2px solid #F04438",
              backgroundColor: "transparent",
              fontWeight: "bold",
              cursor: order?.canSendRequest ? "pointer" : "not-allowed",
            }}
            disabled={!order?.canSendRequest}
          >
            {order?.cancellable && !order?.refundable
              ? order?.canSendRequest
                ? "Cancel"
                : "Cancel is under evaluation"
              : !order?.cancellable && order?.refundable
              ? order?.canSendRequest
                ? "Refund"
                : "Refund is under evaluation"
              : "Return"}
          </button>
        </Box>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/Profile.module.css";
import OrderCard from "../OrderCard";
import OrderOverview from "./orderOverView";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Pagination } from "@mui/material";
import instance from "../../utils/interceptor";
import Loader from "../Loader";
import EmptyOrders from "../../images/search.svg";

export default function OrderList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [Filters, setFilters] = useState(null);
  useEffect(() => {
    let filtersObject = Filters?.length
      ? { [Filters.name]: Filters.value }
      : null;
    instance
      .get("profile/orders", {
        params: {
          items: 5,
          page: searchParams.get("page") || 1,
          [Filters?.name]: Filters?.value,
        },
      })
      .then((response) => {
        setPaginationInfo(response?.data?.data?.metadata);
        setOrders(response.data?.data?.orders);
        // setTotalPages(response.data.data.metadata.totalPages);
      })
      .catch((error) => {});
  }, [searchParams, Filters]);

  const FilterOrder = [
    { id: "1", name: "All", action: () => setFilters({}) },
    {
      id: "2",
      name: "Order On Process",
      action: () =>
        setFilters({ id: "2", name: "orderStatus", value: "Pending" }),
    },
    {
      id: "3",
      name: "in delivery",
      action: () =>
        setFilters({ id: "3", name: "shippingStatus", value: "Pending" }),
    },
    {
      id: "4",
      name: "Complete Order",
      action: () =>
        setFilters({ id: "4", name: "shippingStatus", value: "Shipped" }),
    },
    {
      id: "5",
      name: "Refund",
      action: () =>
        setFilters({ id: "5", name: "orderStatus", value: "Refunded" }),
    },
  ];

  return (
    <Box
      sx={{
      //  maxWidth:{xs:"max(85vw,78%)",sm:"auto"},
    flexGrow:1,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box
        sx={{    
          bgcolor: "#fff",
          flex:1,
          borderRadius: "1rem",
          p: 1.25,
          pb: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          position:"relative"
        }}
      >
        <Box
          sx={{
            p: "0.62rem",

            fontSize: { md: "1rem", lg: "1.25rem" },
            fontWeight: 600,
          }}
          component={"h2"}
        >
          Order List
        </Box>
        <Box 
          sx={{
            p: "0.62rem",
          // flex:1,
            flexDirection: "row",
            // maxWidth:"100%",
            width:{xs:"calc(100vw - 4.5rem)",sm:"auto"},
            display: "flex",
            gap: "0.62rem",
            fontSize: "15px",
            whiteSpace: "nowrap",
            overflow: "auto",
            borderBottom: "1px solid  #EDEDED",
          }}
          component={"div"}
        >
          {FilterOrder.map((FilterAction) => (
            <Box  component={"div"} className={styles.sidebar_item}
              sx={{
                borderBottom:
                  FilterAction.id === Filters?.id
                    ? "1px solid  #333"
                    : FilterAction.id === "1" && !Filters?.id
                    ? "1px solid  #333"
                    : null,
                color:
                  FilterAction.id === Filters?.id
                    ? "#333"
                    : FilterAction.id === "1"&& !Filters?.id
                    ? "#333"
                    : "#b1b1b1",
              }}
              key={FilterAction.id}
              onClick={FilterAction.action}
            >
              {FilterAction?.name}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ flex:1 }}>
        {orders === null && <Loader open={true} />}
        {orders?.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 12,bgcolor: "#fff", borderRadius: "1rem",
              gap: "2rem",
            }}
          >
            <Box
              component={"img"}
              src={EmptyOrders}
              sx={{ maxWidth: { xs: "300px", sm: "400px", lg: "500px" } }}
            />
            <Box
              sx={{
                p: "4px",
                textAlign: "center",
                fontSize: { md: "1rem", lg: "1.25rem" },
                fontWeight: 600,
              }}
              component={"h3"}
            >
              empty Order List
            </Box>
            <Box
              sx={{
                p: "4px",
                textAlign: "center",
                fontSize: { md: "0.6rem", lg: "0.85rem" },
                fontWeight: 500,
                color: "#8D8D8D",
              }}
              component={"p"}
            >
              You don't have any products in your order list.{" "}
            </Box>
          </Box>
        )}
        {orders?.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex:1,
              gap: "1.5rem",
            }}
          >
            {orders?.map((order) => (
              <div key={order.id}
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "1rem",
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
                    {order?.shippingStatus}
                  </div>
                </div>
                {order?.items?.map((item) => (
                  <Box  sx={{flex:1,maxWidth:{xs:"80vw",sm:"auto"}}}>
                    <OrderOverview item={item} />
                    <div
                      style={{
                        flex:1,
                        borderBottom: "1px solid #EDEDED",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    />
                  </Box>
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
            <Box sx={{ mx: "auto" }}>
              <Pagination
                count={paginationInfo?.totalPages}
                onChange={(event, value) => {
                  setSearchParams((prev) => {
                    return { ...prev, page: value };
                  });
                }}
              />
            </Box>
          </div>
        )}
      </Box>
      {/* {currentOrder !== null && (
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
                  <div>EGP 1.500.00</div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Shipping</div>
                  <div>EGP 10.00</div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Tax</div>
                  <div>EGP 10.00</div>
                </div>
                <div className={styles.row_wrap}>
                  <div
                    className={styles.left_title}
                    style={{ color: "var(--brown)" }}
                  >
                    Discount
                  </div>
                  <div style={{ color: "var(--brown)" }}>-EGP 50.00</div>
                </div>
                <div className={styles.row_wrap} style={{ fontWeight: "bold" }}>
                  <div
                    className={styles.left_title}
                    style={{ fontWeight: "bold", color: "#000" }}
                  >
                    Subtotal
                  </div>
                  <div>EGP 1.570.00</div>
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
      )} */}
    </Box>
  );
}

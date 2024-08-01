import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getAddress,
  getCart,
  orderCheckout,
  orderSummary,
} from "../utils/apiCalls";
import styles from "../styles/components/OrderCard.module.css";
import ConfirmPayment from "../components/checkout/ConfirmPayment";
import BillingDetails from "../components/checkout/BillingDetails";
export default function Checkout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [payemntMethod, setPaymentMethod] = useState(
    searchParams.get("paymentMethod") || "cash"
  );
  const [promoCode, setPromoCode] = useState(
    searchParams.get("promocode") || ""
  );
  const [addressActive, setAddressActive] = useState(null);

  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getCart();
      setCart(cartData);
    };

    const fetchAddress = async () => {
      const addressData = await getAddress();
      setAddress(addressData);
      setAddressActive(
        addressData?.items?.length
          ? addressData?.items?.filter((item) => item?.primary).id ||
              addressData?.items?.[0]?.id
          : null
      );
    };

    fetchCart();
    fetchAddress();
  }, []);
  console.log(address, "addrezzzzzzzzzzzz");

  useEffect(() => {
    if (!searchParams.get("paymentMethod")) {
      setSearchParams((prev) => {
        prev.set("paymentMethod", "Cash on Delivery");
        return prev;
      });
    }
  }, []);

  useEffect(() => {
    const data = {
      promocode: promoCode,
      useWallet: payemntMethod === "wallet",
      paymentMethod: payemntMethod,
      address: address?.items?.[0]?.id,
    };
    const fetchOrder = async () => {
      const orderData = await orderSummary(data);
      setOrder(orderData);
    };
    fetchOrder();
  }, [address?.items, payemntMethod, promoCode]);
  console.log(order, "orderrrrr123123");

  return (
    <div
      style={{
        margin: "12px auto",
        display: "flex",
        maxWidth: "80%",
        gap: "52px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          flex: 1,
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "500" }}>Summary Order</h1>
        {cart?.map((item) => (
          <div
            style={{
              display: "flex",
              gap: "32px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <img
              style={{ height: "150px", width: "116px", objectFit: "cover" }}
              src={item?.product?.images[0]}
              alt="Checkout"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: "400" }}>
                  Spring Collection
                </h2>
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
                  {item?.product?.name}
                </h2>
              </div>

              {item?.variant?.options.length
                ? item?.options?.map((variantItem, index) => (
                    <div
                      key={index + variantItem?.id}
                      style={{ display: "flex", gap: "12px" }}
                    >
                      <h2
                        style={{
                          fontSize: "18px",
                          fontWeight: "400",
                          textTransform: "capitalize",
                        }}
                      >
                        {" "}
                        {variantItem?.option?.name} :{" "}
                      </h2>
                      <span
                        style={{
                          marginLeft: "6px",
                          marginRight: "6px",
                          textTransform: "capitalize",
                        }}
                        className={styles.size}
                      >
                        {variantItem?.value?.value}
                      </span>
                    </div>
                  ))
                : null}
            </div>
            <div
              style={{
                fontWeight: "500",
                display: "flex",
                gap: "32px",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontWeight: "500",
                  display: "flex",

                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",

                    border: "1px solid var(--dreamy-cloud)",
                    fontWeight: "400",
                  }}
                >
                  <h2 style={{ fontWeight: "400" }}>{item?.count}</h2>
                  <h2 style={{ fontWeight: "400" }}>x</h2>
                  <h2 style={{ fontWeight: "400" }}>{+item?.product?.price}</h2>
                </div>
              </div>

              <div
                style={{
                  fontWeight: "500",
                  display: "flex",

                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ backgroundColor: "transparent" }}>
                  <h2 style={{ fontWeight: "400" }}>
                    {item?.count * +item?.product?.price}
                  </h2>
                </div>
              </div>
            </div>{" "}
          </div>
        ))}

        <BillingDetails
          address={address}
          addressActive={addressActive}
          setAddressActive={setAddressActive}
        />
      </div>

      <ConfirmPayment
        address={address}
        addressActive={addressActive}
        orderSummary={order}
      />
    </div>
  );
}

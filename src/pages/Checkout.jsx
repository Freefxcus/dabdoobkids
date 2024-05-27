import { useEffect, useState } from "react";
import { getCart } from "../utils/apiCalls";
import styles from "../styles/components/OrderCard.module.css";
import ConfirmPayment from "../components/checkout/ConfirmPayment";
export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      setCart(cart);
    };
    fetchCart();
  }, []);

  console.log(cart, "checkout123123123");

  return (
    <div style={{ margin : "12px auto" , display : "flex" ,maxWidth : "70%" , gap : "52px" , justifyContent : "center"   }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", flex :1  , justifyContent : "center" , alignItems :"center"}}>
        <h1 style={{ fontSize: "24px", fontWeight: "500" }}>Summary Order</h1>
        {cart?.items?.map((item) => (
          <div style={{ display: "flex", gap: "32px" }}>
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
                  {item?.product?.name?.en}
                </h2>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                >
                  Size : {item?.variant?.size}
                </h2>
                <h2 style={{ fontSize: "18px", fontWeight: "400" }}>Color :</h2>
                <span
                  className={styles.color}
                  style={{
                    backgroundColor: `${item?.variant?.color}`,
                    marginLeft: "6px",
                  }}
                ></span>
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
              <div
                style={{
                  display: "flex",
                  border: "1px solid var(--dreamy-cloud)",
                  fontWeight : "400"
                }}
              >
                <h2 style={{ fontWeight : "400"}}>{item?.count}</h2>
                <h2 style={{ fontWeight : "400"}}>x</h2>
                <h2 style={{ fontWeight : "400"}}>{item?.variant?.price}</h2>
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
                <h2 style={{ fontWeight : "400"}}>{item?.count * item?.variant?.price}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

        <ConfirmPayment/>
    </div>
  );
}

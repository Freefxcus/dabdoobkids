import { useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import Img from "../images/thank-you.png";
import styles from "./ThankYou.module.css";

export default function ThankYou() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const orderId = params.get("order");       // may be null/undefined
  const paymentId = params.get("payment");   // optional

  useEffect(() => {
    try {
      localStorage.removeItem("cart");
      localStorage.removeItem("coupon");
    } catch {}
  }, []);

  return (
    <main className={styles.wrap}>
      <section className={styles.card}>
        <img src={Img} alt="Thank You" />
        <h1 className={styles.title}>Thank you for your order!</h1>

        <p className={styles.subtitle}>
          Your purchase is confirmed! Get ready for an amazing experience with
          Dabdoob Kidz
        </p>

        <div className={styles.actions}>
            <Link to="/" className={styles.continueBtn}>
            Continue Shopping
            </Link>
        </div>
      </section>
    </main>
  );
}

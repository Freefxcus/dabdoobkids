// src/pages/ThankYou.jsx
import { useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

export default function ThankYou() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const orderId = params.get("order");
  const paymentId = params.get("payment"); // optional

  useEffect(() => {
    try {
      localStorage.removeItem("cart");
      localStorage.removeItem("coupon");
    } catch {}
  }, [orderId]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="font-plus text-[48px] leading-[130%] font-semibold">
          Thank you for your order!
        </h1>

        <p className="font-plus text-[28px] leading-[130%] text-gray-700 mt-4">
          Your purchase is confirmed! Get ready for an amazing experience with
          Dabdoob Kidz
          {orderId ? ` (Order #${orderId})` : ""}
          {paymentId ? ` — Ref: ${paymentId}` : ""}
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            to="/shop"
            className="font-plus inline-flex items-center justify-center px-6 py-3 rounded-xl bg-black text-white hover:opacity-90"
          >
            Return to Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

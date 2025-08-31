// src/pages/ThankYou.jsx
import { useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

export default function ThankYou() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const orderId = params.get("order");
  const paymentId = params.get("payment"); // optional

  useEffect(() => {
    // clear local cart, coupons, etc.
    try {
      localStorage.removeItem("cart");
      localStorage.removeItem("coupon");
    } catch {}
    // optionally refetch order details if you want to show them here
    // fetch(`/api/orders/${orderId}`)
  }, [orderId]);

  return (
    <div className="container mx-auto max-w-2xl py-16 text-center">
      <h1 className="text-3xl font-semibold mb-2">Thank you! 🎉</h1>
      <p className="text-gray-600 mb-6">
        Your order{orderId ? ` #${orderId}` : ""} has been received.
      </p>

      {/* optional tiny summary / instructions */}
      {paymentId && (
        <p className="text-sm text-gray-500 mb-4">
          Payment ref: <span className="font-mono">{paymentId}</span>
        </p>
      )}

      <div className="flex items-center justify-center gap-3">
        <Link
          to="/orders"
          className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
        >
          View Orders
        </Link>
        <Link
          to="/shop"
          className="px-5 py-2 rounded-xl bg-black text-white hover:opacity-90"
        >
          Return to Shopping
        </Link>
      </div>
    </div>
  );
}

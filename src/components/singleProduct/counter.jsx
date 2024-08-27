import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Redux/store";
import { addToCart, getCart } from "../../utils/apiCalls";
import { toast } from "react-toastify";
import HandleMessageIsAuth from "../../utils/message";

export default function Counter({
  count,
  CartAddLoad,
  setCount,
  handleUpdateQuantity,
}) {
  const increment = () => {
    setCount((prev) => prev + 1);
 
  };
  const decrement = () => {
    if (count == 1) return toast.error("not allowed to decrement");
    setCount((prev) => prev - 1);
 
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "4px",
        border: "1px solid var(--unicorn-silver)",
      }}
    >
      <button
        style={{ background: "white", border: "none", fontSize: "22px" }}
        disabled={CartAddLoad || count <=1}
        onClick={() => HandleMessageIsAuth(decrement)}
      >
        -
      </button>
      <span style={{ fontSize: "22px" }}>{+count||1}</span>
      <button
        disabled={CartAddLoad}
        style={{ background: "white", border: "none", fontSize: "22px" }}
        onClick={() => HandleMessageIsAuth(increment)}
      >
        +
      </button>
    </div>
  );
}

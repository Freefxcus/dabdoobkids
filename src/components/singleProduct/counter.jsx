import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Redux/store";
import { addToCart } from "../../utils/apiCalls";
import { toast } from "react-toastify";

export default function Counter({ item,count,
  setCount}) {

  const dispatch = useDispatch();
console.log(item,"itemitemitemitemitemitem");


  const cart = useSelector((state) => state.cart.value);

  const increment = () => {
    setCount((prev) => prev + 1);
    let NewCarts = cart
      ?.filter((itemCart) =>
        +itemCart?.product != +item.id 
      )
    ;
    dispatch(
      cartActions.add({
        product: item?.id,
        count: count + 1,
        variant: item?.variant?.id,
      })
    );
  

    addToCart([
      ...NewCarts,
      {
        product: item?.id,
        count: count + 1,
        variant: item?.variant?.id,
      },
    ]);
  };
  const decrement = () => {
    if(count==1) return toast.error("not allowed to decrement")
    setCount((prev) => prev - 1);
    let NewCarts = cart
    ?.filter((itemCart) =>
      +itemCart?.product != +item.id 
    )
  ;
  dispatch(
    cartActions.add({
      product: item?.id,
      count: count - 1,
      variant: item?.variant?.id,
    })
  );


  addToCart([
    ...NewCarts,
    {
      product: item?.id,
      count: count - 1,
      variant: item?.variant?.id,
    },
  ]);
  };


  
  return (
    <div style={{display : "flex" , gap : "16px" , padding : "4px" , border :"1px solid var(--unicorn-silver)"}}>
      <button style={{background : "white" , border : "none" , fontSize :"22px"}} disabled={count === 0} onClick={decrement}>
        -
      </button>
      <span style={{fontSize :"22px"}}>{count}</span>
      <button style={{background : "white" , border : "none" , fontSize : "22px"}} onClick={increment}>+</button>
    </div>
  );
}

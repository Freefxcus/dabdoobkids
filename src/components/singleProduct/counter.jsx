import React, { useState } from "react";

export default function Counter({ initialValue }) {
  const [count, setCount] = useState(initialValue);
  const increment = () => {
    console.log(count,"incremented123");
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
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

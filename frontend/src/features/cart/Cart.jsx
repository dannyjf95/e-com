import React, { useEffect } from "react";

export default function Cart() {
  const body = {
    item: {
      id: 1,
      quantity: 10,
      size: "2",
    },
  };

  // useEffect(() => {
  //   // setTimeout(() => {
  //   const addToCart = async () => {
  //     const res = await fetch("http://localhost:5000/cart/add", {
  //       method: "POST",
  //       headers: { "Content-Type": " application/json" },
  //       body: body ? JSON.stringify(body) : null,
  //       credentials: "include", // Include cookies in the request
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     //   setCart(data);
  //     return data;
  //   };
  //   addToCart();
  //   // }, 3000);
  // }, []);
  return <div>cart</div>;
}

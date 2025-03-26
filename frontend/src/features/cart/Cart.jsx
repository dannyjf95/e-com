import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./cartThunk";
import { selectCart } from "./cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, cartFetchLoading, cartFetchRrror } = useSelector(selectCart);
  const body = {
    item: {
      id: 2,
      quantity: 1,
      size: "10",
    },
  };
  useEffect(() => {
    async function add(params) {
      const res = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include", // Include cookies in the request
      });
      const data = await res.json();
      // console.log(data);

      return data;
    }
    add();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchCart());
    }, 2000);
  }, []);
  // console.log("here", cart["guest cart"]);
  return (
    <div>
      {!cart["guest cart"] && !cart["user cart"] ? "Loading..." : null}
      {cart["guest cart"] && <pre>{JSON.stringify(cart["guest cart"], null, 3)}</pre>}
    </div>
  );
}

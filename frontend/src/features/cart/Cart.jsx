import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./cartThunk";
import { selectCart } from "./cartSlice";
import { selectUser } from "../login-logout/login/loginSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, cartFetchLoading, cartFetchRrror } = useSelector(selectCart);
  const user = useSelector(selectUser); //cahnges when user statsu is changed in dep arr(useEffect)
  useEffect(() => {
    dispatch(fetchCart());
  }, [user]);
  // console.log("here", cart["guest cart"]);
  return (
    <div>
      {!cart["guest cart"] && !cart["user cart"] ? "Loading..." : null}
      {cart["guest cart"] && <pre>{JSON.stringify(cart["guest cart"], null, 3)}</pre>}
      {cart["user cart"] && <pre>{JSON.stringify(cart["user cart"], null, 3)}</pre> }
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./cartThunk";
import { selectCart } from "./cartSlice";
import { selectUser } from "../login-logout/login/loginSlice";
import "./cart.css";
import { Link } from "react-router-dom";
export default function Cart() {
  const dispatch = useDispatch();
  const { cart, cartFetchLoading, cartFetchRrror } = useSelector(selectCart);
  const user = useSelector(selectUser); //cahnges when user stats is changed in dep arr(useEffect)

  useEffect(() => {
    dispatch(fetchCart());
  }, [user]);

  const typeOfUser = (cart && ["user cart"]) || (cart && cart["gust cart"]);
  const userCart = cart[typeOfUser];

  const items =
    userCart &&
    userCart.items.map((item) => {
      return {
        name: item.name,
        size: `UK ${item.size}`,
        space: "",
        price: `£${item.price}`,
        quantity: `QTY ${item.quantity}`,
      };
    });

  if (userCart === undefined) {
    return;
  }
  const cartTotal = userCart.total;
  // console.log(typeof userCart.cartTotal, userCart.cartTotal);
  return (
    <div>
      {!cart["guest cart"] && !cart["user cart"] ? "Loading..." : null}
      {cart["guest cart"] && <pre>{JSON.stringify(cart["guest cart"], null, 3)}</pre>}
      {cart["user cart"] && <pre>{JSON.stringify(cart["user cart"], null, 3)}</pre>}
      <div className="cart-box">
        <div className="items">
          Cart
          <ul className="item-details">
            {items.map((detail, idx) => (
              <li className="item-row" key={idx}>
                {Object.values(detail).map((detailValue, idx) => (
                  <span className="item-size" key={idx}>
                    {detailValue}
                  </span>
                ))}
                {/* <span>{detail.name} </span>
                <span>{detail.size}</span>
                <span></span> <span>£{detail.price}</span>
                <span>qty: {detail.quantity}</span> */}
              </li>
            ))}
          </ul>
        </div>
        <div className="total">total: {userCart.cartTotal}</div>
      </div>
    </div>
  );
}

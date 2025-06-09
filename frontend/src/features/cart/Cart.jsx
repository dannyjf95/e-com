import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteFromCart } from "./cartThunk";
import { selectCart } from "./cartSlice";
import { selectUser } from "../login-logout/login/loginSlice";
import "./cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, cartFetchLoading, cartFetchRrror } = useSelector(selectCart);
  const user = useSelector(selectUser); //cahnges when user stats is changed in dep arr(useEffect)

  useEffect(() => {
    dispatch(fetchCart());
  }, [user, dispatch]);

  for (let i in cart) {
    // console.log(cart);
  }

  let typeOfUser;
  if (cart["user cart"]) {
    typeOfUser = cart["user cart"];
  } else {
    typeOfUser = cart["guest cart"];
  }
  const userCart = typeOfUser;
console.log(userCart)
  const items =
    typeOfUser &&
    typeOfUser.items.map((item) => {
      console.log(item)
      return {
        name: item.name,
        size: item.size.toUpperCase(),
        space: "",
        price: `£${item.price}`,  
        quantity: `QTY ${item.quantity} `,
        button: <button onClick={() => dispatch(deleteFromCart({cartItemId: item.cartItemId}))}>Remove</button>,
      };
    });

  if (userCart === undefined) {
    return;
  }
  // const cartTotal = userCart.cartTotal;
  // console.log(typeof userCart.cartTotal, userCart.cartTotal);
  return (
    <div>
      <div className="cart-box">
        <div className="items">
          Cart
          <ul className="item-details">
            {items &&
              items.map((detail, idx) => (
                <li className="item-row" key={idx}>
                  {Object.values(detail).map((detailValue, idx) => (
                    <span className="item-detail" key={idx}>
                      {detailValue}
                    </span>
                  ))}
                </li>
              ))}
          </ul>
        </div>
        <div className="total">total: {userCart.cartTotal}</div>
      </div>
      {/* {!cart["guest cart"] && !cart["user cart"] ? "Loading..." : null}
      {cart["guest cart"] && <pre>{JSON.stringify(cart["guest cart"], null, 3)}</pre>}
      {cart["user cart"] && <pre>{JSON.stringify(cart["user cart"], null, 3)}</pre>} */}
    </div>
  );
}

/**
   
  
  */

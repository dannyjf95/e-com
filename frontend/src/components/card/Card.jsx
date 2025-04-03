import React from "react";
import "./card.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartThunk";

export default function Card({ item }) {
  const dispatch = useDispatch();
  const body = {
    item: {
      id: 6,
      quantity: 1,
      size: "xxl",
    },
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemName = formData.get("itemId");
    dispatch(addToCart(body));
    console.log(itemName);
  };
  //   console.log(item);
  if (item) {
    return (
      <div className="card-container">
        <div className="card-img">IMG</div>
        <div>{item.name}</div>
        <div>{item.price}</div>

        <form onSubmit={handleAddToCart}>
          <input type="hidden" value={item.id} name="itemId" />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
  return <div>Loading...</div>;
}

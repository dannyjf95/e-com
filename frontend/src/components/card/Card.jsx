import React, { useState } from "react";
import "./card.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartThunk";


/**  ADD WARNING MESSAGE FOR USER IN CARD  BOX FOR UNSELECTED VALUE WHEN SUBMITTING */
export default function Card({ item }) {
  // console.log(item);
  const [itemForm, setItemForm] = useState({ id: item.id, size: "", quantity: 1 });
  // console.log(itemForm);
  const dispatch = useDispatch();

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (itemForm.size === null || itemForm.size === "") {
      console.log("add values");
      return;
    }
    dispatch(
      addToCart({
        item: {
          id: item.id,
          quantity: itemForm.quantity,
          size: itemForm.size,
        },
      })
    );
  };
  //   console.log(item);
  if (item) {
    return (
      <div className="card-container">
        <div className="card-img">IMG</div>
        <div>{item.name}</div>
        <div>{item.price}</div>

        <form onSubmit={handleAddToCart}>
          {/* ITEM SHOP CARD */}
          <input type="hidden" value={item.id} name="itemId" />
          <select name="size" value={itemForm.size} onChange={handleItemChange} required>
            <option value="">Size</option>
            <option value="s">s</option>
            <option value="m">m</option>
            <option value="l">l</option>
          </select>
          {/* quntity */}

          <select name="quantity" value={itemForm.quantity} onChange={handleItemChange}>
            {[1, 2, 3, 4, 5].map((qty) => {
              return (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              );
            })}
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
  return <div>Loading...</div>;
}

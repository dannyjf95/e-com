import React from "react";
import "./card.css";

export default function Card({ item }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemName = formData.get("itemId");

    console.log(itemName);
  };
  //   console.log(item);
  if (item) {
    return (
      <div className="card-container">
        <div className="card-img">IMG</div>
        <div>{item.name}</div>
        <div>{item.price}</div>
       
        <form onSubmit={handleSubmit}>
          <input type="hidden" value={item.id} name="itemId" />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
  return <div>Loading...</div>;
}

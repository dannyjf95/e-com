import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function OrdersList() {
  console.log();
  return (
    <div className="order-list">
      <Link to="1">order1</Link>
      <Link to="1">order2</Link>
      <Link to="1">order3</Link>
    </div>
  );
}

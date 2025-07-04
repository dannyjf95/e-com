import React from "react";
import { selectUserOrders } from "./ordersSlice";

import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "./orders.css";

export default function OrdersList() {
  // console.log();
  const { userOrders, userOrdersError, userOrdersLoading } = useSelector(selectUserOrders);
  const orders = userOrders["user orders"];

  if (userOrdersLoading) {
    return <div>Loading..</div>;
  }
  return (
    <div className="order-list">
      <div>
        {orders &&
          orders.orders.map((order) => (
            //params  sent  here
            <Link to={`${order.orderId}`} key={order.orderId}>
              <div className="order-box">
                <span>Order id: {order.orderId}</span>
                <div className="details-box">
                  <span>items: {order.itemCount}</span>
                  <span>£{order.orderTotal}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

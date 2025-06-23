import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
//
import { selectUserOrders } from "./ordersSlice";
export default function Orders() {
  const { userOrders, userOrdersError, userOrdersLoading } = useSelector(selectUserOrders);

  if (userOrdersLoading) {
    <div>Loading orders...</div>;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

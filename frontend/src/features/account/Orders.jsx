import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { selectUserOrders } from "./accountSlice";
import { useSelector } from "react-redux";
export default function Orders() {
  const navigate = useNavigate();
  const { userOrders, userOrdersError, userOrdersLoading } = useSelector(selectUserOrders);
  console.log(userOrders);
  if (userOrdersLoading) {
    <div>Loading orders...</div>;
  }
  if (userOrdersError) {
    navigate(-1); //Navigatge to="/account"
  }
  return (
    <>
      <Outlet />
    </>
  );
}

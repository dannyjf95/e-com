import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import "./account.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuth } from "../login-logout/userAuthSlice";
import { fetchUserOrders } from "./account-orders/ordersThunk";
import { userLogout } from "../login-logout/logout/logoutThunk";

export default function Account() {
  const { user, userAuthLoading } = useSelector(selectUserAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
  
  if (userAuthLoading) {
    return <div>Loading your account...</div>;
  }

  if (!user) {
    return <div>User not logged in.</div>; // or redirect to /login if needed
  }
  const logout = () => {
    dispatch(userLogout());

    return <Navigate to="/" />;
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <div>LOGO</div>
        <Link to={"/"}>HOME</Link>
        <span>MY ACCOUNT</span>
      </div>
      <div className="account-content">
        <div className="account-nav-links">
          <div className="user">{`Hi, ${user.name[0].toUpperCase().slice(0)}${user.name.slice(1)}`}</div>
          <div className="pages">
            <Link to="/account/orders">Orders</Link>
            <Link to={"/logout"}>sign out</Link>
            <a>my details</a>
          </div>
        </div>
        {/* right contect section */}
        <div className="content-box">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

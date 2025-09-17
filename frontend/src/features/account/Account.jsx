import React, { useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

// import { ClipLoader } from "react-spinners";

import "./account.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuth } from "../login-logout/userAuthSlice";
import { fetchUserOrders } from "./account-orders/ordersThunk";


export default function Account() {
  const { user, userAuthLoading } = useSelector(selectUserAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to="/" />;
  }
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (userAuthLoading) {
    return <div>Loading your account...</div>;
  }

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
            <Link to={"/account/my-account"}>My account</Link>
            <Link to={"/logout"}>Sign out</Link>
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

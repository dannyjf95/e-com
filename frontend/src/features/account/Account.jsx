import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./account.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserSession } from "../login-logout/sessionCheck/userSessionSlice";

import { fetchUserOrders } from "./accountThunk";
import Orders from "./Orders";


export default function Account() {
  const { userSession, sessionLoading } = useSelector(selectUserSession);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
  //we access the data stored in the fetch that targets teh bnackend api endpoint
  // console.log(userSession);
  if (sessionLoading) {
    return <div>Loading your account...</div>;
  }

  if (!userSession) {
    return <div>User not logged in.</div>; // or redirect to /login if needed
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
          <div className="user">{`Hi, ${userSession.name}`}</div>
          <div className="pages">
            <Link to="/account/orders">Orders</Link>
            <a>sign out</a>
            <a>my details</a>
          </div>
        </div>

        {/* right contect  section */}

        <div className="content-box">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

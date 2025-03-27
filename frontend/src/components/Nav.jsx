import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/login-logout/login/loginSlice";
export default function Nav() {
  const { user, loginLoading, sessionLoading, loggedIn } = useSelector(selectUser);
  console.log(user);
  console.log(loggedIn);
  if (sessionLoading) return <p>Loading session...</p>;

  return (
    <>
      <div className="nav">
        <Link to={"/cart"}>Cart</Link>
        {user === null && <Link to={"/login"}>Login</Link>}
        {user && <span>{user.name}</span>}
      </div>
      <div className="nav">
        <Link to={"/"}>Home</Link>

        <Link to={"/counter"}>Counter</Link>

        <Link to={"/items"}>Items</Link>

        <Link to={"/categories"}>Categories</Link>
      </div>
    </>
  );
}

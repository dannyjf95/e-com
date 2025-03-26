import React from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { Link } from "react-router-dom";
import "./hero.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/login-logout/login/loginSlice";
export default function Hero() {
  const loggedIn = useSelector(selectUser);
  console.log(loggedIn);
  return (
    //here we would covert to nav link
    //loop over categories and Link to each paath  then rendering htat componets data
    // items as example
    <>
      <div className="nav">
        <Link to={"/cart"}>Cart</Link>
        {loggedIn.user === null && <Link to={"/login"}>Login</Link>}
        {loggedIn.user && loggedIn.user.user.name}
      </div>
      <div className="nav">
        <Link to={"/"}>Home</Link>

        <Link to={"/counter"}>Counter</Link>

        <Link to={"/items"}>Items</Link>

        <Link to={"/categories"}>Categories</Link>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

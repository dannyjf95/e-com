import React from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { Link } from "react-router-dom";
import "./hero.css";
export default function Hero() {
  return (
    //here we would covert to nav link
    //loop over categories and Link to each paath  then rendering htat componets data
    // items as example
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="nav">
        <Link to={"/counter"}>Counter</Link>

        <Link to={"/items/all"}>Items</Link>

        <Link to={"/cart"}>Cart</Link>

        <Link to={"/login"}>Login</Link>

        <Link to={"/categories"}>Categories</Link>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

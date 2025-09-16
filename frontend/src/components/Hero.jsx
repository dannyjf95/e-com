import React from "react";
import { Link } from "react-router-dom";
import "./hero.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuth } from "../features/login-logout/userAuthSlice";
import Categories from "../features/categories/Categories";
import Login from "../features/login-logout/login/Login";
// import { selectCategories } from "../features/categories/categoriesSlice";
export default function Hero() {
  //user
  const { user, userAuthLoading, userAuthError,  loggedIn } = useSelector(selectUserAuth);
  //categories shop
  // const categories = useSelector(selectCategories);

  // if (sessionLoading) return <p>Loading session...</p>;
// console.log(user)
  return (
    <div className="root">
      <div className="nav">
        <Link to={"/"}>Home/LOGO</Link>
        <Link to={"/cart"}>Cart</Link>

        {userAuthLoading ? (
          <p>Loading session...</p>
        ) : user === null ? (
          <Link to="/login">Login</Link>
        ) : (
          <span>
            <Link to="/account">{user.name}</Link>
          </span>
        )}
      </div>
      <div className="categories">
        <Categories />
      </div>
    </div>
  );
}

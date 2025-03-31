import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/login-logout/login/loginSlice";
// import { selectUserSession } from "../features/login-logout/sessionCheck/userSessionSlice";
import { fetchUserSession } from "../features/login-logout/sessionCheck/userSessionThunk";
export default function Nav() {
  const dispatch = useDispatch(selectUser);
  const { user, loginLoading, loginError, sessionLoading } = useSelector(selectUser);
  // const { userSession, sessionLoading, sessionError, loggedIn } = useSelector(selectUserSession);

  // useEffect(() => {
  //   // Check session when app loads
  //   dispatch(fetchUserSession());
  // }, [user]);

  if (sessionLoading) return <p>Loading session...</p>;

  return (
    <>
      <div className="nav">
        <Link to={"/cart"}>Cart</Link>
        {/* <Link to={"/login"}>Login</Link> */}
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

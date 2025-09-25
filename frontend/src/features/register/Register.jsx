import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuth } from "../login-logout/userAuthSlice";
import { fetchUserRegister } from "./registerThunk";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function SingUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectRegisterUser = useSelector(selectUserAuth);
  const { userAuthError, userCreatedSuccess, user, loggedIn } = selectRegisterUser;
  console.log(loggedIn);
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { name, username, email, password } = values;
    e.preventDefault();
    dispatch(fetchUserRegister({ name, username, email, password }));
    if (userCreatedSuccess) {
      navigate("/login");
    }
  };

  return (
    <div>
      {userAuthError && <p style={{ color: "red" }}>{userAuthError}</p>}
      {/*  */}
      REGISTER
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="email" />
        <input type="passowrd" name="password" placeholder="password" />
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="name" placeholder="name" />
        <input type="submit" />
      </form>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

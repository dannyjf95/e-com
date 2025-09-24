import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuth } from "../login-logout/userAuthSlice";
import { fetchUserRegister } from "./registerThunk";
import { Navigate, useNavigate } from "react-router-dom";

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
    dispatch(fetchUserRegister({ name, username, email, password })).then(() => {
      navigate("/login");
    });
  };

  return (
    <div>
      <div>{userAuthError ?? null}</div>
      REGISTER
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" />
        <input type="passowrd" name="password" />
        <input type="text" name="username" />
        <input type="text" name="name" />
        <input type="submit" />
      </form>
    </div>
  );
}

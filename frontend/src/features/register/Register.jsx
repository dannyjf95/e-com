import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuth } from "../login-logout/userAuthSlice";
import { fetchUserRegister } from "./registerThunk";
import { useNavigate } from "react-router-dom";

export default function SingUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectRegisterUser = useSelector(selectUserAuth);
  const { userAuthError, userCreatedSuccess, user } = selectRegisterUser;

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { name, username, email, password } = values;
    e.preventDefault();
    dispatch(fetchUserRegister({ name, username, email, password })).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <div>{userAuthError ?? null}</div>
      REGISTER
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" defaultValue="iren@iren.com" />
        <input type="passowrd" name="password" defaultValue="iren" />
        <input type="text" name="username" defaultValue="iren" />
        <input type="text" name="name" defaultValue="iren" />
        <input type="submit" />
      </form>
    </div>
  );
}

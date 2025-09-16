import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";
import { userLogout } from "./logoutThunk";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userLogout()).then(() => {
      navigate("/");
    });
  }, []);

  return <div>loading</div>;
}

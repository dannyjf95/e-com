import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "./loginThunk";
import { selectUser } from "./loginSlice";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { selectUserSession } from "../sessionCheck/userSessionSlice";

export default function Login() {
  const dispatch = useDispatch(selectUser);
  const navigate = useNavigate();
  const { user, userFetchLoading, userFetchError, loggedIn } = useSelector(selectUser);

  if (loggedIn) {
    return <Navigate to="/" />;
  }
  //turn into handler
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserLogin());
    navigate(-1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="submit" />
      </form>
      {!user && "Guest"}
    </div>
  );
}

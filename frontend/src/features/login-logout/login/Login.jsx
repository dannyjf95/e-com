import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "./loginThunk";
import { selectUser } from "./loginSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userFetchLoading, userFetchError, loggedIn } = useSelector(selectUser);

  if (loggedIn) {
    return <Navigate to="/" />;
  }
  //turn into handler
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserLogin({ username: "dan", password: "dan" }));
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

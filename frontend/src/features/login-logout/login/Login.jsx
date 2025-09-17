import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "./loginThunk";
import { selectUserAuth } from "../userAuthSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user, userAuthLoading, userAuthError, loggedIn } = useSelector(selectUserAuth);
  console.log(userAuthLoading, userAuthError);

  if (loggedIn) {
    return <Navigate to="/" />;
  }
  //turn into handler
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserLogin({ username: "dannyjf", password: "password123" }));
  };

  return (
    <div>
      {/* pop up sign in error */}
      {userAuthError && <p style={{ color: "red" }}>{userAuthError}</p>}
      {/*  */}
      <form onSubmit={handleSubmit}>
        <input type="submit" />
      </form>

      {"Guest"}
    </div>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "./loginThunk";
import { selectUserAuth } from "../userAuthSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user, userAuthLoading, userAuthError, loggedIn } = useSelector(selectUserAuth);
  // console.log(userAuthLoading, userAuthError);

  if (loggedIn) {
    return <Navigate to="/" />;
  }
  //turn into handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    const { email, password } = formValues;
    dispatch(fetchUserLogin({ email, password }));
  };

  return (
    <div>
      {/* pop up sign in error */}
      {userAuthError && <p style={{ color: "red" }}>{userAuthError}</p>}
      {/*  */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="email" required/>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit" />
      </form>

      {"Guest"}
    </div>
  );
}

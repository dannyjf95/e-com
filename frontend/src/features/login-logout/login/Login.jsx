import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "./loginThunk";
import { selectUser } from "./loginSlice";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, userFetchLoading, userFetchError, loggedIn } = useSelector(selectUser);
  const dispatch = useDispatch(selectUser);
  // console.log("is herer", loggedIn);
  const navigate = useNavigate();
  //we an use Navigate(-1) after sucessfully logging in
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
      {!user === null && <pre>{JSON.stringify(user, null, 3)}</pre>}
    </div>
  );
}

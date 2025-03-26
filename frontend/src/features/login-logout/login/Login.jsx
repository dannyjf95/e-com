import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "./loginThunk";
import { selectUser } from "./loginSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, userFetchLoading, userFetchError } = useSelector(selectUser);
  const dispatch = useDispatch(selectUser);
  const navigate = useNavigate();
  //we an use Navigate(-1) after sucessfully logging in

  //turn into handler
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserLogin());
    navigate(-1);
  };

  console.log(user);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="submit" />
      </form>
      {!user && "Guest"}
      {user && <pre>{JSON.stringify(user, null, 3)}</pre>}
    </div>
  );
}
   
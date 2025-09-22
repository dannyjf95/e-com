import React from "react";
import { selectUserAuth } from "../../login-logout/userAuthSlice";
import { useSelector } from "react-redux";

export default function UserAccount() {
  const selectUser = useSelector(selectUserAuth).user;
  const { name, username, email, password } = selectUser;
  console.log(name, username, email, password);
  return (
    <div>
      <div>
        <p>{name}</p>
      </div>
      <div>
        <p>{email}</p>
      </div>
    </div>
  );
}

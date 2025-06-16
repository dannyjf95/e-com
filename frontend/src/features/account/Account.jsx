import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./account.css";

//state
import { selectUserSession } from "../login-logout/sessionCheck/userSessionSlice";

export default function Account() {
  const { userSession, sessionLoading } = useSelector(selectUserSession);

  console.log(selectUserSession);
  console.log(userSession);
  if (sessionLoading) {
    return <div>'dsggsgsgg'</div>;
  }
  return (
    <>
      <div className="account-container">
        <div className="account-header">
          <div>LOGO</div>
          <Link to={"/"}>HOME</Link>
          <span>MY ACCOUNT</span>
        </div>
        <div className="user">{userSession && `Hi, ${userSession.name}`}</div>
        <div className="pages">
          <a>Orders</a>
          <a>sign out</a>
          <a>my details</a>
        </div>
      </div>
    </>
  );
}

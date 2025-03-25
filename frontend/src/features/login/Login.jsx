import React, { useEffect } from "react";

export default function Login() {
  const user = {
    username: "dan",
    password: "dan",
  };

  // useEffect(() => {
  //   const login = async () => {
  //     const res = await fetch("http://localhost:5000/account/login", {
  //       method: "POST",
  //       headers: { "Content-Type": " application/json" },
  //       body: user ? JSON.stringify(user) : null,
  //       credentials: "include", // Include cookies in the request
  //     });
  //     const data = await res.json();
  //     console.log(data)
  //     return data;
  //   };
  //   login();
  // }, []);

  return <div>cart</div>;
}

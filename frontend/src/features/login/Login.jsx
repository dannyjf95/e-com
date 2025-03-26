import React, { useEffect, useState } from "react";

export default function Login() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const user = {
      username: "dan",
      password: "dan",
    };
    const login = async () => {
      const res = await fetch("http://localhost:5000/account/login", {
        method: "POST",
        headers: { "Content-Type": " application/json" },
        body: user ? JSON.stringify(user) : null,
        credentials: "include", // Include cookies in the request
      });
      const data = await res.json();
      console.log(data);
      setData(data);
      // return data;
    };
    login();
  }, []);
  console.log(data)

  return <div>{data  && <pre>{JSON.stringify(data, null, 3)}</pre>}</div>;
}

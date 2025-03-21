import React, { useState, useEffect } from "react";
const api = "http://localhost:5000/items/all";

export default function Items() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(api);
      const json = await data.json();
      setData(json);
    
    };
    fetchData();
  }, []);

  data != null ? console.log(data) : null;

  return <div>Items</div>;
}

import React from "react";
import { Link } from "react-router-dom";

export default function SubCategories({ data }) {
  console.log(data.catname);
  const { catname } = data;
  // <Link to={`categories/`}>{name}</Link>
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data &&
        data.subCats.map((sub, idx) => {
          return (
            <Link key={idx} to={`categories/${catname}/${sub.name}`}>
              {sub.name}
            </Link>
          );
        })}
    </div>
  );
}

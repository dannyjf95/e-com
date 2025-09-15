import React from "react";
import { Link } from "react-router-dom";

export default function SubCategories({ data, curCat }) {

  const subCatNames = data.Sub_categories.map((subName) => {
    return <Link to={`categories/${curCat}/${subName.name}`}>{subName.name}</Link>;
  });
  // console.log(subCatNames);
  return <div className="subcats">{subCatNames}</div>;
}
//

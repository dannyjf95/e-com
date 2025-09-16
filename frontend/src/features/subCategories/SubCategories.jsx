import React from "react";
import { Link } from "react-router-dom";

export default function SubCategories({ data, curCat }) {

  const subCatNames = data.Sub_categories.map((subName,  idx) => {
    return <Link  key={idx} to={`categories/${curCat}/${subName.name}`}>{subName.name}</Link>;
  });
  // console.log(subCatNames);
  return <div className="subcats">{subCatNames}</div>;
}
//

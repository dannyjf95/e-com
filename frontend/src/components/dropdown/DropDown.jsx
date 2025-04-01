import React from "react";
import SubCategories from "../../features/subCategories/SubCategories";
import { Link } from "react-router-dom";

export default function DropDown({ data }) {
  console.log(data);
  const details = {
    catname: data.name,
    subCats: data["Sub_categories"],
  };

  return <div className="cat-box">{data && <SubCategories data={details} />}</div>;
}

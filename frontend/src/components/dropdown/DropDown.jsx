import React from "react";
import SubCategories from "../../features/subCategories/SubCategories";
import { Link } from "react-router-dom";
import "./dropdown.css";
export default function DropDown({ data }) {
  // console.log(data);
  const details = {
    catname: data.name,
    subCats: data["Sub_categories"],
    id: data.id,
  };

  return <div className="dropdown">{data && <SubCategories key={details.id} data={details} />}</div>;
}

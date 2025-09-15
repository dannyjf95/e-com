import React from "react";
import SubCategories from "../../features/subCategories/SubCategories";

import "./dropdown.css";
export default function DropDown({ data, curCat }) {
  // console.log(curCat);
  // console.log(data.cat);
  return <div className="dropdown">{data && <SubCategories data={data} curCat={curCat}/>}</div>;
}

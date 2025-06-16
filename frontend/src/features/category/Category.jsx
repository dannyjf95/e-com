import React, { useState } from "react";
import "./category.css";
import DropDown from "../../components/dropdown/DropDown";

export default function Category({ category }) {
  const [subsVisible, setSubsVisible] = useState(false);
  // console.log(category);
  return (
    //onmouseover
    <div  className="category" onMouseEnter={() => setSubsVisible(true)} onMouseLeave={() => setSubsVisible(setSubsVisible(false))}>
      <div className="category-name"> {category.name}</div>
      <div className="sub-cat-dropdown">{subsVisible && <DropDown data={category} />}</div>
      {/* <div className="sub-cat-dropdown">{<DropDown data={category} />}</div> */}
    </div>
  );
}

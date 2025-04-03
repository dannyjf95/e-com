import React, { useState } from "react";
import "./category.css";
import DropDown from "../../components/dropdown/DropDown";

export default function Category({ category }) {
  const [subsVisible, setSubsVisible] = useState(false);
  // console.log(category);
  return (
    //onmouseover
    <div onMouseEnter={() => setSubsVisible(true)} onMouseLeave={() => setSubsVisible(setSubsVisible(false))}>
      {category.name}
      {subsVisible && <DropDown data={category} />}
    </div>
  );
}

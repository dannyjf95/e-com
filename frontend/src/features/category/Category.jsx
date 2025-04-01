import React, { useState } from "react";
import "./category.css";
import DropDown from "../../components/dropdown/DropDown";

export default function Category({ category }) {
  const [subsVisible, setSubsVisible] = useState(false);
  // console.log(category);
  return (
    //onmouseover
    <div onClick={() => setSubsVisible(true)}>
      {category.name}
      {subsVisible && <DropDown data={category} />}
    </div>
  );
}

import React, { useState } from "react";
import "./category.css";

export default function Category({ category, visible, setVisible, setCurCat }) {
  const mouseEnter = () => {
    setCurCat(category.name);
    setVisible(true);
  };
  return (
    //onmouseover
    <>
      <div className="category" onMouseEnter={mouseEnter} >
        <div className="category-name">{category.name}</div>
      </div>
    </>
  );
}

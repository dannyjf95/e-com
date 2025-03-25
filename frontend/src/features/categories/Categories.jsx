import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./categoriesThunk";
import { selectCategories } from "./categoriesSlice";

export default function Categories() {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Category Component Rendered");
    dispatch(fetchCategories());
  }, [dispatch]);
  
  return <div>Categories</div>;
}

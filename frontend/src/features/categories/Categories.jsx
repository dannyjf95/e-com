import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./categoriesThunk";
import { selectCategories } from "./categoriesSlice";
// import SubCategories from "../subCategories/SubCategories";
import Category from "../category/Category";
import "./categories.css";

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, categoriesFetchLoading, categoriesFetchError } = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (categories != []) {
    // console.log(categories);
  }

  return (
    <div className="cat-container">
      {categories.rows &&
        categories.rows.map((category, idx) => {
          return <Category key={idx} category={category} />;
        })}
    </div>
  );
}


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./categoriesThunk";
import { selectCategories } from "./categoriesSlice";

export default function Categories() {
  const { categories, categoriesFetchLoading, categoriesFetchError } = useSelector(selectCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("Category Component Rendered");
    dispatch(fetchCategories());
  }, []);
  console.log(categories);
  return (
    <div>
      {categoriesFetchLoading ? (
        <p>loading</p>
      ) : categories.length > 0 ? (
        <pre>{JSON.stringify(categories, null, 3)}</pre>
      ) : (
        <p>{categoriesFetchError && categoriesFetchError}</p>
      )}
    </div>
  );
}

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
  // console.log(categories);
  return (
    <div>
      {categoriesFetchError && <p>{categoriesFetchError.error}</p>}
      {categoriesFetchLoading && <p>loading</p>}
      {categories.rows && <pre>{JSON.stringify(categories.rows, null, 3)}</pre>}
    </div>
  );
}

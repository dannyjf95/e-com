import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "./itemsThunk";
import { selectItems } from "./itemsSlice";
export default function Items() {
  const { items, itemFetchLoading, itemFetchError } = useSelector(selectItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchItems());
    }, 3000);
  }, []);

  // data != null ? console.log(data.items.map((item) => item.name)) : null;
  // console.log(data);

  return (
    <div>
      {itemFetchError ? (
        <p>{itemFetchError}</p>
      ) : items.length > 0 ? (
        <pre>{JSON.stringify(items, null, 1)}</pre>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

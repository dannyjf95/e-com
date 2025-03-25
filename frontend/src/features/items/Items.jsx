import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "./itemsThunk";
import { selectItems } from "./itemsSlice";

export default function Items() {
  const { items, itemFetchLoading, itemFetchError } = useSelector(selectItems);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("items Component Rendered");
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div>
      {itemFetchLoading ? (
        <p>loading</p>
      ) : items.length > 0 ? (
        <pre>{JSON.stringify(items, null, 3)}</pre>
      ) : (
        <p>{itemFetchError && itemFetchError}</p>
      )}
    </div>
  );
}

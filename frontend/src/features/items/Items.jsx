import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "./itemsThunk";
import { selectItems } from "./itemsSlice";

export default function Items({state}) {
  const { items, itemFetchLoading, itemFetchError } = useSelector(selectItems);
  const dispatch = useDispatch();
  console.log(state)

  useEffect(() => {
    // console.log("items Component Rendered");
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div>
      <p>{itemFetchError && itemFetchError.error}</p>
      {itemFetchLoading && <p>loading</p>}
      {items.length > 0 && <pre>{JSON.stringify(items, null, 3)}</pre>}
      ITEMS  PAGE
    </div>
  );
}

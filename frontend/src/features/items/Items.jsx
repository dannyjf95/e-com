import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "./itemsThunk";
import { selectItems } from "./itemsSlice";
import { useParams } from "react-router-dom";

export default function Items() {
  const { items, itemFetchLoading, itemFetchError } = useSelector(selectItems);
  const dispatch = useDispatch();
  const { catname, subcatname } = useParams();

  useEffect(() => {
    const params = {};
    if (catname) params.catname = catname;
    if (subcatname) params.subcatname = subcatname;

    dispatch(fetchItems(params)); // Now passing params properly
  }, [dispatch, catname, subcatname]);
  // console.log(items);
  return (
    <div>
      {/* <p>{itemFetchError && itemFetchError.error}</p>
      {itemFetchLoading && <p>loading</p>}
      {items.length > 0 && <pre>{JSON.stringify(items, null, 3)}</pre>} */}
      ITEMS PAGE
    </div>
  );
}

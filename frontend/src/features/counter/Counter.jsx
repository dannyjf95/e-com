import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount, increment } from "./countSlice";

export default function Counter() {
  //select &  dispatch
  const countSelector = useSelector(selectCount);
  const dispatch = useDispatch();
  //
  return (
    <>
      <div className="card">
        <button onClick={() => dispatch(increment())}>count is {countSelector}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

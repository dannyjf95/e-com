import React, { useEffect } from "react";
import { fetchUserOrder } from "./orderThunk";
import { useDispatch, useSelector } from "react-redux";
import { selectUserOrder } from "./orderSlice";
import { useParams } from "react-router-dom";

//
import "./order.css";
export default function OrderSummary() {
  const { id } = useParams();
  const { userOrder, userOrderLoading, userOrderError } = useSelector(selectUserOrder);
  const order = userOrder && userOrder["user order"] && userOrder["user order"].items;
  console.log(order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrder({ params: id }));
  }, [dispatch]);
  // console.log(userOrder);

  return (
    <div className="order-details-box">
      {/* <div>£{order && order.orderTotal}</div> */}

      {order &&
        order.map((item) => (
          <>
            {/* make into <Card/> */}
            <div className="order-detail">
              <span>
                {item.name[0].toUpperCase()}
                {item.name.slice(1)}
              </span>
              <span>£{item.price}</span>
              <span>size: {item.size}</span>
              <span>qty: {item.quantity}</span>
            </div>
          </>
        ))}
    </div>
  );
}

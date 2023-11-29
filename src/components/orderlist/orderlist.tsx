"use client";
import React, { useState, useEffect } from "react";
import Ordercard from "@/components/ordercard/ordercard";
import { useGetOrderLists } from "./getorderlist";

export default function OrderList({
  isFinish,
}: {
  isFinish: boolean;
}): React.ReactNode {
  const { orderList } = useGetOrderLists();

  return (
    <div className="grid lg:grid-flow-col lg:auto-cols-max">
      {orderList &&
        orderList
          .filter((order) => order.isFinish === isFinish)
          .map((order) => <Ordercard key={order.id} {...order} />)}
    </div>
  );
}

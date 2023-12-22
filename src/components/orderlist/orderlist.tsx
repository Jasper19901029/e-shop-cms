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
    <div className="grid grid-cols-1 sm:grid-cols-2  min-[900px]:grid-cols-3 min-[1150px]:grid-cols-4 min-[1400px]:grid-cols-5">
      {orderList &&
        orderList
          .filter((order) => order.isFinish === isFinish)
          .map((order) => <Ordercard key={order.id} {...order} />)}
    </div>
  );
}

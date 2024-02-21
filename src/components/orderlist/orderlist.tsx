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
  const sortOrder = orderList
    ?.map((order) => order)
    .sort((a, b) => Number(b.createDate) - Number(a.createDate));

  return (
    <div className="flex flex-row flex-wrap ml-8">
      {sortOrder &&
        sortOrder
          .filter((order) => order.isFinish === isFinish)
          .map((order) => <Ordercard key={order.id} {...order} />)}
    </div>
  );
}

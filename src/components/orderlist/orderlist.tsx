"use client";
import React from "react";
import Ordercard from "@/components/ordercard/ordercard";
import { useGetOrderLists } from "./getorderlist";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <Table className="w-full">
      <TableCaption>訂單資訊</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">編輯</TableHead>
          <TableHead className="">訂單日期</TableHead>
          <TableHead className="">姓名</TableHead>
          <TableHead className=" text-center">電話</TableHead>
          <TableHead className="hidden sm:table-cell">付款方式</TableHead>
          <TableHead className="hidden sm:table-cell w-[250px]">
            訂單內容
          </TableHead>
          <TableHead className="hidden sm:table-cell w-[250px]">備註</TableHead>
          <TableHead className="hidden sm:table-cell">訂單金額</TableHead>
          <TableHead className="">列印</TableHead>
          <TableHead className="">刪除</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortOrder &&
          sortOrder
            .filter((order) => order.isFinish === isFinish)
            .map((order) => (
              <TableRow key={order.id}>
                <Ordercard {...order} />
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

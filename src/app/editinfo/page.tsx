"use client";
import { ReactNode } from "react";
import Poductinfo from "./Poductinfo";
import { useGetProduct } from "./getData";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EditInfo(): ReactNode {
  const fruitProduct = useGetProduct("水果");
  const driedFruitProduct = useGetProduct("果乾");

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="">產品名稱</TableHead>
          <TableHead className="">產品價格</TableHead>
          <TableHead className="">現有庫存</TableHead>
          <TableHead className=" text-center">產品單位</TableHead>
          <TableHead className="hidden sm:table-cell">編輯頁面</TableHead>
          <TableHead className="hidden sm:table-cell w-[250px]">
            銷售狀態
          </TableHead>
          <TableHead className="hidden sm:table-cell w-[250px]">刪除</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {driedFruitProduct.productData &&
          driedFruitProduct.productData.map((product) => (
            <TableRow key={product.productName}>
              <Poductinfo key={product.productName} {...product} />
            </TableRow>
          ))}
        {fruitProduct.productData &&
          fruitProduct.productData.map((product) => (
            <TableRow key={product.productName}>
              <Poductinfo key={product.productName} {...product} />
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

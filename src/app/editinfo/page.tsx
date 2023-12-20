"use client";
import { ReactNode } from "react";

import Poductinfo from "./Poductinfo";

import { useGetProduct } from "./getData";

export default function EditInfo(): ReactNode {
  const fruitProduct = useGetProduct("水果");
  const driedFruitProduct = useGetProduct("果乾");

  return (
    <>
      {" "}
      <div className="w-full flex justify-around mt-4 text-center items-center">
        <span className="w-[100px] before:content-['產品'] before:lg:content-['產品名稱']"></span>
        <span className="w-[80px] before:content-['價格'] before:lg:content-['現在價格']"></span>
        <span className="w-[80px] before:content-['庫存'] before:lg:content-['現有庫存']"></span>
        <span className="w-[50px] before:content-['單位'] before:lg:content-['單位']"></span>
        <span className="w-[80px] before:content-['編輯'] before:lg:content-['編輯頁面']"></span>
        <span className="w-[80px] before:content-['銷售'] before:lg:content-['銷售狀態']"></span>
        <span className="w-[80px] before:content-['刪除'] before:lg:content-['刪除']"></span>
      </div>
      {driedFruitProduct.productData &&
        driedFruitProduct.productData.map((product) => (
          <Poductinfo key={product.productName} {...product} />
        ))}
      {fruitProduct.productData &&
        fruitProduct.productData.map((product) => (
          <Poductinfo key={product.productName} {...product} />
        ))}
    </>
  );
}

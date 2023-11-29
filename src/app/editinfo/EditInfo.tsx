"use client";
import { ReactNode } from "react";
import Poductinfo from "./Poductinfo";
import { useGetProduct } from "./getData";

export default function EditInfo(): ReactNode {
  const fruitProduct = useGetProduct("水果");
  const driedFruitProduct = useGetProduct("果乾");

  return (
    <div className="w-[1000px] h-[600px] bg-[white]">
      {driedFruitProduct.productData &&
        driedFruitProduct.productData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
      {fruitProduct.productData &&
        fruitProduct.productData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
    </div>
  );
}

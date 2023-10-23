"use client";
import { ReactNode } from "react";
import Poductinfo from "./Poductinfo";
import { useGetDriedFruitsData, useGetFruitsData } from "./getData";

export default function EditInfo(): ReactNode {
  const { driedFruitsData } = useGetDriedFruitsData();
  const { fruitsData } = useGetFruitsData();

  return (
    <div className="w-[1000px] h-[600px] bg-[white]">
      {driedFruitsData &&
        driedFruitsData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
      {fruitsData &&
        fruitsData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
    </div>
  );
}

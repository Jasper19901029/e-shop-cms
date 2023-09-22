"use client";
import { ReactNode } from "react";
import Poductinfo from "./Poductinfo";
import { getDriedFruitsData, getFruitsData } from "./getData";

export default function EditInfo(): ReactNode {
  const { driedFruitsData } = getDriedFruitsData();
  const { fruitsData } = getFruitsData();

  return (
    <div className="w-[1000px] h-[600px] bg-[white]">
      {fruitsData &&
        fruitsData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}

      {driedFruitsData &&
        driedFruitsData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
    </div>
  );
}

"use client";
import { ReactNode, useState, useEffect } from "react";

import Poductinfo from "./Poductinfo";

import { getDriedFruitsData, getFruitsData } from "./getData";

export default function EditInfo(): ReactNode {
  const { driedFruitsData } = getDriedFruitsData();
  const { fruitsData } = getFruitsData();

  return (
    <div className="w-[80vw] h-[80vh] bg-[pink] m-auto">
      <h2 className="text-2xl mb-4">編輯頁面</h2>
      <span className="border-2 border-black rounded w-[50px] block text-center mb-4">
        水果
      </span>
      {fruitsData &&
        fruitsData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
      <span className="border-2 border-black rounded w-[50px] block text-center">
        果乾
      </span>
      {driedFruitsData &&
        driedFruitsData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
    </div>
  );
}

/*
  const [products, setProduct] = useState<GetProduct[]>([]);
  const [category, setCategory] = useState(products);
  // const [products, setProduct] = useState<GetProduct[]>();
  useEffect(() => {
    const getCategory = async () => {
      setProduct(await getProduct());
    };
    getCategory();
  }, []);


      {category &&
        category.map((product) => (
          <div key={product.name}>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.unit}</p>
            <p>{product.quantity}</p>
          </div>
        ))}


*/

/*
[
    {
        種類: "香蕉",
        品種: [
            {
                id: "",
                品名: "芭蕉",
                url: "",
                單位: "斤",
                價格: 50
            }
        ]
    },
    {
        種類: "番茄",
        品種: [
            {
                id: "",
                品名: "芭蕉",
                url: "",
                單位: "斤",
                價格: 50
            }
        ]        
    }
]
*/

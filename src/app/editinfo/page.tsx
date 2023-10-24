"use client";
import { ReactNode, useState, useEffect } from "react";

import Poductinfo from "./Poductinfo";

import {
  useGetDriedFruitsData,
  useGetFruitsData,
  useGetProduct,
} from "./getData";

export default function EditInfo(): ReactNode {
  const { driedFruitsData } = useGetDriedFruitsData();
  const { fruitsData } = useGetFruitsData();
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
        <span className="w-[80px] before:content-['刪除'] before:lg:content-['刪除']"></span>
      </div>
      {/* {fruitsData &&
        fruitsData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
      {driedFruitsData &&
        driedFruitsData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))} */}
      {driedFruitProduct.productData &&
        driedFruitProduct.productData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
      {fruitProduct.productData &&
        fruitProduct.productData.map((product) => (
          <Poductinfo key={product.name} {...product} />
        ))}
    </>
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

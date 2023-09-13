"use client";
import Link from "next/link";
import Input from "@/components/input/input";
import { Product, editProduct } from "@/utils/filebase/firebase";
import { useState } from "react";

export default function Poductinfo({
  name,
  price,
  quantity,
  productUrl,
  type,
  unit,
  category,
  introduction,
  isSell,
}: Product): React.ReactNode {
  const [productField, setProductField] = useState<Product>({
    name: name,
    type: type,
    productUrl: productUrl,
    unit: unit,
    price: price,
    quantity: quantity,
    category: category,
    introduction,
    isSell: isSell,
  });

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price" || name === "quantity") {
      setProductField({ ...productField, [name]: Number(value) });
    }
    setProductField({ ...productField, [name]: value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editProduct(productField);
  };

  return (
    <form onClick={submitHandler} className="flex flex-row">
      <p className="w-[100px]">{name}</p>
      <Input
        className="border-2 border-slider border-black-500 mr-2 w-[100px] "
        label="價格"
        id="price"
        name="price"
        type="text"
        htmlFor="price"
        placeholder="請輸入要修改的金額"
        onChange={handlerChange}
        required
      />
      <p>現在的金額:{price}</p>
      <p className="w-[100px]">/{unit}</p>
      <Input
        className="border-2 border-slider border-black-500 mr-2 w-[100px]"
        label="數量"
        id="quantity"
        name="quantity"
        type="text"
        htmlFor="quantity"
        placeholder="請輸入要修改的數量"
        onChange={handlerChange}
        required
      />
      <p>
        現在的數量:{quantity}
        {unit}
      </p>
      <button className="ml-2">確定修改</button>
      <Link href={`/editinfo/${name}`}>{name}</Link>
    </form>
  );
}

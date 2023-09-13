"use client";
import Image from "next/image";
import Input from "@/components/input/input";
import {
  Product,
  editProduct,
  uploadToStorage,
} from "@/utils/filebase/firebase";
import { useState, useRef } from "react";

export default function EditProduct({
  name,
  price,
  quantity,
  productUrl,
  type,
  unit,
  category,
  introduction,
  isSell,
  inspectionUrl1,
  inspectionUrl2,
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
    inspectionUrl1: inspectionUrl1,
    inspectionUrl2: inspectionUrl2,
  });

  const [productImage, setProductImage] = useState<File>();
  const [inspectionImage1, setInspectionImage1] = useState<File>();
  const [inspectionImage2, setInspectionImage2] = useState<File>();

  const productImageRef = useRef<HTMLInputElement | null>(null);
  const inspectionImage1Ref = useRef<HTMLInputElement | null>(null);
  const inspectionImage2Ref = useRef<HTMLInputElement | null>(null);

  const handleInputToStorage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { name } = e.target;
    if (!e.target.files) {
      return;
    }
    setProductField({
      ...productField,
      [name]: await uploadToStorage(e.target.files[0]),
    });
  };

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

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductField({ ...productField, [name]: value });
  };

  const onSubmitToFirebase = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      await editProduct({
        ...productField,
      });

      alert("修改成功");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitToFirebase} className="flex flex-col">
      <span className="w-[100px]">{name}</span>
      <Input
        className="border-2 border-slider border-black-500 mr-2 w-[100px] "
        label="價格"
        id="price"
        name="price"
        type="text"
        htmlFor="price"
        placeholder="請輸入要修改的金額"
        onChange={handlerChange}
      />
      <span>現在的金額:{price}</span>
      <span className="w-[100px]">/{unit}</span>
      <Input
        className="border-2 border-slider border-black-500 mr-2 w-[100px]"
        label="數量"
        id="quantity"
        name="quantity"
        type="text"
        htmlFor="quantity"
        placeholder="請輸入要修改的數量"
        onChange={handlerChange}
      />
      <span>
        現在的數量:{quantity}
        {unit}
      </span>
      <div className="flex items-center">
        <label htmlFor="introduction" className="mt-4 w-[100px]">
          產品介紹:
        </label>
        <textarea
          id="introduction"
          onChange={handleTextAreaChange}
          name="introduction"
          value={introduction}
          className="w-[500px] h-[150px] border-2 border-slider border-black mb-2 resize-none"
        />
      </div>
      <div>
        <label className="mr-2 w-[200px] text-center">產品圖片上傳:</label>
        <input
          className="ml-2 mb-2 w-[200px]"
          id="productUrl"
          name="productUrl"
          type="file"
          ref={productImageRef}
          onChange={handleInputToStorage}
        />
        <Image src={productUrl} width={100} height={100} alt="hi" />
        <div>
          <label className="mr-2 w-[150px]">檢驗報告上傳:</label>
          <input
            className="ml-2 mb-2 w-[200px]"
            id="inspectionUrl1"
            name="inspectionUrl1"
            type="file"
            ref={inspectionImage1Ref}
            onChange={handleInputToStorage}
          />
          {inspectionUrl1 && (
            <Image src={inspectionUrl1} width={100} height={100} alt="hi" />
          )}
        </div>
        <div>
          <label className="mr-2 w-[150px]">檢驗報告上傳:</label>
          <input
            className="ml-2 mb-2 w-[200px]"
            id="inspectionUrl2"
            name="inspectionUrl2"
            type="file"
            ref={inspectionImage2Ref}
            onChange={handleInputToStorage}
          />
          {inspectionUrl2 && (
            <Image src={inspectionUrl2} width={100} height={100} alt="hi" />
          )}
        </div>
      </div>
      <button className="ml-2">確定修改</button>
    </form>
  );
}

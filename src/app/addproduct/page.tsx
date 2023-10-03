"use client";
import { useState, ReactNode, useRef } from "react";
import {
  uploadToStorage,
  Product,
  addNewProduct,
} from "@/utils/filebase/firebase";
import Input from "@/components/input/input";

const defaultField: Product = {
  name: "",
  type: "",
  productUrl: "",
  unit: "",
  price: 0,
  quantity: 0,
  category: "",
  inspectionUrl1: "",
  inspectionUrl2: "",
  introduction: "",
  isSell: true,
};

export default function AddProduct(): ReactNode {
  const [productImage, setProductImage] = useState<File>();
  const [inspectionImage1, setInspectionImage1] = useState<File>();
  const [inspectionImage2, setInspectionImage2] = useState<File>();
  const [productImageKey, setProductImageKey] = useState(0);
  const [inspectionImage1Key, setInspectionImage1Key] = useState(1);
  const [inspectionImage2Key, setInspectionImage2Key] = useState(2);

  const productImageRef = useRef<HTMLInputElement | null>(null);
  const inspectionImage1Ref = useRef<HTMLInputElement | null>(null);
  const inspectionImage2Ref = useRef<HTMLInputElement | null>(null);

  const [productField, setProductField] = useState<Product>(defaultField);
  const { name, type, unit, price, quantity, category, introduction } =
    productField;
  const handleInputToStorage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { name } = e.target;
    if (!e.target.files) {
      return;
    }
    switch (name) {
      case "productUrl":
        setProductImage(e.target.files[0]);
        break;
      case "inspectionUrl1":
        setInspectionImage1(e.target.files[0]);
        break;
      case "inspectionUrl2":
        setInspectionImage2(e.target.files[0]);
        break;
    }
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductField({ ...productField, [name]: value });
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
      if (!productImage || !inspectionImage1 || !inspectionImage2) return;
      const productUrl = await uploadToStorage(productImage);
      const inspectionUrl1 = await uploadToStorage(inspectionImage1);
      const inspectionUrl2 = await uploadToStorage(inspectionImage2);
      await addNewProduct({
        ...productField,
        productUrl: productUrl,
        inspectionUrl1: inspectionUrl1,
        inspectionUrl2: inspectionUrl2,
      });
      reset();
      alert("新增成功");
    } catch (error) {
      console.log(error);
    }
  };

  const reset = (): void => {
    setProductField(defaultField);
    productImageRef.current = null;
    inspectionImage1Ref.current = null;
    inspectionImage2Ref.current = null;
    setProductImageKey((pre) => pre + Math.random() * 10);
    setInspectionImage1Key((pre) => pre + Math.random() * 10);
    setInspectionImage2Key((pre) => pre + Math.random() * 10);
  };

  // h2 :text-[25px] mt-[30px]
  // 1 div:w-[85vw] h-[80vh] bg-[white] flex text-[20px]
  //產品名字、產品價格、產品單位、產品類別、產品數量:rounded-[4px] border-2 border-slider border-black focus:outline-none focus:border-blue-800 ml-2 mb-2 w-[150px]
  return (
    <div>
      <h2 className="">新增產品</h2>
      <div className="">
        <form onSubmit={onSubmitToFirebase} className="m-auto">
          <Input
            className=""
            label="產品名字"
            id="name"
            name="name"
            type="text"
            htmlFor="name"
            placeholder="請輸入產品名字"
            value={name}
            onChange={handlerChange}
            required
          />
          <Input
            className=""
            label="產品價格"
            id="price"
            name="price"
            type="number"
            htmlFor="price"
            placeholder="請輸入產品價格"
            value={price}
            onChange={handlerChange}
            required
          />
          <Input
            className=""
            label="產品單位"
            id="unit"
            name="unit"
            type="text"
            htmlFor="unit"
            placeholder="請輸入產品單位"
            value={unit}
            onChange={handlerChange}
            required
          />
          <Input
            className=""
            label="產品類別"
            id="type"
            name="type"
            type="text"
            htmlFor="type"
            placeholder="請輸入產品類別"
            value={type}
            onChange={handlerChange}
            required
          />
          <Input
            className=""
            label="產品數量"
            id="quantity"
            name="quantity"
            type="number"
            htmlFor="quantity"
            placeholder="請輸入產品數量"
            min={0}
            value={quantity}
            onChange={handlerChange}
            required
          />
          {/* 
            fieldset:flex flex-row 
            fieldset內input:border-2 border-slider border-black ml-2 mb-2 w-[35px]
          */}
          <fieldset className="">
            <legend>
              產品類別:
              <Input
                className=""
                label="水果"
                id="水果"
                name="category"
                type="radio"
                htmlFor="水果"
                value="水果"
                onChange={handlerChange}
                required
                checked={category === "水果"}
              />
              <Input
                className=""
                label="果乾"
                id="果乾"
                name="category"
                type="radio"
                htmlFor="果乾"
                value="果乾"
                onChange={handlerChange}
                required
                checked={category === "果乾"}
              />
            </legend>
          </fieldset>
          {/*
            div:flex items-center
            label:mt-4 w-[100px]
            textarea:w-[500px] h-[150px] border-2 border-slider border-black mb-2 resize-none
          */}
          <div className="">
            <label htmlFor="introduction" className="">
              產品介紹:
            </label>
            <textarea
              id="introduction"
              onChange={handleTextAreaChange}
              name="introduction"
              value={introduction}
              className=""
            />
          </div>
          <div>
            {/* 
              label:mr-2 w-[200px] text-center
              input:ml-2 mb-2 w-[200px]
            */}
            <label className="">產品圖片上傳:</label>
            <input
              className=""
              id="productUrl"
              name="productUrl"
              type="file"
              key={productImageKey}
              ref={productImageRef}
              onChange={handleInputToStorage}
              required
            />
            <div>
              {/* 
                label:mr-2 w-[200px] text-center
                input:ml-2 mb-2 w-[200px]
              */}
              <label className="">檢驗報告上傳:</label>
              <input
                className=""
                id="inspectionUrl1"
                name="inspectionUrl1"
                type="file"
                key={inspectionImage1Key}
                ref={inspectionImage1Ref}
                onChange={handleInputToStorage}
                required
              />
            </div>
            <div>
              {/*
                label:mr-2 w-[200px] text-center
                input:ml-2 mb-2 w-[200px]
              */}
              <label className="">檢驗報告上傳:</label>
              <input
                className=""
                id="inspectionUrl2"
                name="inspectionUrl2"
                type="file"
                key={inspectionImage2Key}
                ref={inspectionImage2Ref}
                onChange={handleInputToStorage}
                required
              />
            </div>
          </div>
          {/* 
            button:border-2 border-slider border-black mr-2 hover:text-white hover:bg-black
          */}
          <button className="">新增產品</button>
          <button className="" onClick={reset}>
            清空
          </button>
        </form>
      </div>
    </div>
  );
}

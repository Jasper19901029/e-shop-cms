"use client";
import { useState, ReactNode, useRef } from "react";
import {
  uploadToStorage,
  Product,
  addNewProduct,
} from "@/utils/firebase/firebase";
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
  isSell: null,
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
  const { name, type, unit, price, quantity, category, introduction, isSell } =
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
    if (name === "isSell" && value === "true") {
      return setProductField({ ...productField, [name]: true });
    }
    if (name === "isSell" && value === "false") {
      return setProductField({ ...productField, [name]: false });
    }
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

  return (
    <div className="mt-4">
      <form
        onSubmit={onSubmitToFirebase}
        className="flex flex-col space-y-6 lg:space-y-10">
        <Input
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
          label="產品價格"
          id="price"
          name="price"
          type="number"
          htmlFor="price"
          placeholder="請輸入產品價格"
          value={price === 0 ? "" : price}
          onChange={handlerChange}
          required
        />
        <Input
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
          label="產品數量"
          id="quantity"
          name="quantity"
          type="number"
          htmlFor="quantity"
          placeholder="請輸入產品數量"
          min={0}
          value={quantity === 0 ? "" : quantity}
          onChange={handlerChange}
          required
        />

        <fieldset className="">
          <legend>
            產品類別:
            <Input
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

        <div className="flex flex-row">
          <label htmlFor="introduction" className="self-center mr-4">
            產品介紹:
          </label>
          <textarea
            id="introduction"
            onChange={handleTextAreaChange}
            name="introduction"
            value={introduction}
            className="w-[250px] h-[60px] border-2 border-slider border-black resize-none rounded-[8px] lg:w-[500px] lg:h-[150px] focus:outline-none focus:border-blue-500"
            placeholder="請輸入產品介紹"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="">
            產品圖片上傳:{" "}
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
          </label>

          <label className="">
            檢驗報告上傳:{" "}
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
          </label>

          <label className="">
            檢驗報告上傳:{" "}
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
          </label>
        </div>

        <fieldset className="">
          <legend>
            開放訂購:
            <Input
              label="是"
              id="是"
              name="isSell"
              type="radio"
              htmlFor="是"
              value="true"
              onChange={handlerChange}
              required
              checked={productField.isSell === true}
            />
            <Input
              label="否"
              id="否"
              name="isSell"
              type="radio"
              htmlFor="否"
              value="false"
              onChange={handlerChange}
              required
              checked={productField.isSell === false}
            />
          </legend>
        </fieldset>

        <div className="flex flex-row justify-around text-[20px]">
          <button className="border-2 border-slider border-black hover:text-white hover:bg-black rounded-[4px]">
            新增產品
          </button>
          <button
            className="border-2 border-slider border-black hover:text-white hover:bg-black rounded-[4px]"
            onClick={reset}>
            清空
          </button>
        </div>
      </form>
    </div>
  );
}

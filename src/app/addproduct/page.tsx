"use client";
import { useState, ReactNode, useRef } from "react";
import {
  uploadToStorage,
  Product,
  addNewProduct,
} from "@/utils/firebase/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const defaultField: Product = {
  productName: "",
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
  const {
    productName,
    type,
    unit,
    price,
    quantity,
    category,
    introduction,
    isSell,
  } = productField;
  const handleInputToStorage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!e.target.files) {
      return;
    }
    const checkFile = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
    if (!checkFile.test(e.target.files[0].name)) {
      e.target.value = "";
      return alert("只可以是圖片檔喔");
    }
    const { name } = e.target;
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
    <form
      onSubmit={onSubmitToFirebase}
      className="flex flex-col space-y-6 lg:space-y-10 mt-4 mb-4">
      <div className="flex flex-row items-center">
        <Label htmlFor="productName" className="w-[100px]">
          產品名字
        </Label>
        <Input
          id="productName"
          name="productName"
          type="text"
          placeholder="請輸入產品名字"
          value={productName}
          onChange={handlerChange}
          required
        />
      </div>

      <div className="flex flex-row items-center">
        <Label htmlFor="price" className="w-[100px]">
          產品價格
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="請輸入產品價格"
          value={price === 0 ? "" : price}
          onChange={handlerChange}
          required
        />
      </div>

      <div className="flex flex-row items-center">
        <Label htmlFor="unit" className="w-[100px]">
          產品單位
        </Label>
        <Input
          id="unit"
          name="unit"
          type="text"
          placeholder="請輸入產品單位"
          value={unit}
          onChange={handlerChange}
          required
        />
      </div>

      <div className="flex flex-row items-center">
        <Label htmlFor="type" className="w-[100px]">
          產品種類
        </Label>
        <Input
          id="type"
          name="type"
          type="text"
          placeholder="請輸入產品種類"
          value={type}
          onChange={handlerChange}
          required
        />
      </div>

      <div className="flex flex-row items-center">
        <Label htmlFor="quantity" className="w-[100px]">
          產品數量
        </Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          placeholder="請輸入產品數量"
          min={0}
          value={quantity === 0 ? "" : quantity}
          onChange={handlerChange}
          required
        />
      </div>

      <fieldset className="">
        <legend className="flex flex-row items-center">
          產品類別:
          <div className="flex flex-row items-center">
            <Input
              className="h-4"
              id="水果"
              name="category"
              type="radio"
              value="水果"
              onChange={handlerChange}
              required
              checked={category === "水果"}
            />
            <Label htmlFor="水果" className="w-[100px]">
              水果
            </Label>
          </div>
          <div className="flex flex-row items-center">
            <Input
              className="h-4"
              id="果乾"
              name="category"
              type="radio"
              value="果乾"
              onChange={handlerChange}
              required
              checked={category === "果乾"}
            />
            <Label htmlFor="果乾" className="w-[100px]">
              果乾
            </Label>
          </div>
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
        <Label className="mb-2">產品圖片上傳: </Label>
        <Input
          className=""
          id="productUrl"
          name="productUrl"
          type="file"
          key={productImageKey}
          ref={productImageRef}
          onChange={handleInputToStorage}
          required
          accept=".jpg, .jpeg, .png, .webp"
        />

        <Label className="mb-2">檢驗報告上傳: </Label>
        <Input
          className=""
          id="inspectionUrl1"
          name="inspectionUrl1"
          type="file"
          key={inspectionImage1Key}
          ref={inspectionImage1Ref}
          onChange={handleInputToStorage}
          required
          accept=".jpg, .jpeg, .png, .webp"
        />

        <Label className="mb-2">檢驗報告上傳: </Label>
        <Input
          className=""
          id="inspectionUrl2"
          name="inspectionUrl2"
          type="file"
          key={inspectionImage2Key}
          ref={inspectionImage2Ref}
          onChange={handleInputToStorage}
          required
          accept=".jpg, .jpeg, .png, .webp"
        />
      </div>

      <fieldset className="">
        <legend className="flex flex-row items-center">
          開放訂購:
          <div className="flex flex-row items-center">
            <Input
              className="h-4"
              id="是"
              name="isSell"
              type="radio"
              value="true"
              onChange={handlerChange}
              required
              checked={productField.isSell === true}
            />
            <Label htmlFor="是" className="w-[100px]">
              是
            </Label>
          </div>
          <div className="flex flex-row items-center">
            <Input
              className="h-4"
              id="否"
              name="isSell"
              type="radio"
              value="false"
              onChange={handlerChange}
              required
              checked={productField.isSell === false}
            />
            <Label htmlFor="否" className="w-[100px]">
              否
            </Label>
          </div>
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
  );
}

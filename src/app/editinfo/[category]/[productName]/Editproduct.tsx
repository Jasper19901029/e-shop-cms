"use client";
import Image from "next/image";
import {
  Product,
  editProduct,
  uploadToStorage,
} from "@/utils/firebase/firebase";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditProduct({
  productName,
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
    productName: productName,
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
  const router = useRouter();

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
      await editProduct({
        ...productField,
      });

      alert("修改成功");
      router.push("/editinfo");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitToFirebase} className="flex flex-row space-x-10">
      <div className="flex flex-col space-y-12">
        <p>
          產品名稱: <span className="ml-4">{productName}</span>
        </p>
        <div className="flex items-center">
          <Label htmlFor="price" className="w-[100px]">
            產品金額:
          </Label>
          <Input
            id="price"
            name="price"
            type="text"
            placeholder={`現在的金額:${price}元/${unit}`}
            onChange={handlerChange}
          />
        </div>
        <div className="flex items-center">
          <Label htmlFor="quantity" className="w-[100px]">
            產品數量:
          </Label>
          <Input
            id="quantity"
            name="quantity"
            type="text"
            placeholder={`現在的數量:${quantity}${unit}`}
            onChange={handlerChange}
          />
        </div>
        <div className="flex flex-row">
          <label htmlFor="introduction" className="self-center mr-4">
            產品介紹:
          </label>
          <textarea
            id="introduction"
            onChange={handleTextAreaChange}
            name="introduction"
            defaultValue={introduction}
            className="w-[250px] h-[60px] border-2 border-slider border-black resize-none rounded-[8px] lg:w-[500px] lg:h-[150px] focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center">
          <Label className="w-[100px] mr-8">開放訂購:</Label>
          <div className="flex mr-8">
            <Input
              id="是"
              name="isSell"
              type="radio"
              value="true"
              onChange={handlerChange}
              required
              className="h-4"
              checked={productField.isSell === true}
            />
            <Label htmlFor="是" className="">
              是
            </Label>
          </div>
          <div className="flex">
            <Input
              id="否"
              name="isSell"
              type="radio"
              value="false"
              onChange={handlerChange}
              required
              className="h-4"
              checked={productField.isSell === false}
            />
            <Label htmlFor="否">否</Label>
          </div>
        </div>
        <Button variant={"ghost"}>確定修改</Button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center">
            <Label htmlFor="productUrl" className="w-[150px]">
              產品圖片上傳:
            </Label>
            <Input
              className=""
              id="productUrl"
              name="productUrl"
              type="file"
              ref={productImageRef}
              onChange={handleInputToStorage}
            />
          </div>
          <Image src={productUrl} width={150} height={150} alt="hi" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center">
            <Label htmlFor="inspectionUrl1" className="w-[150px]">
              檢驗報告上傳:
            </Label>
            <Input
              className=""
              id="inspectionUrl1"
              name="inspectionUrl1"
              type="file"
              ref={inspectionImage1Ref}
              onChange={handleInputToStorage}
            />
          </div>
          {inspectionUrl1 && (
            <Image src={inspectionUrl1} width={150} height={150} alt="hi" />
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center">
            <Label htmlFor="inspectionUrl2" className="w-[150px]">
              檢驗報告上傳:
            </Label>
            <Input
              className=""
              id="inspectionUrl2"
              name="inspectionUrl2"
              type="file"
              ref={inspectionImage2Ref}
              onChange={handleInputToStorage}
            />
          </div>
          {inspectionUrl2 && (
            <Image src={inspectionUrl2} width={150} height={150} alt="hi" />
          )}
        </div>
      </div>
    </form>
  );
}

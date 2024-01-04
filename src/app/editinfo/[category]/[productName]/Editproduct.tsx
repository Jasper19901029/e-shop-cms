"use client";
import Image from "next/image";
import Input from "@/components/input/input";
import {
  Product,
  editProduct,
  uploadToStorage,
} from "@/utils/firebase/firebase";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <form
        onSubmit={onSubmitToFirebase}
        className="flex flex-col space-y-6 lg:space-y-10 items-center">
        <div className="flex flex-col space-y-6 lg:space-y-10">
          <p>
            產品名稱: <span className="ml-4">{productName}</span>
          </p>
          <Input
            label="產品價格"
            id="price"
            name="price"
            type="text"
            htmlFor="price"
            placeholder={`現在的金額:${price}元/${unit}`}
            onChange={handlerChange}
          />
          <Input
            label="產品數量"
            id="quantity"
            name="quantity"
            type="text"
            htmlFor="quantity"
            placeholder={`現在的數量:${quantity}${unit}`}
            onChange={handlerChange}
          />

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
        </div>
        <div className="flex flex-col lg:flex-row">
          <label htmlFor="productUrl" className="">
            產品圖片上傳:
            <input
              className=""
              id="productUrl"
              name="productUrl"
              type="file"
              ref={productImageRef}
              onChange={handleInputToStorage}
            />
            <Image src={productUrl} width={300} height={300} alt="hi" />
          </label>

          <label htmlFor="inspectionUrl1" className="">
            檢驗報告上傳:
            <input
              className=""
              id="inspectionUrl1"
              name="inspectionUrl1"
              type="file"
              ref={inspectionImage1Ref}
              onChange={handleInputToStorage}
            />
            {inspectionUrl1 && (
              <Image src={inspectionUrl1} width={300} height={300} alt="hi" />
            )}
          </label>

          <label htmlFor="inspectionUrl2" className="">
            檢驗報告上傳:
            <input
              className=""
              id="inspectionUrl2"
              name="inspectionUrl2"
              type="file"
              ref={inspectionImage2Ref}
              onChange={handleInputToStorage}
            />
            {inspectionUrl2 && (
              <Image src={inspectionUrl2} width={300} height={300} alt="hi" />
            )}
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
        <button className="border-2 border-slider border-black hover:text-white hover:bg-black rounded-[4px] text-[20px]">
          確定修改
        </button>
      </form>
    </div>
  );
}

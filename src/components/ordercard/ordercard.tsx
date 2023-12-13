"use client";
import { useState } from "react";
import { printOrder } from "./printorder";
import { Order, delOrder } from "@/utils/firebase/firebase";
import Input from "@/components/input/input";
// DeliveryTime: string;
// RecipientAddress: string;
// RecipientMobile: string;
// RecipientName: string;
// cashOnDelivery: boolean;
// clientMemo: string;
// isFinish: boolean;
// memo: string;
// ownerMemo: string;
// totalPrice: number;
// cart: Cart[];
export default function Ordercard({
  DeliveryTime,
  RecipientAddress,
  RecipientMobile,
  RecipientName,
  IsCollection,
  clientMemo,
  isFinish,
  Memo,
  CollectionAmount,
  totalPrice,
  cart,
  createDate,
  id,
}: Order): React.ReactNode {
  const [memo, setMemo] = useState(Memo);
  const [isDel, setIsDel] = useState(false);
  const handleMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };
  return (
    <div className="grid place-content-around border-2 border-gray-400 m-2 p-2 pt-auto tracking-wider relative">
      <p>訂單日期:{createDate}</p>
      <p>訂購人:{RecipientName}</p>
      <p>訂購人電話:{RecipientMobile}</p>
      <p>訂購人地址:{RecipientAddress}</p>
      <p>付款方式:{IsCollection === "N" ? "匯款" : "貨到付款"}</p>
      <p>客戶備註:{clientMemo}</p>
      <div className="">
        <p className="">購買商品:</p>
        {cart.map(({ productName, price, quantity }) => (
          <div
            key={`${id}${productName}`}
            className="flex flex-col items-center ">
            <p className="text-right">{productName}</p>
            <p className="ml-2 text-right">
              單價:${price} * {quantity}
            </p>
          </div>
        ))}
        <p>總金額:{totalPrice}</p>
      </div>
      <Input
        label="備註"
        name="memo"
        id="memo"
        htmlFor="memo"
        type="text"
        onChange={handleMemo}
      />
      <div className="flex justify-around">
        <button
          className="border-2 border-gray-300 rounded-md mt-2"
          onClick={() =>
            printOrder(
              RecipientName,
              RecipientMobile,
              RecipientAddress,
              IsCollection,
              CollectionAmount,
              (Memo = memo),
              DeliveryTime,
              id,
              isFinish
            )
          }>
          {isFinish ? "重新列印" : "列印貨運單"}
        </button>
        <button
          className="border-2 border-gray-300 rounded-md mt-2"
          onClick={() => setIsDel(!isDel)}>
          刪除
        </button>
        {isDel && <ConfirmDelete id={id} isDel={isDel} setIsDel={setIsDel} />}
      </div>
    </div>
  );
}

export function ConfirmDelete({
  id,
  isDel,
  setIsDel,
}: {
  id: string;
  isDel: boolean;
  setIsDel: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactNode {
  const checkDelete = async (id: string): Promise<void> => {
    await delOrder(id);
  };
  return (
    <div className="absolute inset-y-1/3 bg-[gray] w-[200px] h-[100px]  flex flex-col justify-around">
      <h2>
        確認刪除<span className="text-[red]"> 本筆資料</span>?
      </h2>
      <div className="flex flex-row justify-around ">
        <button onClick={() => checkDelete(id)}>確認</button>
        <button onClick={() => setIsDel(!isDel)}>取消</button>
      </div>
    </div>
  );
}

/**
      RecipientName
      RecipientMobile
      RecipientAddress
      IsCollection
      CollectionAmount
      Memo
      DeliveryTime
 */

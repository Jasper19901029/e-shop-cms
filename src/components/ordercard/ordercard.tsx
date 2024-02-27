"use client";
import { useState } from "react";
import { printOrder } from "./printorder";
import { Order, delOrder } from "@/utils/firebase/firebase";
import { TableCell, TableRow } from "@/components/ui/table";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdPrint } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editOrderAction } from "./editorder";

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
  const [memo, setMemo] = useState(clientMemo);
  const handleMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };
  return (
    <>
      <TableCell className="">
        <EditOrder
          DeliveryTime={DeliveryTime}
          RecipientAddress={RecipientAddress}
          RecipientMobile={RecipientMobile}
          RecipientName={RecipientName}
          IsCollection={IsCollection}
          clientMemo={clientMemo}
          isFinish={isFinish}
          Memo={Memo}
          CollectionAmount={CollectionAmount}
          totalPrice={totalPrice}
          cart={cart}
          createDate={createDate}
          id={id}
        />
      </TableCell>
      <TableCell className="">{createDate}</TableCell>
      <TableCell className="">{RecipientName}</TableCell>
      <TableCell>{RecipientMobile}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {IsCollection === "N" ? "匯款" : "貨到付款"}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {cart.map(({ productName, price, quantity }) => (
          <div
            key={`${id}${productName}`}
            className="flex flex-col justify-center items-center ">
            <p className="">{productName}</p>
            <p className="mb-2">
              ${price} * {quantity}
            </p>
          </div>
        ))}
      </TableCell>
      <TableCell className="hidden sm:table-cell  break-all">
        <div className="flex flex-col justify-center items-center">
          <p>{clientMemo}</p>
          {clientMemo.length > 0 && (
            <div className="flex items-center mt-2">
              <Label htmlFor="memo" className="w-[90px] mr-2">
                自訂備註
              </Label>
              <Input
                name="memo"
                id="memo"
                type="text"
                onChange={handleMemo}
                defaultValue={Memo.length > 0 ? Memo : clientMemo}
                className="h-6"
              />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">${totalPrice}</TableCell>
      <TableCell className="">
        <Button
          variant={"ghost"}
          className="bg-white border-0 bg-null"
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
          <IoMdPrint className="mx-auto sm:text-2xl" />
        </Button>
      </TableCell>
      <TableCell className="">
        <ConfirmDelete
          id={id}
          RecipientName={RecipientName}
          totalPrice={totalPrice}
        />
      </TableCell>
    </>
    // <div className="flex flex-col place-content-around border-2 border-gray-400 mx-8 my-8 p-4 tracking-wider relative">
    //   <p>訂單日期:{createDate}</p>
    //   <p>訂購人:{RecipientName}</p>
    //   <p>訂購人電話:{RecipientMobile}</p>
    //   <p>訂購人地址:{RecipientAddress}</p>
    //   <p>付款方式:{IsCollection === "N" ? "匯款" : "貨到付款"}</p>
    //   <p>客戶備註:{clientMemo}</p>
    //   <div className="space-y-4">
    //     <p className="">購買商品:</p>
    //     {cart.map(({ productName, price, quantity }) => (
    //       <div
    //         key={`${id}${productName}`}
    //         className="flex flex-row justify-between">
    //         <p className="ml-4">{productName}</p>
    //         <p className="mr-4">
    //           單價:${price} * {quantity}
    //         </p>
    //       </div>
    //     ))}
    //     <p>總金額:{totalPrice}</p>
    //   </div>
    //   <Input
    //     label="備註"
    //     name="memo"
    //     id="memo"
    //     htmlFor="memo"
    //     type="text"
    //     onChange={handleMemo}
    //   />
    //   <div className="flex justify-around">
    //     <button
    //       className="border-2 border-gray-300 rounded-md mt-2"
    //       onClick={() =>
    //         printOrder(
    //           RecipientName,
    //           RecipientMobile,
    //           RecipientAddress,
    //           IsCollection,
    //           CollectionAmount,
    //           (Memo = memo),
    //           DeliveryTime,
    //           id,
    //           isFinish
    //         )
    //       }>
    //       {isFinish ? "重新列印" : "列印貨運單"}
    //     </button>
    //     <button
    //       className="border-2 border-gray-300 rounded-md mt-2"
    //       onClick={() => setIsDel(!isDel)}>
    //       刪除
    //     </button>
    //     {isDel && <ConfirmDelete id={id} isDel={isDel} setIsDel={setIsDel} />}
    //   </div>
    // </div>
  );
}

export function ConfirmDelete({
  id,
  RecipientName,
  totalPrice,
}: {
  id: string;
  RecipientName: string;
  totalPrice: number;
}): React.ReactNode {
  const checkDelete = async (id: string): Promise<void> => {
    await delOrder(id);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="bg-white border-0 bg-null">
          <FaRegTrashCan className="mx-auto sm:text-2xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>確定刪除此筆訂單?</DialogTitle>
          <DialogDescription>
            確定要刪除{RecipientName}這筆${totalPrice}的訂單嗎?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            className="bg-white border-0 bg-null"
            onClick={() => checkDelete(id)}>
            確認
          </Button>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="bg-white border-0 bg-null">
              取消
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditOrder({
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
}: Order) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="bg-white border-0 bg-null">
          <FaEdit className="mx-auto sm:text-2xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>確定刪除此筆訂單?</DialogTitle>
          <DialogDescription asChild>
            <form action={editOrderAction}>
              <div className="flex space-x-8 items-center">
                <Label htmlFor={RecipientName}>姓名</Label>
                <Input
                  id={RecipientName}
                  name="RecipientName"
                  type="text"
                  defaultValue={RecipientName}
                />
              </div>
              <div className="flex space-x-8 items-center">
                <Label htmlFor={RecipientMobile}>電話</Label>
                <Input
                  id={RecipientMobile}
                  name="RecipientMobile"
                  type="text"
                  defaultValue={RecipientMobile}
                />
              </div>
              <div className="flex space-x-8 items-center">
                <Label htmlFor={RecipientAddress}>地址</Label>
                <Input
                  id={RecipientAddress}
                  name="RecipientAddress"
                  type="text"
                  defaultValue={RecipientAddress}
                />
              </div>
              <div className="flex space-x-8 items-center">
                <Label htmlFor={DeliveryTime}>送貨時間</Label>
                <Input
                  id={DeliveryTime}
                  name="DeliveryTime"
                  type="text"
                  defaultValue={DeliveryTime}
                />
              </div>

              <div className="flex space-x-8 items-center">
                <Label htmlFor={IsCollection}>貨到付款</Label>
                <Input
                  id={IsCollection}
                  name="IsCollection"
                  type="text"
                  defaultValue={IsCollection}
                />
              </div>

              <Input
                id="isFinish"
                name="isFinish"
                type="text"
                hidden
                className="hidden"
                readOnly
              />

              <div className="flex space-x-8 items-center">
                <Label htmlFor={clientMemo}>客人備註</Label>
                <Input
                  id={clientMemo}
                  name="clientMemo"
                  type="text"
                  defaultValue={clientMemo}
                />
              </div>

              <div className="flex space-x-8 items-center">
                <Label htmlFor={Memo}>自訂備註</Label>
                <Input id={Memo} name="Memo" type="text" defaultValue={Memo} />
              </div>
              <div className="flex space-x-8 items-center">
                <Label htmlFor={"CollectionAmount"}></Label>
                <Input
                  id="CollectionAmount"
                  name="CollectionAmount"
                  type="text"
                  defaultValue={CollectionAmount}
                />
              </div>
              <div className="flex space-x-8 items-center">
                <Label htmlFor={"totalPrice"}>訂單金額</Label>
                <Input
                  id="totalPrice"
                  name="totalPrice"
                  type="text"
                  defaultValue={totalPrice}
                />
              </div>
              <Input
                name="id"
                defaultValue={id}
                className="hidden"
                hidden
                readOnly
              />
              <button>submit</button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

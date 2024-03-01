"use client";
import { useState } from "react";
import { printOrder } from "./printorder";
import { Order, delOrder } from "@/utils/firebase/firebase";
import { TableCell, TableRow } from "@/components/ui/table";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdPrint } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditOrder from "./editorder";

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
        {cart?.map(({ productName, price, quantity }) => (
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
          <div className="flex items-center mt-2">
            <Label htmlFor="memo" className="w-[90px] mr-2">
              客戶備註
            </Label>
            <Input
              // name="memo"
              // id="memo"
              type="text"
              value={clientMemo}
              className="h-6 bg-null border-0 hover:null"
              disabled
            />
          </div>
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
            確定要刪除&nbsp;
            <span className="text-red-500 text-xl font-bold">
              {RecipientName}
            </span>
            &nbsp;這筆&nbsp;
            <span className="text-red-500 text-xl font-bold">
              ${totalPrice}
            </span>
            &nbsp;的訂單嗎?
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

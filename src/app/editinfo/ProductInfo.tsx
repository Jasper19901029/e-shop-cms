"use client";
import Link from "next/link";
import { Product, delProduct, editIsSell } from "@/utils/firebase/firebase";
import { ReactNode, useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
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

export default function ProductInfo({
  productName,
  price,
  quantity,
  productUrl,
  type,
  unit,
  category,
  introduction,
  isSell,
}: Product): ReactNode {
  const toggleIsSell = async (
    isSell: boolean,
    productName: string,
    category: string
  ) => {
    await editIsSell(productName, category, isSell);
  };

  return (
    <>
      <TableCell className="">{productName}</TableCell>
      <TableCell className="">{price}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell className="hidden sm:table-cell">{unit}</TableCell>
      <TableCell className="hidden sm:table-cell">
        <Button variant={"ghost"} className="bg-white border-0 bg-null">
          <Link href={`/editinfo/${category}/${productName}`}>
            <FaEdit className="mx-auto sm:text-2xl" />
          </Link>
        </Button>
      </TableCell>
      <TableCell className="">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <Switch
            id="isSell"
            checked={isSell}
            onCheckedChange={(isSell) =>
              toggleIsSell(isSell, productName, category)
            }
          />
          <Label className="w-[50px]" htmlFor="required">
            {isSell ? "銷售" : "未銷售"}
          </Label>
        </div>
      </TableCell>
      <TableCell className="">
        <ConfirmDelete productName={productName} category={category} />
      </TableCell>
    </>
  );
}

export function ConfirmDelete({
  productName,
  category,
}: {
  productName: string;
  category: string;
}): ReactNode {
  console.log(category, productName);
  const checkDelete = async (
    category: string,
    productName: string
  ): Promise<void> => {
    try {
      const hello = await delProduct({ category, name: productName });
      console.log(hello);
    } catch (error) {
      console.log(error);
    }
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
          <DialogTitle>確定刪除此筆產品資訊?</DialogTitle>
          <DialogDescription>
            確定要刪除&nbsp;
            <span className="text-red-500 text-xl font-bold">
              {productName}
            </span>
            &nbsp;的資料嗎?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            className="bg-white border-0 bg-null"
            onClick={() => checkDelete(category, productName)}>
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
    // <div className="absolute bg-[gray] w-[200px] h-[100px] top-100 right-20 flex flex-col justify-around">
    //   <h2>
    //     確認刪除<span className="text-[red]"> {productName}</span>?
    //   </h2>
    //   <div className="flex flex-row justify-around ">
    //     <button onClick={() => checkDelete(productName, category)}>確認</button>
    //     <button onClick={() => setIsDel(!isDel)}>取消</button>
    //   </div>
    // </div>
  );
}

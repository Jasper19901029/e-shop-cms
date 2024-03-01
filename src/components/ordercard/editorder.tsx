"use client";
import React, { ChangeEvent, useState } from "react";
import { Order, editOrder } from "@/utils/firebase/firebase";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditOrder({
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
  const [open, setOpen] = useState(false);
  const [orderField, setOrderFiled] = useState({
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
  });
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderFiled({ ...orderField, [name]: value });
  };

  const handleIsCollection = (e: "Y" | "N") => {
    if (e === "Y") {
      setOrderFiled({
        ...orderField,
        ["IsCollection"]: e,
        ["CollectionAmount"]: totalPrice,
      });
    }
    if (e === "N") {
      setOrderFiled({
        ...orderField,
        ["IsCollection"]: e,
        ["CollectionAmount"]: 0,
      });
    }
  };
  const handleEditOrderSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await editOrder(id, orderField);
      if (res) alert("修改成功");
      setOpen(false);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="bg-white border-0 bg-null">
          <FaEdit className="mx-auto sm:text-2xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{RecipientName}的訂單</DialogTitle>
          <DialogDescription asChild>
            <form className="space-y-2" onSubmit={handleEditOrderSubmit}>
              <div className="flex space-x-2 items-center">
                <Label className="w-[100px]" htmlFor={RecipientName}>
                  姓名
                </Label>
                <Input
                  id={RecipientName}
                  name="RecipientName"
                  type="text"
                  defaultValue={RecipientName}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex space-x-2 items-center">
                <Label className="w-[100px]" htmlFor={RecipientMobile}>
                  電話
                </Label>
                <Input
                  id={RecipientMobile}
                  name="RecipientMobile"
                  type="text"
                  defaultValue={RecipientMobile}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex space-x-2 items-center">
                <Label className="w-[100px]" htmlFor={RecipientAddress}>
                  地址
                </Label>
                <Input
                  id={RecipientAddress}
                  name="RecipientAddress"
                  type="text"
                  defaultValue={RecipientAddress}
                  onChange={handleOnChange}
                />
              </div>
              <TooltipProvider>
                <div className="flex space-x-2 items-center">
                  <Label className="w-[100px]" htmlFor={DeliveryTime}>
                    送貨時間
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        id={DeliveryTime}
                        name="DeliveryTime"
                        type="text"
                        defaultValue={DeliveryTime}
                        onChange={handleOnChange}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>01: 13時前 02: 14-18時 04: 不指定</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>

              <div className="flex space-x-2 items-center">
                <Label className="w-[100px]" htmlFor={IsCollection}>
                  貨到付款
                </Label>
                <Select
                  name="IsCollection"
                  onValueChange={handleIsCollection}
                  defaultValue={orderField.IsCollection}>
                  <SelectTrigger className="w-[180px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">貨到付款</SelectItem>
                    <SelectItem value="N">匯款</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <TooltipProvider>
                <div className="flex space-x-2 items-center">
                  <Label className="w-[100px]" htmlFor={"CollectionAmount"}>
                    代收金額
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        id="CollectionAmount"
                        name="CollectionAmount"
                        type="number"
                        value={orderField.IsCollection === "Y" ? totalPrice : 0}
                        onChange={handleOnChange}
                        disabled
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>若貨到付款為"Y"輸入代收貨款金額，否則填0</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              <Input
                id="isFinish"
                name="isFinish"
                type="text"
                hidden
                className="hidden"
                readOnly
              />

              <div className="flex space-x-2 items-center">
                <Label className="w-[100px]" htmlFor={clientMemo}>
                  客人備註
                </Label>
                <Input
                  id={clientMemo}
                  name="clientMemo"
                  type="text"
                  disabled
                  defaultValue={clientMemo}
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex space-x-2 items-center">
                <Label className="w-[100px]" htmlFor={Memo}>
                  自訂備註
                </Label>
                <Input
                  id={Memo}
                  name="Memo"
                  type="text"
                  defaultValue={Memo}
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex space-x-2 items-center">
                <Label className="w-[100px]" htmlFor={"totalPrice"}>
                  訂單金額
                </Label>
                <Input
                  id="totalPrice"
                  name="totalPrice"
                  type="text"
                  defaultValue={totalPrice}
                  disabled
                />
              </div>
              <Input
                name="id"
                defaultValue={id}
                className="hidden"
                hidden
                readOnly
              />
              <div className="flex justify-end">
                <Button variant={"ghost"} className="border-0" type="submit">
                  儲存修改
                </Button>
                <DialogTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="bg-white border-0 bg-null">
                    取消
                  </Button>
                </DialogTrigger>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

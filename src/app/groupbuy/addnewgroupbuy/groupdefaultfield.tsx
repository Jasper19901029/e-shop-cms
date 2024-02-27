"use client";
import React, { ChangeEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

export default function GroupDefaultField({
  handleGroupDefault,
}: {
  handleGroupDefault: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Label className="w-[120px] mr-2" htmlFor="groupBuyName">
          團購名稱
        </Label>
        <Input
          className=""
          required
          id="groupBuyName"
          name="groupBuyName"
          onChange={handleGroupDefault}
        />
      </div>
      <div className="flex items-center">
        <Label className="w-[120px] mr-2" htmlFor="groupBuyOwner">
          團購主姓名
        </Label>
        <Input
          className=""
          required
          id="groupBuyOwner"
          name="groupBuyOwner"
          onChange={handleGroupDefault}
        />
      </div>
      <div className="flex items-center">
        <Label className="w-[120px] mr-2" htmlFor="groupBuyProduct">
          團購商品
        </Label>
        <Input
          className=""
          required
          id="groupBuyProduct"
          name="groupBuyProduct"
          onChange={handleGroupDefault}
        />
      </div>
    </div>
  );
}

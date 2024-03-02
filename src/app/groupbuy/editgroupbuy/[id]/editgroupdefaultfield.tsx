import React, { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GroupBuyOrder } from "@/utils/firebase/firebase";

export default function Editgroupdefaultfield({
  handleGroupDefault,
  groupDefault,
}: {
  handleGroupDefault: (e: ChangeEvent<HTMLInputElement>) => void;
  groupDefault: GroupBuyOrder;
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
          value={groupDefault.groupBuyName}
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
          value={groupDefault.groupBuyOwner}
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
          value={groupDefault.groupBuyOwner}
          onChange={handleGroupDefault}
        />
      </div>
    </div>
  );
}

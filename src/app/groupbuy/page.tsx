import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getGroupFormData } from "@/utils/firebase/firebase";
import GroupBuyInfo from "./groupbuyinfo";

export default async function GroupBuyPage() {
  const formData = await getGroupFormData();

  return (
    <div className="">
      <Link
        className={buttonVariants({ variant: "ghost", className: "ml-8 mt-8" })}
        href="/groupbuy/addnewgroupbuy">
        新增團購表單
      </Link>
      <div className="flex justify-around mt-4 mx-8 text-center items-center">
        <span className="w-[100px] before:content-['產品'] before:lg:content-['團購名稱']"></span>
        <span className="w-[80px] before:content-['價格'] before:lg:content-['團購主']"></span>
        <span className="w-[80px] before:content-['編輯'] before:lg:content-['編輯表單']"></span>
        <span className="w-[80px] before:content-['單位'] before:lg:content-['開始時間']"></span>
        <span className="w-[100px] before:content-['銷售'] before:lg:content-['開放填寫']"></span>
        <span className="w-[80px] before:content-['刪除'] before:lg:content-['刪除表單']"></span>
      </div>
      {formData.map((data) => (
        <GroupBuyInfo key={data.id} {...data} />
      ))}
    </div>
  );
}

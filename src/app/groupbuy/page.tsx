import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function GroupBuyPage() {
  return (
    <div>
      <h2>GroupBuy</h2>
      <Link
        className={buttonVariants({ variant: "ghost" })}
        href="/groupbuy/addnewgroupbuy">
        新增團購訂單
      </Link>
    </div>
  );
}

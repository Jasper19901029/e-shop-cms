import Link from "next/link";
import { Product, editProduct } from "@/utils/filebase/firebase";
import { ReactNode } from "react";

export default function Poductinfo({
  name,
  price,
  quantity,
  productUrl,
  type,
  unit,
  category,
  introduction,
  isSell,
}: Product): ReactNode {
  return (
    <div className="flex flex-row justify-between border-b-[1px] border-black">
      <p>{name}</p>
      <p>
        現在價格: {price}/{unit}
      </p>
      <p>
        現有數量: {quantity}
        {unit}
      </p>
      <button className={`{${isSell} ? bg-green-500 : bg-red-500}`}></button>
      <button className="border-2 hover:bg-slate-400">
        <Link href={`/editinfo/${category}/${name}`}>編輯</Link>
      </button>
    </div>
  );
}

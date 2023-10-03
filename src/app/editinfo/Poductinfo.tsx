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
        {price}/{unit}
      </p>
      <p>
        {quantity}
        {unit}
      </p>
      <button className={`{${isSell} ? bg-green-500 : bg-red-500}`}></button>
      {/* <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label> */}
      <button className="border-2 hover:bg-slate-400">
        <Link href={`/editinfo/${category}/${name}`}>編輯</Link>
      </button>
    </div>
  );
}

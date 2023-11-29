import Link from "next/link";
import { Product, delProduct, editIsSell } from "@/utils/filebase/firebase";
import { ReactNode, useState } from "react";

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
  const [isDel, setIsDel] = useState<boolean>(false);
  const toggleIsSell = async (
    name: string,
    category: string,
    isSell: boolean | null
  ) => {
    await editIsSell(name, category, !isSell);
  };

  return (
    <div className="flex justify-around text-center odd:bg-gray-200 even:my-2 static">
      <p className="w-[100px]">{name}</p>
      <p className="w-[80px] ">{price}</p>
      <p className="w-[80px]">{quantity}</p>
      <p className="w-[50px]">{unit}</p>

      <button className="w-[80px]">
        <Link href={`/editinfo/${category}/${name}`}>編輯</Link>
      </button>
      <button
        className={isSell ? "w-[80px] bg-green-500" : "w-[80px] bg-red-500"}
        onClick={() => toggleIsSell(name, category, isSell)}>
        {isSell ? "是" : "否"}
      </button>
      <div>
        <button
          className="w-[80px] text-[red] "
          onClick={() => setIsDel(!isDel)}>
          x
        </button>
        {isDel && (
          <ConfirmDelete
            name={name}
            category={category}
            isDel={isDel}
            setIsDel={setIsDel}
          />
        )}
      </div>
    </div>
  );
}

export function ConfirmDelete({
  name,
  category,
  isDel,
  setIsDel,
}: {
  name: string;
  category: string;
  isDel: boolean;
  setIsDel: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
  const checkDelete = async (category: string, name: string): Promise<void> => {
    await delProduct(category, name);
  };
  return (
    <div className="absolute bg-[gray] w-[200px] h-[100px] top-100 right-20 flex flex-col justify-around">
      <h2>
        確認刪除<span className="text-[red]"> {name}</span>?
      </h2>
      <div className="flex flex-row justify-around ">
        <button onClick={() => checkDelete(name, category)}>確認</button>
        <button onClick={() => setIsDel(!isDel)}>取消</button>
      </div>
    </div>
  );
}

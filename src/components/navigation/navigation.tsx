import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
export default function Navigation(): JSX.Element {
  return (
    <div className=" flex flex-row w-full h-[10vh] justify-evenly items-center border-b-2 border-black lg:border-r-2 lg:border-b-0 lg:flex-col lg:w-[200px] lg:h-screen lg:sticky lg:top-0 lg:left-0">
      <Link
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "bg-white border-0",
        })}
        href="/">
        訂單管理
      </Link>
      <Link
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "bg-white border-0",
        })}
        href="/groupbuy">
        團購
      </Link>
      <Link
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "bg-white border-0",
        })}
        href="/addproduct">
        新增產品
      </Link>
      <Link
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "bg-white border-0",
        })}
        href="/editinfo">
        編輯產品
      </Link>
      <Link
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "bg-white border-0",
        })}
        href="/finished">
        已完成訂單
      </Link>
    </div>
  );
}

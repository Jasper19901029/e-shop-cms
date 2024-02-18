import Link from "next/link";
export default function Navigation(): JSX.Element {
  return (
    <div className=" flex flex-row w-full h-[10vh]  justify-around items-center border-b-2 border-black lg:border-r-2 lg:border-b-0 lg:flex-col lg:w-[200px] lg:h-screen lg:sticky lg:top-0 lg:left-0">
      <Link href="/">訂單管理</Link>
      <Link href="/groupbuy">團購</Link>
      <Link href="/addproduct">新增產品</Link>
      <Link href="/editinfo">編輯產品</Link>
      <Link href="/finished">已完成訂單</Link>
    </div>
  );
}

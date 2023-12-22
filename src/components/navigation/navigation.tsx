import Link from "next/link";
export default function Navigation(): JSX.Element {
  return (
    <div className=" flex flex-row w-full h-[10vh]  justify-around items-center lg:flex-col lg:w-[200px] lg:h-screen ">
      <Link href="/">訂單管理</Link>
      <Link href="/addproduct">新增產品</Link>
      <Link href="/editinfo">編輯產品</Link>
      <Link href="/finished">已完成訂單</Link>
      <Link href="/testpage">測試頁</Link>
    </div>
  );
}

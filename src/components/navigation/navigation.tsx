import Link from "next/link";
export default function Navigation(): JSX.Element {
  return (
    <div className="w-[300px] h-[90vh] mr-[30px] mt-[50px] border-r-2 border-black flex flex-col justify-center items-center">
      <Link className="my-2" href="/">
        訂單管理
      </Link>
      <Link className="my-2" href="/addproduct">
        新增產品
      </Link>
      <Link className="my-2" href="/editinfo">
        編輯產品
      </Link>
      <Link className="my-2" href="/finished">
        已完成訂單
      </Link>
    </div>
  );
}

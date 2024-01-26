import OrderList from "@/components/orderlist/orderlist";
export default function Home(): React.ReactNode {
  return (
    <div className="flex flex-row w-[calc(100%-200px)] h-full">
      <hr className="hidden lg:block lg:border-black lg:border-l-2" />
      <OrderList isFinish={false} />
    </div>
  );
}

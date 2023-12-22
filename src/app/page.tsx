import OrderList from "@/components/orderlist/orderlist";
export default function Home(): React.ReactNode {
  return (
    <div className="w-9/12 flex flex-row">
      <hr className="hidden lg:block lg:h-full lg:border-black lg:border-l-2" />
      <OrderList isFinish={false} />
    </div>
  );
}

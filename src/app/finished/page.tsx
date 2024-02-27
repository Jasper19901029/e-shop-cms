import OrderList from "@/components/orderlist/orderlist";
export default function Finished(): React.ReactNode {
  return (
    <div className="flex flex-row sm:w-[calc(100%-200px)] sm:flex-col">
      <OrderList isFinish={true} />
    </div>
  );
}

import OrderList from "@/components/orderlist/orderlist";
export default function Finished(): React.ReactNode {
  return (
    <div className="w-[calc(100%-200px)] flex flex-row">
      <OrderList isFinish={true} />
    </div>
  );
}

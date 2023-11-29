import OrderList from "@/components/orderlist/orderlist";
export default function Home(): React.ReactNode {
  return (
    <div className="">
      <OrderList isFinish={false} />
    </div>
  );
}

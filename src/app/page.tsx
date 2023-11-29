import OrderList from "@/components/orderlist/orderlist";
export default function Home({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="">
      <OrderList isFinish={false} />
    </div>
  );
}

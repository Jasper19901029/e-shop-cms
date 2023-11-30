import OrderList from "@/components/orderlist/orderlist";
export default function Finished(): React.ReactNode {
  console.log("still in sever componet");
  return (
    <>
      <OrderList isFinish={true} />
    </>
  );
}

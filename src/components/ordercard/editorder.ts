"use server";
import { editOrder, Order } from "@/utils/firebase/firebase";

export async function editOrderAction(formData: FormData) {
  // console.log(formData);
  const order = Object.fromEntries(formData);
  console.log(order);
  // console.log(
  //   DeliveryTime,
  //   RecipientAddress,
  //   RecipientMobile,
  //   RecipientName,
  //   IsCollection,
  //   clientMemo,
  //   isFinish,
  //   Memo,
  //   CollectionAmount,
  //   totalPrice,
  //   cart,
  //   createDate,
  //   id
  // );

  // await editOrder("id", order);
}

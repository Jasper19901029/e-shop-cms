import React from "react";
import { getGroupFormData, getGroupBuy } from "@/utils/firebase/firebase";
import EditGroupDetail from "./editgroupdetail";

export async function generateStaticParams() {
  const formData = await getGroupFormData();

  return formData.map((groupbuyData) => ({
    id: groupbuyData.id,
  }));
}

export default async function EditGroupBuyPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const groupBuyData = await getGroupBuy(id);

  return <EditGroupDetail key={id} {...groupBuyData} />;
}

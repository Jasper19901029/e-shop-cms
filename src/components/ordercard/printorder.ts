import { editOrderAfterPrint } from "@/utils/firebase/firebase";
export const printOrder = async (
  RecipientName: string,
  RecipientMobile: string,
  RecipientAddress: string,
  IsCollection: string,
  CollectionAmount: number,
  Memo: string,
  DeliveryTime: string,
  id: string,
  isFinish: boolean
) => {
  try {
    // const res = await fetch("http://localhost:3000/api/print", {
    const res = await fetch("https://e-shop-cms.vercel.app/api/print", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RecipientName,
        RecipientMobile,
        RecipientAddress,
        IsCollection,
        CollectionAmount,
        Memo,
        DeliveryTime,
      }),
    });
    const { FileNo, OBTNumber, CustomerId, CustomerToken } = await res.json();
    const downloadData = await fetch(
      "https://egs.suda.com.tw:8443/api/Egs/DownloadOBT",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CustomerId,
          CustomerToken,
          FileNo: FileNo,
          Orders: [{ OBTNumber: OBTNumber }],
        }),
        cache: "no-cache",
      }
    );
    const res1 = await downloadData.blob();
    const url = URL.createObjectURL(res1);
    window.open(url, "_blank");
    if (isFinish) {
      await editOrderAfterPrint(id, (isFinish = isFinish), Memo, OBTNumber);
      return alert("列印成功");
    }
    await editOrderAfterPrint(id, (isFinish = !isFinish), Memo, OBTNumber);
    alert("列印成功");
  } catch (error) {
    alert("列印失敗");
  }
};

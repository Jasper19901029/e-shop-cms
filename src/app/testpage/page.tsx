"use client";
const testdata = {
  CustomerId: "2219098901",
  CustomerToken: "r8fz6xj9",
  PrintType: "01",
  PrintOBTType: "03",
  Orders: [
    {
      OBTNumber: "",
      OrderId: "test01",
      // 客戶端訂單號碼
      Thermosphere: "0001",
      /* 溫層(代碼)
0001：常溫
0002：冷藏
0003：冷凍*/
      Spec: "0001",
      /*規格(代碼)
0001：60cm
0002：90cm
0003：120cm
0004：150cm */
      ReceiptLocation: "01",
      // 01 宅配 02站取
      ReceiptStationNo: "",
      // 選站取要輸入站所編號
      RecipientName: "test01",
      // 收件人姓名
      RecipientTel: "",
      // 收件人市話 /與手機2擇1即可，可有 -或 #
      RecipientMobile: "0912345678",
      // 收件人手機 /與市話2擇1，只填號碼
      RecipientAddress: "test01",
      // 收件人地址
      SenderName: "send",
      // 寄件人姓名
      SenderTel: "",
      // 寄件人市話 /與手機2擇1即可，可有 -或 #
      SenderMobile: "0912345678",
      // 寄件人手機 /與市話2擇1，只填號碼
      SenderZipCode: "82111A",
      // 寄件人郵碼
      SenderAddress: "test01",
      // 寄件人地址
      ShipmentDate: "20231101",
      // 出貨日期
      DeliveryDate: "20231102",
      // 希望配送日期
      DeliveryTime: "01",
      /* 希望配送時間希望配達時間(代碼)
01：13 時前
02：14-18 時
04：不指定 */
      IsFreight: "N",
      // 如果不收貨款擇Y
      IsCollection: "N",
      // 是否代收貨款 N 擇代收款項填0 / Y 擇代收款項填代收金額
      CollectionAmount: 0,
      // 代收金額
      IsSwipe: "N",
      // 是否刷卡
      IsDeclare: "N",
      // 報值
      DeclareAmount: 0,
      // 報值金額
      ProductTypeId: "0004",
      /* 商品類別(代碼)
0001：一般食品
0002：名特產/甜產
0003：酒/油/醋/醬
0004：穀物蔬果
0005：水產/肉品
0006：3C
0007：家電
0008：服飾配件
0009：生活用品
0010：美容彩妝
0011：保健食品
0012：醫療相關用品
0013：寵物用品飼料
0014：印刷品
0015：其他 */
      ProductName: "水果",
      // 商品名稱
      Memo: "",
      // 備註
    },
  ],
};

const downloadTestData = {
  CustomerId: "2219098901",
  CustomerToken: "r8fz6xj9",
  FileNo: "am7BV+Az85EvptUFwY71R7cs3FBWSxku",
  // 下載檔案編號
  Orders: [
    {
      OBTNumber: "905074233685",
      // 託運單號
    },
  ],
};

export default function TestPage(): React.ReactNode {
  // testdata
  const getEgs = async () => {
    const printData = await fetch(
      "https://egs.suda.com.tw:8443/api/Egs/PrintOBT",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testdata),
      }
    );
    const printRes = await printData.json();
    const { FileNo, Orders } = printRes.Data;
    console.log(FileNo, Orders);
    // const printToDonload = {}

    const downloadData = await fetch(
      "https://egs.suda.com.tw:8443/api/Egs/DownloadOBT",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downloadTestData),
      }
    );
    const res = await downloadData.blob();
    const url = URL.createObjectURL(res);
    window.open(url, "_blank");
    console.log(res);
    // const res = await downloadData.blob();
    // window.open(downloadData, "_blank");
    // console.log(res);
  };

  return (
    <div>
      <button onClick={getEgs}>get</button>
    </div>
  );
}

// 測試建單
// https://egs.suda.com.tw:8443/api/Egs/PrintOBT
// 測試下載
// https://egs.suda.com.tw:8443/api/Egs/DownloadOBT

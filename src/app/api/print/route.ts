import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

const orders = [
  {
    OBTNumber: "",
    OrderId: "無",
    Thermosphere: "0001",
    Spec: "0001",
    ReceiptLocation: "01",
    ReceiptStationNo: "",
    RecipientTel: "",
    // 收件人市話 /與手機2擇1即可，可有 -或 #
    SenderName: "測試印單",
    // 寄件人姓名
    SenderTel: "",
    // 寄件人市話 /與手機2擇1即可，可有 -或 #
    SenderMobile: "0912345678",
    // 寄件人手機 /與市話2擇1，只填號碼
    SenderZipCode: "82111A",
    // 寄件人郵碼
    SenderAddress: "測試印單地址",
    // 寄件人地址
    ShipmentDate: dayjs().format("YYYYMMDD"),
    // 出貨日期
    DeliveryDate: dayjs().add(5, "day").format("YYYYMMDD"),
    // 希望配送日期
    IsFreight: "N",
    // 是否跟客人收運費
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
  },
];

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    RecipientName,
    RecipientMobile,
    RecipientAddress,
    IsCollection,
    CollectionAmount,
    Memo,
    DeliveryTime,
  } = await req.json();
  const neworder = orders.map((obj) => {
    return {
      ...obj,
      RecipientName,
      RecipientMobile,
      RecipientAddress,
      IsCollection,
      CollectionAmount,
      Memo,
      DeliveryTime,
    };
  });
  try {
    const createPrintData = await fetch(
      "https://egs.suda.com.tw:8443/api/Egs/PrintOBT",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CustomerId: process.env.EGS_CUSTOMERID,
          CustomerToken: process.env.EGS_CUSTOMERTOKEN,
          PrintType: "01",
          PrintOBTType: "01",
          Orders: neworder,
        }),
        cache: "no-store",
      }
    );
    const res = await createPrintData.json();
    const { FileNo } = res.Data;
    const { OBTNumber } = res.Data.Orders[0];

    return NextResponse.json({
      FileNo,
      OBTNumber,
      CustomerId: process.env.EGS_CUSTOMERID,
      CustomerToken: process.env.EGS_CUSTOMERTOKEN,
    });
  } catch (err) {
    console.log(err);
  }
}

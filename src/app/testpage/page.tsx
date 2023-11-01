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
      Thermosphere: "0001",
      Spec: "0001",
      ReceiptLocation: "01",
      ReceiptStationNo: "",
      RecipientName: "test01",
      RecipientTel: "",
      RecipientMobile: "0912345678",
      RecipientAddress: "test01",
      SenderName: "send",
      SenderTel: "",
      SenderMobile: "0912345678",
      SenderZipCode: "82111A",
      SenderAddress: "test01",
      ShipmentDate: "20231101",
      DeliveryDate: "20231102",
      DeliveryTime: "01",
      IsFreight: "N",
      IsCollection: "N",
      CollectionAmount: 0,
      IsSwipe: "N",
      IsDeclare: "N",
      DeclareAmount: 0,
      ProductTypeId: "0004",
      ProductName: "水果",
      Memo: "",
    },
    // {
    //   OBTNumber: "",
    //   OrderId: "test01",
    //   Thermosphere: "0001",
    //   Spec: "0001",
    //   ReceiptLocation: "01",
    //   ReceiptStationNo: "",
    //   RecipientName: "test01",
    //   RecipientTel: "",
    //   RecipientMobile: "0912345678",
    //   RecipientAddress: "test01",
    //   SenderName: "send",
    //   SenderTel: "",
    //   SenderMobile: "0912345678",
    //   SenderZipCode: "82111A",
    //   SenderAddress: "test01",
    //   ShipmentDate: "20231101",
    //   DeliveryDate: "20231102",
    //   DeliveryTime: "01",
    //   IsFreight: "N",
    //   IsCollection: "N",
    //   CollectionAmount: 0,
    //   IsSwipe: "N",
    //   IsDeclare: "N",
    //   DeclareAmount: 0,
    //   ProductTypeId: "0004",
    //   ProductName: "水果",
    //   Memo: "",
    // },
  ],
};

const downloadTestData = {
  CustomerId: "2219098901",
  CustomerToken: "r8fz6xj9",
  FileNo: "am7BV+Az85EvptUFwY71R7cs3FBWSxku",
  Orders: [
    {
      OBTNumber: "905074233685",
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
    console.log(downloadData);
    // const res = await downloadData.blob();
    window.open(downloadData.url, "_blank");
    // console.log(res);
  };

  return (
    <div>
      <button onClick={getEgs}>get</button>
    </div>
  );
}

// https://egs.suda.com.tw:8443/api/Egs/PrintOBT
// https://egs.suda.com.tw:8443/api/Egs/DownloadOBT
/*{
 "CustomerId": "2219098901",
 "CustomerToken": "r8fz6xj9",
 "PrintType": "01",
 "PrintOBTType": "03",
 "Orders": [
 {
 "OBTNumber": "",
 "OrderId": "test01",
 "Thermosphere": "0001",
 "Spec": "0001",
 "ReceiptLocation": "01",
 "ReceiptStationNo": "",
 "RecipientName": "test01",
 "RecipientTel": "",
 "RecipientMobile": "0912345678",
 "RecipientAddress": "test01",
 "SenderName": "send",
 "SenderTel": "",
 "SenderMobile": "0912345678",
 "SenderZipCode": "82111A",
 "SenderAddress": "test01",
 "ShipmentDate": "20231101",
 "DeliveryDate": "20231102",
 "DeliveryTime": "01",
 "IsFreight": "N",
 "IsCollection": "N",
 "CollectionAmount": 0,
 "IsSwipe":"N",
 "IsDeclare": "N",
 "DeclareAmount": 0,
 "ProductTypeId": "0004",
 "ProductName": "水果",
 "Memo": ""
 },
 {
 "OBTNumber": "",
 "OrderId": "test01",
 "Thermosphere": "0001",
 "Spec": "0001",
 "ReceiptLocation": "01",
 "ReceiptStationNo": "",
 "RecipientName": "test01",
 "RecipientTel": "",
 "RecipientMobile": "0912345678",
 "RecipientAddress": "test01",
 "SenderName": "send",
 "SenderTel": "",
 "SenderMobile": "0912345678",
 "SenderZipCode": "82111A",
 "SenderAddress": "test01",
 "ShipmentDate": "20231101",
 "DeliveryDate": "20231102",
 "DeliveryTime": "01",
 "IsFreight": "N",
 "IsCollection": "N",
 "CollectionAmount": 0,
 "IsSwipe":"N",
 "IsDeclare": "N",
 "DeclareAmount": 0,
 "ProductTypeId": "0004",
 "ProductName": "水果",
 "Memo": ""
 }
 ]
}*/

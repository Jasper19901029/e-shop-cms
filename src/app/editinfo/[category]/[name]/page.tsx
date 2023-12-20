"use client";
import { useGetProduct } from "../../getData";
import EditProduct from "./Editproduct";
import { notFound } from "next/navigation";
import React from "react";

export default function Page({
  params,
}: {
  params: { category: string; productName: string };
}): React.ReactNode {
  const { category, productName } = params;
  const productData = useGetProduct(decodeURI(category));
  const filterData = productData.productData?.filter(
    (product) => product.productName === decodeURI(productName)
  );
  console.log(filterData);

  return (
    <div>
      {filterData === undefined ? (
        <Loading />
      ) : filterData.length > 0 ? (
        <EditProduct {...filterData[0]} />
      ) : (
        notFound()
      )}
    </div>
  );
}

const Loading = (): React.ReactNode => {
  return <>Loading...</>;
};

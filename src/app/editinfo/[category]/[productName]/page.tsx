"use client";
import { useGetProduct } from "../../getData";
import EditProduct from "./Editproduct";
import { notFound } from "next/navigation";
import React from "react";

// params typing changed in Next.js 15; cast to any for client component
export default function Page({ params }: { params: { category: string; productName: string } }) {
  const { category, productName } = params;
  const productData = useGetProduct(decodeURI(category));
  const filterData = productData.productData?.filter(
    (product) => product.productName === decodeURI(productName)
  );

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

"use client";
import { getDriedFruitsData, getFruitsData } from "../../getData";
import EditProduct from "./Editproduct";

export function generateStaticParams() {
  const { fruitsData } = getFruitsData();
  return (
    fruitsData &&
    fruitsData.map((product) => ({
      // category: decodeURI(product.name),
      category: product.category,
      name: product.name,
    }))
  );
}

export default function Page({
  params,
}: {
  params: { category: string; name: string };
}) {
  const { category, name } = params;
  console.log(decodeURI(category));
  console.log(decodeURI(name));
  const { fruitsData } = getFruitsData();
  const filterData = fruitsData?.filter(
    (product) => product.name === decodeURI(name)
  );
  console.log(filterData);
  return <div>{filterData && <EditProduct {...filterData[0]} />}</div>;
}

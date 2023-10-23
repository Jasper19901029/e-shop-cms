"use client";
import { useGetDriedFruitsData, useGetFruitsData } from "../../getData";
import EditProduct from "./Editproduct";
import { notFound } from "next/navigation";
import NotFound from "./not-found";
import { db, Product } from "../../../../utils/filebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

// export function generateStaticParams() {
//   const { fruitsData } = getFruitsData();
//   return (
//     fruitsData &&
//     fruitsData.map((product) => ({
//       category: product.category,
//       name: product.name,
//     }))
//   );
// }

export default function Page({
  params,
}: {
  params: { category: string; name: string };
}): React.ReactNode {
  const { category, name } = params;

  if (decodeURI(category) === "水果") {
    const { fruitsData } = useGetFruitsData();
    const filterData = fruitsData?.filter(
      (product) => product.name === decodeURI(name)
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
  if (decodeURI(category) === "果乾") {
    const { driedFruitsData } = useGetDriedFruitsData();
    const filterData = driedFruitsData?.filter(
      (product) => product.name === decodeURI(name)
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
        {/* {filterData && filterData.length > 0 && (
          <EditProduct {...filterData[0]} />
        )} */}
      </div>
    );
  }
}

const Loading = (): React.ReactNode => {
  return <>Loading...</>;
};

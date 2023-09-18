"use client";
import error from "next/error";
import { Suspense } from "react";
import { getDriedFruitsData, getFruitsData } from "../../getData";
import EditProduct from "./Editproduct";
import Error from "./error";

export function generateStaticParams() {
  const { fruitsData } = getFruitsData();
  return (
    fruitsData &&
    fruitsData.map((product) => ({
      category: product.category,
      name: product.name,
    }))
  );
}

export default function Page({
  params,
}: {
  params: { category: string; name: string };
}): React.ReactNode {
  const { category, name } = params;
  if (decodeURI(category) === "水果") {
    const { fruitsData } = getFruitsData();
    const filterData = fruitsData?.filter(
      (product) => product.name === decodeURI(name)
    );

    return (
      <div>
        {filterData !== undefined && filterData.length > 0 ? (
          <Suspense fallback={<p>Loading...</p>}>
            <EditProduct {...filterData[0]} />
          </Suspense>
        ) : (
          <Error />
        )}
      </div>
    );
  }
  if (decodeURI(category) === "果乾") {
    const { driedFruitsData } = getDriedFruitsData();
    const filterData = driedFruitsData?.filter(
      (product) => product.name === decodeURI(name)
    );

    return (
      <div>
        {filterData !== undefined && filterData.length > 0 ? (
          <Suspense fallback={<p>Loading...</p>}>
            <EditProduct {...filterData[0]} />
          </Suspense>
        ) : (
          <Error />
        )}
      </div>
    );
  }
}

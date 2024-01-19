"use client";
import { useState, useEffect } from "react";
import { db, Product } from "@/utils/firebase/firebase";
import { query, onSnapshot, collection } from "firebase/firestore";

export const useGetProduct = (category: string) => {
  const [isProduct, setIsProduct] = useState(false);
  const [productData, setProductData] = useState<Product[]>();

  useEffect(() => {
    const q = query(collection(db, category));
    const unsub = onSnapshot(q, (doc) => {
      setProductData(doc.docs.map((doc) => doc.data()) as Product[]);
    });
    return () => {
      unsub();
    };
  }, [isProduct]);

  useEffect(() => {
    const q = query(collection(db, "果乾"));
    const unsub = onSnapshot(q, (doc) => {
      doc.docChanges().forEach((doc) => {
        if (doc.type === "modified") {
          setIsProduct(!isProduct);
        }
      });
    });
    return () => {
      unsub();
    };
  }, [setIsProduct]);
  return { productData };
};

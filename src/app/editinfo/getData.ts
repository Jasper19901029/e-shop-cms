"use client";
import { useState, useEffect } from "react";
import { db, Product } from "../../utils/filebase/firebase";
import { query, onSnapshot, collection } from "firebase/firestore";

export const useGetDriedFruitsData = () => {
  const [isDriedFruit, setIsDriedFruit] = useState(false);
  const [driedFruitsData, setDriedFruitsData] = useState<Product[]>();

  useEffect(() => {
    const q = query(collection(db, "果乾"));
    const unsub = onSnapshot(q, (doc) => {
      setDriedFruitsData(doc.docs.map((doc) => doc.data()) as Product[]);
    });
    return () => {
      unsub();
    };
  }, [isDriedFruit]);

  useEffect(() => {
    const q = query(collection(db, "果乾"));
    const unsub = onSnapshot(q, (doc) => {
      doc.docChanges().forEach((doc) => {
        if (doc.type === "modified") {
          setIsDriedFruit(!isDriedFruit);
        }
      });
    });
    return () => {
      unsub();
    };
  }, [setIsDriedFruit]);
  return { driedFruitsData };
};

export const useGetFruitsData = () => {
  const [isFruit, setIsFruit] = useState(false);
  const [fruitsData, setFruitsData] = useState<Product[]>();

  useEffect(() => {
    const q = query(collection(db, "水果"));
    const unsub = onSnapshot(q, (doc) => {
      setFruitsData(doc.docs.map((doc) => doc.data()) as Product[]);
    });
    return () => {
      unsub();
    };
  }, [isFruit]);

  useEffect(() => {
    const q = query(collection(db, "果乾"));
    const unsub = onSnapshot(q, (doc) => {
      doc.docChanges().forEach((doc) => {
        if (doc.type === "modified") {
          setIsFruit(!isFruit);
        }
      });
    });
    return () => {
      unsub();
    };
  }, [fruitsData]);
  return { fruitsData };
};

"use client";
import { useState, useEffect } from "react";
import { db, Order } from "../../utils/firebase/firebase";
import { query, onSnapshot, collection } from "firebase/firestore";

export const useGetOrderLists = () => {
  const [isOrderList, setIsOrderList] = useState(false);
  const [orderList, setOrderList] = useState<Order[]>();

  useEffect(() => {
    const q = query(collection(db, "訂單"));
    const unsub = onSnapshot(q, (doc) => {
      setOrderList(doc.docs.map((doc) => doc.data()) as Order[]);
    });
    return () => {
      unsub();
    };
  }, [isOrderList]);

  useEffect(() => {
    const q = query(collection(db, "訂單"));
    const unsub = onSnapshot(q, (doc) => {
      doc.docChanges().forEach((doc) => {
        if (doc.type === "modified") {
          setIsOrderList(!isOrderList);
        }
      });
    });
    return () => {
      unsub();
    };
  }, [setIsOrderList]);
  return { orderList };
};

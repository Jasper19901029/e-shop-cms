"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      goBackToEditInfo();
    }, 3000);
    return () => clearTimeout(timer);
  });
  const goBackToEditInfo = () => {
    router.push("/editinfo");
  };
  return <div>nothing to show, go back to the edit page on ten seconds.</div>;
}

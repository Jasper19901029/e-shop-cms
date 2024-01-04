"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function NotFound() {
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
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find the page. Back to Editinfo page after 3 seconds.</p>
      <Link href="/editinfo">Return Editinfo page right now.</Link>
    </div>
  );
}

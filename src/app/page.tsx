"use client";
import { DocumentData } from "firebase/firestore";
import { uploadToStorage } from "../utils/filebase/firebase";

import { useState } from "react";

export default function Home() {
  const [fileUrl, setFileUrl] = useState("");

  const handleInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!e.target.files) return;
    const url = await uploadToStorage(e.target.files[0]);
    setFileUrl(url);
  };

  return (
    <main className="">
      <div className=""></div>
    </main>
  );
}

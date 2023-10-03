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
  const abc = async () => {
    const bb = await fetch("http://localhost:3000/api/mydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        abc: "hello",
      }),
    });
    const aa = await bb.json();
    console.log(aa);
  };
  abc();
  return (
    <main className="">
      <div className=""></div>
    </main>
  );
}

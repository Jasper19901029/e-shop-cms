"use client";
import React from "react";
import { transformImage } from "./change";

export default function ImageTestPage() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    console.log(e.target.files[0]);
    // const data = transformImage(e.target.files[0]);
    // console.log(data);
  };
  return (
    <div>
      <h2>ImageTestPage</h2>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" onChange={handleChange} />
    </div>
  );
}

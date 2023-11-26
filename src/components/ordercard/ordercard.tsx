"use client";
import { useState } from "react";

export default function Ordercard(): React.ReactNode {
  return (
    <div>
      <p>order date:2023/11/23</p>
      <p>name:susan</p>
      <p>phone:0912345678</p>
      <p>address:台北市中正區</p>
      <p>
        products:
        <ul>
          <li>banana 4pic * 500</li>
          <li>orange 5pic * 100</li>
        </ul>
      </p>
      <p>total price:2500</p>
      <p>finished:false</p>
      <p>client memo: hi</p>
      <label>
        memo:
        <input />
      </label>
      <button>print</button>
    </div>
  );
}

import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Modal({ children }: Props) {
  return (
    <div className="w-[1500px] opacity-50 bg-black">
      <div className="w-[1000px] h-[600px] bg-black">{children}</div>
    </div>
  );
}

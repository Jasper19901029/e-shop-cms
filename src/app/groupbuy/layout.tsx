import React, { ReactNode } from "react";

function GroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full lg:h-full">
      <h2 className="text-2xl ml-8 mt-8">團購資訊</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default GroupLayout;

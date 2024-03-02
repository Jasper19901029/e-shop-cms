import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col lg:h-full w-full">
      <h2 className="text-2xl ml-8 mt-8">新增產品</h2>
      <div className="mt-4 mx-auto">{children}</div>
    </div>
  );
}

export default layout;

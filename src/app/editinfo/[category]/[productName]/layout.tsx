import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col items-center mt-4 ml-6">{children}</div>;
}

export default layout;

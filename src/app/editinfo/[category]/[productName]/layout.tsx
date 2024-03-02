import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center mt-4 ml-6">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}

export default layout;

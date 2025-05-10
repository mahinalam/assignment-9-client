import React, { ReactNode } from "react";

const DashboardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1500px] mx-auto   md:px-10 sm:px-2 px-4  ">
      {children}
    </div>
  );
};

export default DashboardContainer;

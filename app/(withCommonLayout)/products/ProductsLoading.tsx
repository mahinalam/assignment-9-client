"use client";
import { Skeleton } from "@nextui-org/react";
import React from "react";

const ProductsLoading = () => {
  return (
    <div className="flex mt-[170px]">
      {/* <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="space-y-2">
              <Skeleton className="rounded-lg w-full h-[200px]" />
              <Skeleton className="h-4 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="hidden lg:block w-[25%] pr-4 space-y-4">
          <Skeleton className="h-6 w-1/2 rounded-lg" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <Skeleton className="h-6 w-1/3 rounded-lg mt-4" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg mt-4" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-5/6 rounded-lg" />
        </div>
      </div> */}
      {/* <p>Loading</p> */}
      <Skeleton className="h-[366px] w-full rounded-lg" />
    </div>
  );
};

export default ProductsLoading;

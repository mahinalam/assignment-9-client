"use client";

import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

import Container from "@/app/components/sharred/Container";

const StorePageLoading = () => {
  return (
    <Container>
      <div className="md:mt-[96px] mt-[62px] lg:mt-[160px]">
        {/* Store Banner Skeleton */}
        <div className="bg-white px-4 md:px-8 py-6 md:py-10 border-b">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-10">
            {/* Left side: logo and shop info */}
            <div className="flex gap-4 md:gap-6 items-start w-full lg:w-auto">
              <Skeleton className="rounded-full w-20 h-20" />

              <div className="flex flex-col gap-2 w-full max-w-sm">
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md mt-2" />
              </div>
            </div>

            {/* Right side: search bar */}
            <div className="hidden lg:block w-full lg:w-1/3">
              <Skeleton className="h-10 rounded-md" />
            </div>
          </div>
        </div>

        {/* Products section skeleton */}
        <div className="bg-white mt-4 p-5">
          <Skeleton className="h-6 w-32 rounded-md mb-4" />

          <div className="grid sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="border p-3 rounded-lg shadow-sm">
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md mt-3" />
                <Skeleton className="h-4 w-1/2 rounded-md mt-2" />
                <Skeleton className="h-4 w-1/4 rounded-md mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StorePageLoading;

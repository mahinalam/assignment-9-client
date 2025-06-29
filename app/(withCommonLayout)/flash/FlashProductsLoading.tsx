"use client";
import React from "react";

import Container from "@/app/components/sharred/Container";

const FlashProductsLoading = () => {
  return (
    <Container>
      <div className="mt-[62px] sm:mt-[96px] lg:mt-[160px]">
        {/* Heading Skeleton */}
        <div className="flex justify-center py-6 lg:py-8">
          <div className="h-8 w-40 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Flash Product Cards Grid Skeleton */}
        <div className="grid bg-white sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-72 bg-gray-200 rounded-xl animate-pulse"
            >
              <div className="h-40 bg-gray-300 rounded-t-xl" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FlashProductsLoading;

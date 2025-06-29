"use client";

import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

import Container from "@/app/components/sharred/Container";

const ShopCardLoading = () => {
  return (
    <Container>
      <div className="md:mt-44 mt-20 bg-white px-4">
        <div className="flex justify-center">
          <div className="text-center md:w-1/2 w-full mb-8">
            <Skeleton className="h-8 w-40 mx-auto rounded-lg mb-2" />
            <Skeleton className="h-4 w-3/4 mx-auto rounded-md" />
          </div>
        </div>

        {/* Grid of Skeleton Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="border p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-sm mx-auto"
            >
              {/* Logo Skeleton */}
              <div className="flex justify-center">
                <div className="bg-gray-100 p-4 rounded-full shadow-sm">
                  <Skeleton className="size-28 rounded-full" />
                </div>
              </div>

              {/* Info Skeleton */}
              <div className="mt-4 text-center space-y-2">
                <Skeleton className="h-5 w-32 mx-auto rounded-md" />
                <Skeleton className="h-3 w-40 mx-auto rounded-md" />
                <Skeleton className="h-4 w-24 mx-auto mt-2 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ShopCardLoading;

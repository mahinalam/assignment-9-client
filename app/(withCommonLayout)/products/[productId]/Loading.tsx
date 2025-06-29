"use client";

import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

import Container from "@/app/components/sharred/Container";

const ProductDetailsLoading = () => {
  return (
    <Container>
      <div className="bg-white md:mt-[170px] mt-10 lg:p-8 md:p-5 md:pl-3 px-4">
        {/* Product Detail Card */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Skeleton className="w-full h-72 rounded-xl" /> {/* Image */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-1/3 rounded-md" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-10">
          <Skeleton className="h-6 w-28 rounded-md" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        {/* Description or Reviews */}
        <div className="mt-4 space-y-3">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>

        {/* Related Products */}
        <div className="lg:pt-10 pt-8">
          <Skeleton className="h-6 w-40 rounded-md mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="border p-3 rounded-lg shadow-sm space-y-2"
              >
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
                <Skeleton className="h-4 w-1/3 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailsLoading;

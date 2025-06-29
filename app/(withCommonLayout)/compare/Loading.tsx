import React from "react";

import Container from "@/app/components/sharred/Container";

const CompareCartLoading = () => {
  const placeholders = Array(3).fill(0); // Show 3 skeleton compare items

  return (
    <Container>
      <div className="mt-[62px] sm:mt-[96px] lg:mt-44 grid grid-cols-12">
        {/* Left Column Titles */}
        <div className="col-span-3 flex flex-col justify-center border-1">
          <div className="size-[300px] flex items-center">
            <div className="h-[200px] w-[200px] bg-gray-200 rounded-md mx-auto animate-pulse" />
          </div>
          <div className="h-6 bg-gray-200 rounded m-2 animate-pulse w-3/4" />
          <div className="h-6 bg-gray-200 rounded m-2 animate-pulse w-2/3" />
          <div className="h-6 bg-gray-200 rounded m-2 animate-pulse w-1/2" />
          <div className="h-6 bg-gray-200 rounded m-2 animate-pulse w-1/3" />
          <div className="h-10 bg-gray-200 rounded m-2 animate-pulse w-3/4" />
        </div>

        {/* Right Compare Product Skeletons */}
        <div className="col-span-9 flex w-full">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="flex flex-col border-1 border-gray-200 mx-2 w-full max-w-[200px]"
            >
              <div className="h-[200px] bg-gray-200 rounded animate-pulse m-2" />
              <div className="h-6 bg-gray-200 rounded m-2 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded m-2 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded m-2 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded m-2 animate-pulse" />
              <div className="h-10 bg-gray-300 rounded m-2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CompareCartLoading;

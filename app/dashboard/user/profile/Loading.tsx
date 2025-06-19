import React from "react";

const Loading = () => {
  return (
    <div className="p-8 space-y-8 animate-pulse">
      {/* Sidebar Title Skeleton */}
      <div className="h-6 w-48 bg-gray-200 rounded" />

      {/* Image Placeholder */}
      <div className="w-[200px] h-[200px] bg-gray-200 rounded-full " />

      {/* Form Fields Skeleton */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* Select and Upload Skeleton */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="flex gap-4 mt-10">
        <div className="h-10 w-32 bg-gray-300 rounded" />
        <div className="h-10 w-32 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default Loading;

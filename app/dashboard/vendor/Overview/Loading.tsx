import { Skeleton } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div>
      {/* Sidebar Button Placeholder */}
      <div className="mb-5">
        <Skeleton className="w-40 h-10 rounded-lg" />
      </div>

      {/* Statistic Cards Skeleton */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-3">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="w-full h-24 rounded-lg" />
        ))}
      </div>

      {/* Recent Orders Table Skeleton */}
      <div className="mt-8">
        <Skeleton className="h-8 w-48 mb-4 rounded-lg" />
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-lg" />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-8">
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

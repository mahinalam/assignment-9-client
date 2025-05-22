import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const ProductsLoading = () => {
  const rows = Array(5).fill(null); // simulate 5 skeleton rows
  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="w-32 h-8 rounded-lg" />{" "}
        {/* Page title or header button */}
        {/* <Skeleton className="w-24 h-8 rounded-lg" /> */}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-4 py-2">
        <Skeleton className="h-5 w-full rounded-md col-span-1" />
        <Skeleton className="h-5 w-full rounded-md col-span-1" />
        <Skeleton className="h-5 w-full rounded-md col-span-1" />
        <Skeleton className="h-5 w-full rounded-md col-span-1" />
        <Skeleton className="h-5 w-full rounded-md col-span-1" />
        <Skeleton className="h-5 w-full rounded-md col-span-1" />
      </div>

      {/* Table Rows */}
      {rows.map((_, idx) => (
        <div
          key={idx}
          className="grid grid-cols-6 gap-4 items-center px-4 py-3 border border-default-100 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-md" /> {/* Image */}
            <div>
              <Skeleton className="h-4 w-24 rounded-md mb-1" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-6 w-12 rounded-md" /> {/* Actions */}
        </div>
      ))}

      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-6">
        <Skeleton className="h-8 w-40 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductsLoading;

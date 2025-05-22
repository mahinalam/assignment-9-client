import React from "react";

import {
  TableHeader,
  Table,
  TableBody,
  TableColumn,
  TableCell,
  TableRow,
  Skeleton,
} from "@nextui-org/react";

const StoresLoading = () => {
  const skeletonRows = new Array(5).fill(0); // for 5 rows
  return (
    <Table aria-label="Loading shop table">
      <TableHeader>
        <TableColumn>SHOP</TableColumn>
        <TableColumn>OWNER</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>CREATED AT</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {skeletonRows.map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex gap-3 items-center">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-6 rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StoresLoading;

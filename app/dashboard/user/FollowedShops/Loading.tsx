"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const Loading = () => {
  return (
    <>
      <Table aria-label="Loading skeleton table">
        <TableHeader>
          <TableColumn>SHOP</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-200 animate-pulse rounded-full size-12" />
                  <div className="w-24 h-4 bg-gray-200 animate-pulse rounded-md" />
                </div>
              </TableCell>
              <TableCell>
                <div className="w-32 h-4 bg-gray-200 animate-pulse rounded-md" />
              </TableCell>
              <TableCell>
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded-md" />
              </TableCell>
              <TableCell>
                <div className="w-28 h-4 bg-gray-200 animate-pulse rounded-md" />
              </TableCell>
              <TableCell>
                <div className="w-20 h-8 bg-gray-300 animate-pulse rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-8">
        <div className="w-48 h-10 bg-gray-200 animate-pulse rounded-md" />
      </div>
    </>
  );
};

export default Loading;

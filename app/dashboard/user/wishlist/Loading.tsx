import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="space-y-5">
      <div className="mb-5">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
      </div>

      <Table aria-label="Loading wishlist table">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>CREATED DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {[...Array(5)].map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <div className="size-12 bg-gray-200 rounded-md animate-pulse" />
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </TableCell>
              <TableCell>
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="w-10 h-4 bg-gray-200 rounded animate-pulse" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Loading;

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

function AllProductsLoading() {
  return (
    <div className="space-y-3 my-5">
      <Table aria-label="Loading categories">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>SHOP NAME</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>STOCK</TableColumn>
          <TableColumn>DISCOUNT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-3 w-32 rounded-md" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-24 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-24 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-8 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-8 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items gap-2 mt-8 justify-center">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

export default AllProductsLoading;

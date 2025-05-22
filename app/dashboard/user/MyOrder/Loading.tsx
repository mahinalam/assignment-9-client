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

function OrdersLoading() {
  return (
    <div className="mt-8">
      <Skeleton className="w-36 h-5 rounded-md mb-4" />{" "}
      {/* Table Title Skeleton */}
      <Table aria-label="Loading orders table">
        <TableHeader>
          <TableColumn>TRANSACTION ID</TableColumn>
          <TableColumn>PAYMENT STATUS</TableColumn>
          <TableColumn>SHIPPING ADDRESS</TableColumn>
          <TableColumn>ORDER ITEMS</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className="flex gap-2 items-center">
                  {/* <Skeleton className="w-10 h-10 rounded-full" /> */}
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-40 rounded-md" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-8 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-10 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrdersLoading;

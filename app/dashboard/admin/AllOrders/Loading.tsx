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
          <TableColumn>USER</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>TRANSACTION ID</TableColumn>
          <TableColumn>SHIPPING ADDRESS</TableColumn>
          <TableColumn>ORDER ITEMS</TableColumn>
          <TableColumn>ORDER DATE</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24 rounded-md" />
                    <Skeleton className="h-3 w-32 rounded-md" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-36 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-8 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrdersLoading;

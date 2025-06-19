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

import SidebarButton from "@/app/components/dashboard/SidebarButton";

const CouponsLoading = () => {
  return (
    <>
      <SidebarButton role="admin" title={"Coupons"} />
      <div className="flex justify-end mb-2">
        <Skeleton className="w-[140px] h-10 rounded-md" />
      </div>
      <Table aria-label="Loading coupon table">
        <TableHeader>
          <TableColumn>COUPON</TableColumn>
          <TableColumn>DISCOUNT</TableColumn>
          <TableColumn>DISCOUNT BY</TableColumn>
          <TableColumn>VALID TILL</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-24 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-6 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CouponsLoading;

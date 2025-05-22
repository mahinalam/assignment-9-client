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

const OrdersLoading = () => {
  return (
    <div className="mt-6 px-4">
      {/* <SidebarButton
        title={"Orders"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="vendor"
      /> */}
      <Skeleton className="h-4 w-40 rounded" />
      <Table aria-label="Loading table">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>RATING</TableColumn>
          <TableColumn>PAYMENT STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="rounded-full w-12 h-12" />
                  <Skeleton className="h-4 w-56 rounded" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersLoading;

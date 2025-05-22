import React from "react";
import {
  Skeleton,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const ReviewsLoading = () => {
  return (
    <>
      <Table aria-label="Loading review table">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>RATING</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Skeleton className="size-[40px] rounded" />
                  <div>
                    <Skeleton className="h-4 w-24 rounded mb-1" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Skeleton className="size-[40px] rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 rounded mb-1" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-10 rounded" />
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

export default ReviewsLoading;

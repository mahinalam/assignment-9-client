"use client";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const UsersLoading = () => {
  const rows = new Array(5).fill(null);

  return (
    <Table aria-label="Loading user table">
      <TableHeader>
        <TableColumn>PROFILE</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>CREATED AT</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex gap-3 items-center">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-28 rounded-md" />
                </div>
              </div>
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

export default UsersLoading;

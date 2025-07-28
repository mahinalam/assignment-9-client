"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@nextui-org/react";

import Container from "@/app/components/sharred/Container";

const WishlistSkeletonLoading = () => {
  return (
    <Container>
      <div className="mt-[62px] sm:mt-[96px] lg:mt-44 bg-white p-8">
        <div className="text-center mb-1 lg:pb-8 pb-5">
          <h1 className="lg:text-3xl text-2xl mb-2 font-bold">My Wishlist</h1>
        </div>

        <Table aria-label="Wishlist loading skeleton">
          <TableHeader>
            <TableColumn>PRODUCT</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>CREATED DATE</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Skeleton className="w-12 h-12 rounded-md" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-3 w-24 rounded" />
                      <Skeleton className="h-3 w-16 rounded" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-24 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-16 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-28 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-8 h-8 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default WishlistSkeletonLoading;

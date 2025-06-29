"use client";

import React from "react";

import CompareCart from "./CompareCart";
import CompareCartLoading from "./Loading";

import Container from "@/app/components/sharred/Container";
import { useGetUsersCompareProductsQuery } from "@/app/redux/features/compare/compareApi";
import EmptyState from "@/app/components/dashboard/EmptyState";

const ComparePage = () => {
  const { data: compareProducts, isLoading } =
    useGetUsersCompareProductsQuery(undefined);

  if (isLoading) {
    return <CompareCartLoading />;
  }

  return (
    <div className="bg-white">
      <Container>
        {compareProducts?.data?.length > 0 ? (
          <>
            {" "}
            <div className="mt-[62px] sm:mt-[96px] lg:mt-44 grid grid-cols-12">
              {/* left section */}

              <div className="col-span-3 flex flex-col justify-center border-1">
                <div className="size-[300px] flex  items-center">
                  <p className="p-2">Image</p>
                </div>
                <p className="p-2 pt-4 border-border border-1">Name</p>
                <p className="p-2 border-border border-1">Category</p>
                <p className="p-2 border-border border-1">Price</p>
                <p className="p-2 border-border border-1">Stock</p>
                <p className="p-2 border-border border-1">Add to cart</p>
              </div>
              <div className="col-span-9 flex w-full">
                {compareProducts?.data?.map((item: any, index: number) => (
                  <CompareCart key={index} product={item} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <EmptyState
              address="/"
              label="Go Home"
              message="No products to compare."
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default ComparePage;

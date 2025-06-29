import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

import Container from "@/app/components/sharred/Container";

const CartPageLoading = () => {
  return (
    <Container>
      <div className="pt-[100px] sm:pt-[120px] lg:pt-48 px-4 min-h-screen">
        <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-6">
          {/* Left: Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex gap-4 items-center"
              >
                <Skeleton className="w-24 h-24 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-1/2 rounded-md" />
                  <Skeleton className="h-4 w-1/3 rounded-md" />
                </div>
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4 bg-white p-4 rounded shadow space-y-4">
            <Skeleton className="h-6 w-1/2 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />

            <div className="flex gap-3 mt-4">
              <Skeleton className="h-10 w-3/5 rounded-md" />
              <Skeleton className="h-10 w-2/5 rounded-md" />
            </div>

            <Skeleton className="h-4 w-4/5 rounded-md" />
            <Skeleton className="h-6 w-full rounded-md mt-2" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartPageLoading;

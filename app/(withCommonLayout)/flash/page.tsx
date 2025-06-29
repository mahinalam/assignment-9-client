"use client";
import React, { useState } from "react";
import { Pagination } from "@nextui-org/react";

import FlashProductsLoading from "./FlashProductsLoading";

import Container from "@/app/components/sharred/Container";
import FlashSaleCard from "@/app/components/sharred/FlashSaleCard";
import { useGetAllFlashProductsQuery } from "@/app/redux/features/product/productApi";
import { IProduct, TQueryParam } from "@/types";

const FlashProducts = () => {
  const [flashProductsParams, setFlashProductsParams] = useState<
    TQueryParam[] | undefined
  >([
    { name: "page", value: 1 },
    { name: "limit", value: 10 },
  ]);
  const { data: flashProductsData, isLoading } =
    useGetAllFlashProductsQuery(flashProductsParams);

  if (isLoading) {
    return <FlashProductsLoading />;
  }

  const totalFlashProducts = flashProductsData?.data?.meta?.total || 0;
  const totalFlashProductPages = Math.ceil(totalFlashProducts / 10);

  // pagination handler for all products
  const handleAllShopsPageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 10 },
    );
    setFlashProductsParams(queryParams);
  };

  return (
    <Container>
      <div className="mt-[62px] sm:mt-[96px] lg:mt-[160px]">
        <div>
          <h1 className="lg:text-3xl text-2xl  font-bold text-center lg:py-8 py-6">
            Flash Products
          </h1>
        </div>
        <div className="grid bg-white sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 mt-2 gap-4">
          {/* <div className="grid  grid-cols-2"> */}
          {flashProductsData?.data?.data?.map((flashSaleProduct: IProduct) => (
            <FlashSaleCard
              key={flashSaleProduct.id}
              product={flashSaleProduct}
            />
          ))}
        </div>
      </div>
      <div className="flex  justify-center mt-8">
        <Pagination
          showControls
          initialPage={flashProductsParams?.[0].value as number}
          total={totalFlashProductPages}
          onChange={handleAllShopsPageChange}
        />
      </div>
    </Container>
  );
};

export default FlashProducts;

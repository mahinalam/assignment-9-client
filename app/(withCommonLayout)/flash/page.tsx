"use client";
import React from "react";

import Container from "@/app/components/sharred/Container";
import FlashSaleCard from "@/app/components/sharred/FlashSaleCard";
import { useGetAllFlashProductsQuery } from "@/app/redux/features/product/productApi";
import { IProduct } from "@/types";

const FlashProducts = () => {
  const { data: flashProductsData } = useGetAllFlashProductsQuery(undefined);

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
    </Container>
  );
};

export default FlashProducts;

"use client";

import React, { useState } from "react";
import { Pagination } from "@nextui-org/react";

import ShopCard from "./ShopCard";
import ShopCardLoading from "./Loading";

import { useGetAllShopsQuery } from "@/app/redux/features/shop/shopApi";
import Container from "@/app/components/sharred/Container";
import { TQueryParam } from "@/types";

const StorePage = () => {
  const [shopParams, setShopParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 8 },
  ]);
  const {
    data: shopData,
    isLoading: shopDataLoading,
    isFetching,
  } = useGetAllShopsQuery(shopParams);

  if (shopDataLoading || isFetching) {
    return <ShopCardLoading />;
  }

  const totalShops = shopData?.data?.meta?.total || 0;
  const totalShopPages = Math.ceil(totalShops / 8);

  // pagination handler for all products
  const handleAllShopsPageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 8 },
    );
    setShopParams(queryParams);
  };

  return (
    <Container>
      <div className="md:pt-44 pt-20 bg-white">
        <div className="flex justify-center">
          <div className="text-center md:w-1/2 w-full">
            <p className="lg:text-3xl text-xl font-bold">Our Shops</p>
            <p className="text-slate-500 md:mt-4 mt-1 md:text-[16px] text-sm">
              Discover our curated collection of tech shops offering the latest
              gadgets, accessories, and more.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:mt-10 mt-5">
          {shopData?.data?.data?.map((shop: any, index: number) => (
            <ShopCard key={index} shop={shop} />
          ))}
        </div>
      </div>
      <div className="flex  justify-center mt-8">
        <Pagination
          showControls
          initialPage={shopParams?.[0].value as number}
          total={totalShopPages}
          onChange={handleAllShopsPageChange}
        />
      </div>
    </Container>
  );
};

export default StorePage;

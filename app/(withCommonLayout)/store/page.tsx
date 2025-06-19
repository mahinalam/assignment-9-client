"use client";

import React from "react";
import Link from "next/link";

import ShopCard from "./ShopCard";

import { useGetAllShopsQuery } from "@/app/redux/features/shop/shopApi";
import Loader from "@/app/components/sharred/Loader";
import Container from "@/app/components/sharred/Container";

const StorePage = () => {
  const { data: shopData, isLoading: shopDataLoading } =
    useGetAllShopsQuery(null);

  if (shopDataLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="md:mt-44 mt-20 bg-white">
        <div className="flex justify-center">
          <div className="text-center md:w-1/2 w-full">
            <p className="lg:text-3xl text-xl font-bold">Our Shops</p>
            <p className="text-slate-500 md:mt-4 mt-1 md:text-[16px] text-sm">
              Discover our curated collection of tech shops offering the latest
              gadgets, accessories, and more.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-1  md:gap-4 md:mt-10 mt-5">
          {shopData?.data?.data?.map((shop: any) => (
            <Link key={shop.id} href={`/store/${shop.id}`}>
              <ShopCard shop={shop} />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default StorePage;

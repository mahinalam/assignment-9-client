"use client";

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

import StoreBanner from "../StoreBanner";

import { IProduct } from "@/types";
import { useGetAllVendorProductsQuery } from "@/app/redux/features/product/productApi";
import Loader from "@/app/components/sharred/Loader";
import {
  useCheckIsFollowingQuery,
  useFollowShopMutation,
  useUnFollowShopMutation,
} from "@/app/redux/features/shop/shopApi";
import Container from "@/app/components/sharred/Container";
import FlashSaleCard from "@/app/components/sharred/FlashSaleCard";

const StorePage = ({ params }: { params: { shopId: string } }) => {
  const { data: allProducts, isLoading: vendorProductLoading } =
    useGetAllVendorProductsQuery(params?.shopId);

  const [followShop, { isLoading: followLoading }] = useFollowShopMutation();
  const [unFollowShop, { isLoading: unFollowLoading }] =
    useUnFollowShopMutation();

  const [storeValue, setStoreValue] = useState<string>("");

  const { data: isFollowing } = useCheckIsFollowingQuery(params.shopId, {
    skip: !params.shopId,
  });

  if (vendorProductLoading) {
    return <Loader />;
  }

  const storeProductData = allProducts?.data;
  const storeData = {
    id: storeProductData?.id,
    name: storeProductData?.name,
    logo: storeProductData?.logo,
    follower: storeProductData?.followingShop?.length,
    createdAt: storeProductData?.createdAt,
    description: storeProductData?.descriptin,
  };

  //TODO: implement search in store section

  const handleFollowShop = async () => {
    const followShopData = {
      shopId: params.shopId,
    };

    // follow shop

    const res = await followShop(followShopData);

    if (res?.data?.success) {
      toast.success("Successfully followed shop");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleUnfollowShop = async () => {
    const res = await unFollowShop(params.shopId);

    if (res?.data?.success) {
      toast.success("Successfully unfollowed shop");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      <div className="md:mt-[96px] mt-[62px] lg:mt-[160px] ">
        <div className=" bg-white">
          <StoreBanner
            followLoading={followLoading}
            handleFollowShop={handleFollowShop}
            hanldeUnfollowShop={handleUnfollowShop}
            isFollower={isFollowing?.data?.success}
            setStoreValue={setStoreValue}
            storeData={storeData}
            unFollowLoading={unFollowLoading}
          />
        </div>
        <div className="bg-white mt-4 p-5">
          <p className="lg:text-lg text-base  font-bold py-4 lg:font-medium lg:text-left text-center ">
            All Products
          </p>
          <div className="grid  sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 mt-2 gap-4">
            {/* <div className="grid  grid-cols-2"> */}
            {allProducts?.data?.product?.map((flashSaleProduct: IProduct) => (
              <Link
                key={flashSaleProduct.id}
                href={`/products/${flashSaleProduct.id}`}
              >
                <FlashSaleCard product={flashSaleProduct} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StorePage;

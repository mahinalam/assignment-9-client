"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import StoreBanner from "../StoreBanner";

import ProductCart from "@/app/components/sharred/ProductCard";
// import { useGetAllVendorProductsQuery } from "@/app/redux/api/baseApi";
import { IProduct, TQueryParam } from "@/types";
import { useGetAllVendorProductsQuery } from "@/app/redux/features/product/productApi";
import Loader from "@/app/components/sharred/Loader";
import { RootState } from "@/app/redux/store";
import { useFollowShopMutation } from "@/app/redux/features/shop/shopApi";
import Container from "@/app/components/sharred/Container";
import NotFound from "@/app/components/sharred/NotFound";

const StorePage = ({ params }: { params: { shopId: string } }) => {
  console.log(params);

  // const [vendorProductParams, setVendorProductParams] = useState<
  //   TQueryParam[] | undefined
  // >([{ name: "shopId", value: params.shopId }]);
  const { data: allProducts, isLoading: vendorProductLoading } =
    useGetAllVendorProductsQuery(params?.shopId);

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const [isFollower, setIsFollower] = useState(false);

  const [followShop] = useFollowShopMutation();

  const [storeValue, setStoreValue] = useState<string>("");

  if (vendorProductLoading) {
    return <Loader />;
  }
  console.log("vendor all products", allProducts);

  const storeProductData = allProducts?.data;
  console.log("allProducts", allProducts);
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

    console.log("followShopData", followShopData);
    // follow shop
    try {
      const res = await followShop(followShopData);

      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error("something went wrong");
      }
    } catch (err) {
      toast.error("something went wrong");
      console.log(err);
    }
  };

  return (
    <Container>
      <div className="md:mt-[96px] mt-[62px] lg:mt-[160px]">
        <div className=" bg-white">
          <StoreBanner
            handleFollowShop={handleFollowShop}
            isFollower={isFollower}
            storeData={storeData}
            setStoreValue={setStoreValue}
          />
        </div>
        <div className="bg-white mt-4">
          <p className="lg:text-lg text-base  font-bold py-4 lg:font-medium lg:text-left text-center ">
            All Products
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {allProducts?.data?.product?.map((product: IProduct) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              {" "}
              <ProductCart product={product} />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default StorePage;

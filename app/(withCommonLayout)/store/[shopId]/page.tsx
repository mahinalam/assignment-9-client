"use client";

import Link from "next/link";
import React, { useState } from "react";

import ProductCart from "@/app/components/sharred/ProductCard";
import StoreBanner from "@/app/components/store/StoreBanner";
// import { useGetAllVendorProductsQuery } from "@/app/redux/api/baseApi";
import { IProduct } from "@/types";
import { useGetAllVendorProductsQuery } from "@/app/redux/features/product/productApi";
import Loader from "@/app/components/sharred/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useFollowShopMutation } from "@/app/redux/features/shop/shopApi";
import { toast } from "sonner";

const StorePage = ({ params }: { params: { shopId: string } }) => {
  console.log(params);

  const { data: allProducts, isLoading: vendorProductLoading } =
    useGetAllVendorProductsQuery(params.shopId);

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const [isFollower, setIsFollower] = useState(false);

  const [followShop] = useFollowShopMutation();

  if (vendorProductLoading) {
    return <Loader />;
  }
  console.log("allProducts", allProducts?.data);
  const storeData = {
    id: allProducts?.data.id,
    name: allProducts.data.name,
    logo: allProducts.data.logo,
    follower: allProducts?.data?.followingShop?.length,
  };

  const handleFollowShop = async () => {
    const followShopData = {
      shopId: params.shopId,
      followerId: userId!,
    };
    console.log("followShopData");
    // follow shop
    try {
      const res = await followShop(followShopData);
      if (res?.data?.success) {
        setIsFollower(true);
        toast.success(res?.data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="md:my-10 my-5">
        <StoreBanner
          isFollower={isFollower}
          storeData={storeData}
          handleFollowShop={handleFollowShop}
        />
      </div>
      <div>
        <p className="md:text-lg text-base  font-medium md:text-left text-center">
          All Products
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
        {allProducts.data.products.map((product: IProduct) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            {" "}
            <ProductCart product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StorePage;

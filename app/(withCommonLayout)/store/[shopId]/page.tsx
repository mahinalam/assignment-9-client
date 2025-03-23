"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import StoreBanner from "../StoreBanner";

import ProductCart from "@/app/components/sharred/ProductCard";
// import { useGetAllVendorProductsQuery } from "@/app/redux/api/baseApi";
import { IProduct } from "@/types";
import { useGetAllVendorProductsQuery } from "@/app/redux/features/product/productApi";
import Loader from "@/app/components/sharred/Loader";
import { RootState } from "@/app/redux/store";
import { useFollowShopMutation } from "@/app/redux/features/shop/shopApi";
import Container from "@/app/components/sharred/Container";

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
  console.log("allProducts", allProducts);
  const storeData = {
    id: allProducts?.data.id,
    name: allProducts.data.name,
    logo: allProducts.data.logo,
    follower: allProducts?.data?.followingShop?.length,
    createdAt: allProducts?.data?.createdAt,
    description: allProducts?.data?.descriptin,
  };

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
      <div className="md:my-10 my-5 pt-10 bg-white">
        <StoreBanner
          handleFollowShop={handleFollowShop}
          isFollower={isFollower}
          storeData={storeData}
        />
      </div>
      <div>
        <p className="md:text-lg text-base  font-medium md:text-left text-center">
          Products
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
    </Container>
  );
};

export default StorePage;

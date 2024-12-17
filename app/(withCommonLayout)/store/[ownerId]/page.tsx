"use client";

import Link from "next/link";
import React from "react";

import ProductCart from "@/app/components/sharred/ProductCard";
import StoreBanner from "@/app/components/store/StoreBanner";
// import { useGetAllVendorProductsQuery } from "@/app/redux/api/baseApi";
import { IProduct } from "@/types";
import { useGetAllVendorProductsQuery } from "@/app/redux/features/product/productApi";

const StorePage = ({ params }: { params: { ownerId: string } }) => {
  console.log(params);
  const { data: allProducts, isLoading } = useGetAllVendorProductsQuery(
    params.ownerId
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  console.log("vendor all products", allProducts);
  // const { id, name, description } = allProducts?.data;
  console.log("id", allProducts?.data);

  const storeData = {
    id: allProducts?.data.id,
    name: allProducts.data.name,
    logo: allProducts.data.logo,
  };

  console.log(storeData);

  return (
    <div>
      <div className="md:my-10 my-5">
        <StoreBanner storeData={storeData} />
      </div>
      <div>
        <p className="md:text-lg text-[14px]  font-medium md:text-left text-center">
          All Products
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
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

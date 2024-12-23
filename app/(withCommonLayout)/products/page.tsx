"use client";

import React, { useState } from "react";

// import SortSearch from "@/app/components/products/SortSearch";
import ProductCart from "@/app/components/sharred/ProductCard";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import { IProduct, TQueryParam } from "@/types";
import { Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import Loader from "@/app/components/sharred/Loader";

const Products = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: productsData, isLoading: productsDataLoading } =
    useGetAllProductsQuery(params);

  const queryParams: TQueryParam[] = [];

  // const handleSearchInput = (value: string) => {
  //   console.log(value);

  //   // if (value) {
  //   // filters.name?.forEach((item) =>
  //   queryParams.push({ name: "searchTerms", value });
  //   // );

  //   // filters.year?.forEach((item) =>
  //   //   queryParams.push({ name: 'year', value: item })
  //   // );
  //   setParams(queryParams);
  //   // }
  // };

  // // console.log({ params });
  // console.log("productsData", productsData);

  // const handleSortInput = (value: string) => {
  //   if (value) {
  //     queryParams.push({ name: "sortOrder", value });
  //     queryParams.push({ name: "sortBy", value: "newPrice" });
  //   }
  //   console.log(value);
  // };

  if (productsDataLoading) {
    return <Loader />;
  }

  const handleSearchInput = (value: string) => {
    console.log(value);

    // Clear any existing "searchTerms" in queryParams
    const updatedQueryParams = queryParams.filter(
      (param) => param.name !== "searchTerms"
    );

    if (value) {
      // Add the new "searchTerms" value
      updatedQueryParams.push({ name: "searchTerms", value });
    }

    setParams(updatedQueryParams); // Update the query parameters
    console.log("Updated Query Params:", updatedQueryParams);
  };

  const handleSortInput = (value: string) => {
    // Clear any existing "sortOrder" or "sortBy" in queryParams
    const updatedQueryParams = queryParams.filter(
      (param) => param.name !== "sortOrder" && param.name !== "sortBy"
    );

    if (value) {
      // Add the new "sortOrder" and "sortBy" values
      updatedQueryParams.push({ name: "sortOrder", value });
      updatedQueryParams.push({ name: "sortBy", value: "newPrice" });
    }

    setParams(updatedQueryParams); // Update the query parameters
    console.log("Updated Query Params:", updatedQueryParams);
  };

  console.log("queryParams", queryParams);
  return (
    <div className="w-full mt-5 ">
      <div className="flex flex-wrap items-center justify-between gap-4 md:my-5 my-3">
        {/* Search Input */}
        <Input
          onChange={(e) => handleSearchInput(e.target.value)}
          placeholder="Search Products by name"
          type="text"
          className="flex-grow max-w-md"
        />

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort By:</span>
          <Select
            onChange={(e) => handleSortInput(e.target.value)}
            className="w-48"
            // label="Select a Price"
          >
            <SelectItem key="asc">Price Low to High</SelectItem>
            <SelectItem key="desc">Price High to Low</SelectItem>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-6 grid-cols-2 sm:grid-cols-3 gap-4 ">
        {productsData?.data?.map((item: IProduct) => (
          <Link href={`/products/${item.id}`} key={item.id}>
            <ProductCart product={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;

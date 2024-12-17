"use client";

import React, { useState } from "react";

// import SortSearch from "@/app/components/products/SortSearch";
import ProductCart from "@/app/components/sharred/ProductCard";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import { IProduct, TQueryParam } from "@/types";
import { Input } from "@nextui-org/react";

const Products = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: productsData } = useGetAllProductsQuery(params);

  const handleInputChange = (value: string) => {
    console.log(value);

    if (value) {
      const queryParams: TQueryParam[] = [];

      // filters.name?.forEach((item) =>
      queryParams.push({ name: "searchTerms", value });
      // );

      // filters.year?.forEach((item) =>
      //   queryParams.push({ name: 'year', value: item })
      // );

      setParams(queryParams);
    }
  };

  // console.log({ params });
  console.log("productsData", productsData);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <Input
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search Products by name"
            type="text"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-6 gap-4">
        {productsData?.data?.map((item: IProduct) => (
          <ProductCart key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;

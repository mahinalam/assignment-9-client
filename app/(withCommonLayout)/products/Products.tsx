"use client";

import React, { useEffect, useState } from "react";

// import SortSearch from "@/app/components/products/SortSearch";
import { Input, Pagination, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import RateComponent from "./Rate";

import ProductCart from "@/app/components/sharred/ProductCard";
import {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
} from "@/app/redux/features/category/categoryApi";
import {
  useGetAllProductsByCategoryQuery,
  useGetAllProductsQuery,
} from "@/app/redux/features/product/productApi";
import { ICategory, IProduct, TQueryParam } from "@/types";
import Loader from "@/app/components/sharred/Loader";

import "rc-rate/assets/index.css";
import { Button } from "@nextui-org/button";
import { Card, Skeleton } from "@nextui-org/react";
import NotFound from "@/app/components/sharred/NotFound";

// import { useRouter } from "next/router";

const Products = () => {
  // const router = useRouter();
  // const { search } = router.query;
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const searchParams = useSearchParams();
  const value = searchParams.get("search");
  const categoryValue = searchParams.get("category");

  console.log("categoryValue", categoryValue);

  console.log("value", value);
  const [minPrice, setMinPrice] = useState<string | number>(1);
  const [maxPrice, setMaxPrice] = useState<string | number>(1);
  const [currentPage, setCurrentPage] = useState<string | number>(1);
  const [tabValue, setTabValue] = useState("all");

  const router = useRouter();

  const {
    data: productsData,
    isLoading: productsDataLoading,
    isFetching,
  } = useGetAllProductsQuery(params);

  const {
    data: categoriesDataInfo,
    isLoading: categoryDataInfoLoading,
    // isFetching,
  } = useGetAllCategoriesQuery(null);

  const [categorySelected, setCategorySelected] = useState("");

  const [isCheckBoxSelected, setIsCheckBoxSelected] = useState("");

  const [checkCategory, setCheckCategory] = useState<
    {
      id: string;
      isSelected: boolean;
    }[]
  >([]);

  const { data: categoryProductData, isLoading: categoryProductDataLoading } =
    useGetAllProductsByCategoryQuery(params);

  console.log("categoryProductData", categoryProductData);

  console.log("products data", productsData);
  console.log("isFetching", isFetching);

  const { data: categoriesData, isLoading: categoriesDataLoading } =
    useGetAllCategoriesQuery(null);
  const { data: singleCategoryData, isLoading: singleCategoryLoading } =
    useGetSingleCategoryQuery(categoryValue);
  // console.log("categoriesData", categoriesData);

  const [selectedRatingValue, setSelecdRatingValue] = useState(0);

  // const { data: brandData, isLoading: brandLoading } =
  //   useGetAllBrandsQuery(null);

  let queryParams: TQueryParam[] = [];

  useEffect(() => {
    if (value) {
      queryParams.push({ name: "searchTerm", value });
      setParams(queryParams);
    }
    if (categoryValue) {
      const updatedQueryParams = queryParams.filter(
        (param) => param.name !== "categoryId"
      );

      updatedQueryParams.push({ name: "categoryId", value: categoryValue });
      setParams(updatedQueryParams);
    }
  }, [value, categoryValue]);

  // console.log("brandData", brandData);
  if (
    categoriesDataLoading ||
    productsDataLoading ||
    categoryProductDataLoading
  ) {
    return <Loader />;
    // return (
    //   <Card className="w-[400px] space-y-5 p-4 mt-10" radius="lg">
    //     <Skeleton className="rounded-lg">
    //       <div className="h-24 rounded-lg bg-default-300" />
    //     </Skeleton>
    //     <div className="space-y-3">
    //       <Skeleton className="w-3/5 rounded-lg">
    //         <div className="h-3 w-3/5 rounded-lg bg-default-200" />
    //       </Skeleton>
    //       <Skeleton className="w-4/5 rounded-lg">
    //         <div className="h-3 w-4/5 rounded-lg bg-default-200" />
    //       </Skeleton>
    //       <Skeleton className="w-2/5 rounded-lg">
    //         <div className="h-3 w-2/5 rounded-lg bg-default-300" />
    //       </Skeleton>
    //     </div>
    //   </Card>
    // );
  }

  // const handlecategoryChange = (e: any) => {
  //   const value = e.target.value;

  //   if (value) {
  //     // queryParams.push({name})
  //     // queryParams.push({name})
  //     setCategorySelected(value);
  //   }
  //   // console.log("value from category", value);
  // };

  // const handleSearchInput = (value: string) => {
  //   console.log(value);

  //   // Clear any existing "searchTerms" in queryParams
  //   const updatedQueryParams = queryParams.filter(
  //     (param) => param.name !== "searchTerms"
  //   );

  //   if (value) {
  //     // Add the new "searchTerms" value
  //     updatedQueryParams.push({ name: "searchTerms", value });
  //   }

  //   setParams(updatedQueryParams); // Update the query parameters
  //   console.log("Updated Query Params:", updatedQueryParams);
  // };

  // Handle search input
  const handleSearchInput = (value: string) => {
    const updatedQueryParams =
      params?.filter((param) => param.name !== "searchTerms") || [];

    if (value) {
      updatedQueryParams.push({ name: "searchTerms", value });
    }
    setParams(updatedQueryParams); // Update query parameters
  };
  console.log("tab value", tabValue);
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
    // console.log("Updated Query Params:", updatedQueryParams);
  };

  const handlePriceFunctionality = () => {
    const updatedQueryParams = [];

    if (maxPrice) {
      updatedQueryParams.push({ name: "priceMax", value: maxPrice });
    }
    if (minPrice) {
      updatedQueryParams.push({ name: "priceMin", value: minPrice });
    }
    setParams(updatedQueryParams);
  };

  console.log({ singlecatgeory: singleCategoryData?.data?.name });
  const handleRatingFunctionality = (ratingValue: any) => {
    console.log("value", ratingValue);
    if (ratingValue) {
      setSelecdRatingValue(ratingValue);
      const updatedQueryParams = queryParams.filter(
        (param) => param.name !== "rating"
      );

      updatedQueryParams.push({ name: "rating", value: ratingValue });
      setParams(updatedQueryParams);
    }
  };

  // const handleCheckFunctionality = (categoryId, isSelected) => {};

  const handleChecked = (id: string) => {
    console.log("cheked", id);
    setIsCheckBoxSelected(id);
  };

  const totalProducts = productsData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / 10);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const updatedQueryParams = queryParams.filter(
      (param) => param.name !== "page"
    );

    updatedQueryParams.push({ name: "page", value: page });
    setParams(updatedQueryParams);
  };

  // Generate dynamic page numbers based on the current page
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Set maximum visible pages
    const halfRange = Math.floor(maxVisiblePages / 2);

    let startPage = Number(currentPage) - halfRange;
    let endPage = Number(currentPage) + halfRange;

    // Adjust start and end page if they go out of bounds
    if (startPage < 1) {
      startPage = 1;
      endPage = maxVisiblePages;
    }
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxVisiblePages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleTabCategory = (categoryId: string) => {
    setTabValue(categoryId);
    const updatedQueryParams = queryParams.filter(
      (param) => param.name !== "categoryId"
    );

    updatedQueryParams.push({ name: "categoryId", value: categoryId });
    setParams(updatedQueryParams);
  };

  // console.log("queryParams", queryParams);
  return (
    <div className="">
      {/* <div className="md:hidden flex items-center justify-between mt-20 md:mt-44 mb-5 ">
        {categoriesDataInfo?.data?.map((category: ICategory) => (
          <button
            onClick={() => handleTabCategory(category.id)}
            className={
              category.id === tabValue
                ? "text-primary border-b-2 border-b-primary"
                : ""
            }
          >
            {category.name}
          </button>
        ))}

      </div> */}
      <div className=" lg:hidden bg-white flex items-center justify-between mt-[62px] sm:mt-[96px] lg:mt-44 mb-5 overflow-x-auto space-x-1 scrollbar-hide">
        <button
          // Added a unique key for better React rendering
          onClick={() => handleTabCategory("all")}
          className={`px-4 py-2 whitespace-nowrap ${
            "all" === tabValue
              ? "text-primary border-b-2 border-b-primary"
              : "text-gray-700"
          }`}
        >
          All
        </button>
        <button
          // Added a unique key for better React rendering
          onClick={() => handleTabCategory("bestSale")}
          className={`px-4 py-2 whitespace-nowrap ${
            "bestSale" === tabValue
              ? "text-primary border-b-2 border-b-primary"
              : "text-gray-700"
          }`}
        >
          BestSale
        </button>
        {categoriesDataInfo?.data?.map((category: ICategory) => (
          <button
            key={category.id} // Added a unique key for better React rendering
            onClick={() => handleTabCategory(category.id)}
            className={`px-4 py-2 whitespace-nowrap ${
              category.id === tabValue
                ? "text-primary border-b-2 border-b-primary"
                : "text-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="w-full lg:mt-40 ">
        <div className="lg:block hidden">
          {/* Sort Options */}
          <div className="flex justify-end gap-2 items-center">
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
        <div className="flex ">
          <div className="hidden lg:block lg:w-[25%]">
            {/* <section>
              <div className="py-4 border-y-1">
                <p className="text-[14px] text-[#121212] mb-2">Category</p>
                <div>
                  {categoriesData?.data?.map((brand: any) => (
                    <CheckboxComponent
                      key={brand.id}
                      handleChecked={handleChecked}
                      id={brand.id}
                      title={brand.name}
                    />
                  ))}
                </div>
              </div>
            </section> */}
            {/* <section>
              <div className="py-4 border-y-1">
                <p className="text-[14px] text-[#121212] mb-2">Brand</p>
                <div>
                  {categoriesData?.data?.map((brand: any) => (
                    <Checkbox
                      size="sm"
                      onClick={() => handleCheckFunctionality(brand.id, true)}
                    >
                      <span className="ml-3 text-[13px] text-[#757575]">
              
                        {brand.name}
                      </span>
                    </Checkbox>
                  ))}
                </div>
              </div>
            </section> */}

            {/* price section */}
            {categoryValue && (
              <section>
                <div>
                  <p className="text-[14px] text-[#121212] mb-3">Category</p>
                  <p className="text-primary text-sm font-medium">
                    {singleCategoryData?.data?.name}
                  </p>
                </div>
              </section>
            )}
            <section className="pr-3">
              <div className="my-3 ">
                <p className="text-[14px] text-[#121212]">Price</p>
                <div className="flex items-center gap-1">
                  <div>
                    <Input
                      className="bg-transparent"
                      placeholder="Min"
                      type="number"
                      onChange={(e) => setMinPrice(e.target.value)}
                      size="sm"
                    />
                  </div>
                  <div>
                    <span>-</span>
                  </div>
                  <div>
                    <Input
                      className="border rounded-none bg-transparent"
                      placeholder="Max"
                      type="number"
                      size="sm"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <Button
                      radius="none"
                      size="sm"
                      onClick={handlePriceFunctionality}
                      className="bg-[#2abbe8] text-white hover:text-white hover:bg-primary m-0"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* rating section */}
            <section>
              <div className="border-y-1 py-3 mt-2">
                <p className="text-[14px] text-[#121212]">Rating</p>
                <RateComponent
                  handleRatingFunctionality={handleRatingFunctionality}
                  hasTitle={false}
                  ratingValue={selectedRatingValue}
                  value={5}
                />
                <RateComponent
                  handleRatingFunctionality={handleRatingFunctionality}
                  ratingValue={selectedRatingValue}
                  value={4}
                />
                <RateComponent
                  handleRatingFunctionality={handleRatingFunctionality}
                  ratingValue={selectedRatingValue}
                  value={3}
                />
                <RateComponent
                  handleRatingFunctionality={handleRatingFunctionality}
                  ratingValue={selectedRatingValue}
                  value={2}
                />
                <RateComponent
                  handleRatingFunctionality={handleRatingFunctionality}
                  ratingValue={selectedRatingValue}
                  value={1}
                />
              </div>
            </section>
          </div>
          {productsData?.data?.data?.length > 0 ? (
            <div className="grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-4 lg:w-[75%]">
              {productsData?.data?.data?.map((item: IProduct) => (
                <Link key={item.id} href={`/products/${item.id}`}>
                  <ProductCart product={item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="lg:mt-10  w-full min-h-[60vh]">
              <NotFound />
            </div>
          )}
        </div>
        <div className="md:block hidden">
          <div className=" mt-8 flex justify-end">
            <Pagination
              initialPage={currentPage as number}
              total={totalPages} // You should have this in your API response
              onChange={handlePageChange}
              showControls
              // renderItem={generatePageNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

"use client";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Input,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";

import RateComponent from "./Rate";
import ProductsLoading from "./ProductsLoading";

import {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
} from "@/app/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import { ICategory, IProduct, TQueryParam } from "@/types";
import "rc-rate/assets/index.css";
import NotFound from "@/app/components/sharred/NotFound";
import FlashSaleCard from "@/app/components/sharred/FlashSaleCard";

const Products = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const searchParams = useSearchParams();
  const value = searchParams.get("search");
  const categoryValue = searchParams.get("category");
  const [minPrice, setMinPrice] = useState<string | number>(1);
  const [maxPrice, setMaxPrice] = useState<string | number>(1);
  const [currentPage, setCurrentPage] = useState<string | number>(1);
  const [tabValue, setTabValue] = useState("all");

  const {
    data: productsData,
    isLoading: productsDataLoading,
    isFetching,
  } = useGetAllProductsQuery(params);

  const { data: categoriesDataInfo, isLoading: categoryDataInfoLoading } =
    useGetAllCategoriesQuery(null);

  const [isCheckBoxSelected, setIsCheckBoxSelected] = useState("");

  const { data: singleCategoryData, isLoading: singleCategoryLoading } =
    useGetSingleCategoryQuery(categoryValue);

  const [selectedRatingValue, setSelecdRatingValue] = useState(0);

  let queryParams: TQueryParam[] = [];

  useEffect(() => {
    if (value) {
      const updatedQueryParams = queryParams.filter(
        (param) => param.name !== "searchTerm",
      );

      updatedQueryParams.push({ name: "searchTerm", value });
      setParams(updatedQueryParams);
    }
    if (categoryValue) {
      const updatedQueryParams = queryParams.filter(
        (param) => param.name !== "categoryId",
      );

      updatedQueryParams.push({ name: "categoryId", value: categoryValue });
      setParams(updatedQueryParams);
    }
  }, [value, categoryValue]);

  if (productsDataLoading || isFetching) {
    return <ProductsLoading />;
  }

  const handleSortInput = (value: string) => {
    // Clear any existing "sortOrder" or "sortBy" in queryParams
    const updatedQueryParams = queryParams.filter(
      (param) => param.name !== "sortOrder" && param.name !== "sortBy",
    );

    if (value) {
      // Add the new "sortOrder" and "sortBy" values
      updatedQueryParams.push({ name: "sortOrder", value });
      updatedQueryParams.push({ name: "sortBy", value: "price" });
    }

    setParams(updatedQueryParams);
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

  const handleRatingFunctionality = (ratingValue: any) => {
    if (ratingValue) {
      setSelecdRatingValue(ratingValue);
      const updatedQueryParams = queryParams.filter(
        (param) => param.name !== "rating",
      );

      updatedQueryParams.push({ name: "rating", value: ratingValue });
      setParams(updatedQueryParams);
    }
  };

  const totalProducts = productsData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / 10);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const updatedQueryParams = queryParams.filter(
      (param) => param.name !== "page",
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
      (param) => param.name !== "categoryId",
    );

    updatedQueryParams.push({ name: "categoryId", value: categoryId });
    setParams(updatedQueryParams);
  };

  const hanldeCheck = (stock: string) => {
    setIsCheckBoxSelected(stock);

    const updatedQueryParams = queryParams.filter(
      (param) => param.name !== "stock",
    );

    updatedQueryParams.push({ name: "stock", value: stock });
    setParams(updatedQueryParams);
  };

  return (
    <div className="">
      <div className=" lg:hidden bg-white flex items-center gap-2 mt-[62px] sm:mt-[96px] lg:mt-44 mb-5 overflow-x-auto space-x-1 scrollbar-hide">
        <button
          // Added a unique key for better React rendering
          className={`px-4 py-2 whitespace-nowrap ${
            "all" === tabValue
              ? "text-primary border-b-2 border-b-primary"
              : "text-gray-700"
          }`}
          onClick={() => handleTabCategory("all")}
        >
          All
        </button>
        {categoriesDataInfo?.data?.data?.map((category: ICategory) => (
          <button
            key={category.id} // Added a unique key for better React rendering
            className={`px-4 py-2 whitespace-nowrap ${
              category.id === tabValue
                ? "text-primary border-b-2 border-b-primary"
                : "text-gray-700"
            }`}
            onClick={() => handleTabCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="w-full lg:mt-40 ">
        <div className="flex ">
          <div className="hidden lg:block lg:w-[25%]">
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
            <section>{/* categories section */}</section>
            {/* stock section */}
            <section className="mt-2">
              <p className="text-[14px] text-[#121212]">Stock</p>
              <div className="flex items-center gap-10  mt-1">
                <div className="flex gap-1 items-center">
                  <Checkbox
                    className="p-0"
                    isSelected={isCheckBoxSelected === "all"}
                    size="sm"
                    onClick={() => hanldeCheck("all")}
                  />
                  <p className="text-sm">All</p>
                </div>

                <div className="flex text-sm gap-1 items-center">
                  <Checkbox
                    className="p-0"
                    isSelected={isCheckBoxSelected === "in_stock"}
                    size="sm"
                    onClick={() => hanldeCheck("in_stock")}
                  />
                  In Stock
                </div>
              </div>
            </section>
            <section className="pr-3">
              <div className="my-3 ">
                <p className="text-[14px] text-[#121212]">Price</p>
                <div className="flex items-center gap-1">
                  <div>
                    <Input
                      className="bg-transparent"
                      placeholder="Min"
                      size="sm"
                      type="number"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <span>-</span>
                  </div>
                  <div>
                    <Input
                      className="border rounded-none bg-transparent"
                      placeholder="Max"
                      size="sm"
                      type="number"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <Button
                      className="bg-secondary text-black  m-0"
                      radius="none"
                      size="sm"
                      onClick={handlePriceFunctionality}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* rating section */}
            <section>
              <div className=" py-3 mt-2">
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

            {/* // sort section */}
            <section className="mt-2">
              <div className="lg:block hidden w-full">
                {/* Sort Options */}
                <div className=" gap-2 items-center">
                  <span className="text-sm flex-shrink-0 font-medium mb-1">
                    Sort By
                  </span>
                  <Select
                    className=""
                    defaultSelectedKeys={["asc"]}
                    onChange={(e) => handleSortInput(e.target.value)}
                  >
                    <SelectItem key="asc">Price Low to High</SelectItem>
                    <SelectItem key="desc">Price High to Low</SelectItem>
                  </Select>
                </div>
              </div>
            </section>
          </div>
          {productsData?.data?.data?.length > 0 ? (
            <div className="grid  md:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-4 lg:w-[75%]">
              {productsData?.data?.data
                ?.slice(0, 8)
                .map((item: IProduct) => (
                  <FlashSaleCard key={item.id} product={item} />
                ))}
            </div>
          ) : (
            <div className="lg:mt-10  w-full min-h-[60vh]">
              <NotFound />
            </div>
          )}
        </div>
        <div className="lg:w-[75%] w-full lg:ml-auto mt-8 flex justify-center">
          <Pagination
            showControls
            initialPage={currentPage as number}
            total={totalPages} // You should have this in your API response
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;

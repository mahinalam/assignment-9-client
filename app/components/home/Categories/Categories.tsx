import React from "react";
import Link from "next/link";

import Title from "../Title";

import CategoryCard from "./CategoryCard";

import { ICategory } from "@/types";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";
import Container from "../../sharred/Container";
import CategoriesSkeleton from "../../sharred/CategoriesSkeleon";

const Categories = () => {
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetAllCategoriesQuery(null);

  console.log("categories data", categoriesData);

  if (categoryLoading) {
    // return (
    //   <div className="w-full flex justify-center items-center mt-10">
    //     {/* You can replace this with your Loader component */}
    //     <span>Loading...</span>
    //   </div>
    // );
    return (
      <div className="mt-4">
        <Container>
          <div className="block sm:hidden">
            <Title title="Categories" />
            <div className="grid grid-cols-3 gap-4 ">
              <CategoriesSkeleton />
              <CategoriesSkeleton />
              <CategoriesSkeleton />
            </div>
          </div>
        </Container>

        {/* for small and lg loading */}
        <Container>
          <div className="hidden sm:block  xl:hidden ">
            <Title title="Categories" />
            <div className="grid   grid-cols-4 gap-2 ">
              <CategoriesSkeleton />
              <CategoriesSkeleton />
              <CategoriesSkeleton />
              <CategoriesSkeleton />
              {/* <SkeletonComponent /> */}
            </div>
          </div>
        </Container>
        {/* for xl and lg loading */}
        <Container>
          <div className="hidden   xl:block ">
            <Title title="Categories" />
            <div className="grid   grid-cols-6 gap-4 ">
              <CategoriesSkeleton />
              <CategoriesSkeleton />
              <CategoriesSkeleton />
              <CategoriesSkeleton />
              <CategoriesSkeleton />
              <CategoriesSkeleton />
              {/* <SkeletonComponent /> */}
            </div>
          </div>
        </Container>
        {/* for  and initial loading */}
      </div>
    );
  }

  return (
    <Container>
      <section className="lg:mt-10 mt-3 px-3 sm:px-0">
        <div className="flex justify-between items-center mb-1  ">
          <Title title="Categories" />
          <div className="lg:hidden block text-xs md:text-sm font-light">
            <Link href="/products">
              <button className="  flex items-center space-x-2">
                <span>Shop More</span>
                <span className="">{`>`}</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Desktop View */}
        {/* <div className="hidden md:block">
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1">
            {categoriesData?.data?.map((category: ICategory) => (
              <Link
                key={category.id}
                className="block  rounded-lg border p-3 bg-white border-gray-200 hover:shadow-lg transition-all duration-200 ease-in-out"
                href={`/products?category=${category.id}`}
              >
                <CategoryCard category={category} />
              </Link>
            ))}
          </section>
        </div> */}

        {/* Mobile View */}
        {/* <div className="block md:hidden">
          <section className="grid grid-cols-3 gap-1">
            {categoriesData?.data?.slice(0, 3).map((category: ICategory) => (
              <Link
                key={category.id}
                className=""
                href={`/products?category=${category.id}`}
              >
                <CategoryCard category={category} />
              </Link>
            ))}
          </section>
        </div> */}
        {/* Mobile View with Horizontal Scrolling */}
        <div className="block  bg-white">
          <section className="overflow-x-auto">
            <div className="flex gap-3 w-max">
              {categoriesData?.data?.map((category: ICategory) => (
                <Link
                  key={category.id}
                  className="flex-shrink-0  bg-white p-3 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 ease-in-out"
                  href={`/products?category=${category.id}`}
                >
                  <CategoryCard category={category} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </Container>
  );
};

export default Categories;

"use client";
import React from "react";
import Link from "next/link";

import Title from "../Title";
import Container from "../../sharred/Container";
import CategoriesSkeleton from "../../sharred/CategoriesSkeleon";

import CategoryCard from "./CategoryCard";

import { ICategory } from "@/types";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";

const Categories = () => {
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetAllCategoriesQuery(null);

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
      <section className="lg:mt-10 mt-3">
        <div className="flex justify-between items-center mb-1  ">
          <Title title="Categories" />
        </div>

        {/* Mobile View */}
        {/* <div className="block md:hidden">
          <section className="flex gap-3 overflow-x-auto">
            {categoriesData?.data?.data.map((category: ICategory) => (
              <Link
                key={category.id}
                className="min-w-[200px] flex-shrink-0" // ensures cards don't shrink and allows horizontal scroll
                href={`/products?category=${category.id}`}
              >
                <CategoryCard category={category} />
              </Link>
            ))}
          </section>
        </div> */}
        {/* Mobile View with Horizontal Scrolling */}
        <div className="  bg-white">
          <section className="">
            <div className="lg:grid lg:grid-cols-6 flex overflow-x-auto lg:overflow-x-auto  gap-3 ">
              {categoriesData?.data?.data.map((category: ICategory) => (
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

import React from "react";

import Button from "../../sharred/button";

import CategoryCard from "./CategoryCard";

import { ICategory } from "@/types";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";
import Title from "../Title";
import Link from "next/link";

const Categories = () => {
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetAllCategoriesQuery(null);
  // console.log("category", categoriesData);

  return (
    <div className="w-full md:mt-10 mt-5">
      <div>
        <section className="flex justify-between">
          <Title title="Categories" />
          <div className="md:hidden block">
            {/* <Button /> */}
            <Link href="products" className="block md:hidden">
              <button className="font-medium  ">
                <span> Shop More </span>
                <span>{`>`}</span>
              </button>
            </Link>
          </div>
        </section>
        <div className="hidden md:block">
          <section className="grid grid-cols-8 gap-2">
            {categoriesData?.data?.map((category: ICategory) => (
              <Link key={category.id} href="/products">
                <CategoryCard category={category} />
              </Link>
            ))}
          </section>
        </div>
        <div className="block md:hidden">
          <section className="grid grid-cols-2 sm:grid-cols-3  gap-3">
            {categoriesData?.data?.slice(0, 3).map((category: ICategory) => (
              <Link key={category.id} href="/products">
                <CategoryCard category={category} />
              </Link>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Categories;

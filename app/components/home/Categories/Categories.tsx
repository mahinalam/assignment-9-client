import React from "react";

import Button from "../../sharred/button";

import CategoryCard from "./CategoryCard";

import { ICategory } from "@/types";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";

const Categories = () => {
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetAllCategoriesQuery(null);
  // console.log("category", categoriesData);

  return (
    <div className="my-10">
      <div>
        <section className="flex justify-between">
          <p className="md:text-[22px] text-[16px] md:leading-[38px] leading-[30px]">
            Categories
          </p>
          <div className="md:hidden block">
            <Button />
          </div>
        </section>
        <div className="hidden md:block">
          <section className="grid grid-cols-8 gap-2">
            {categoriesData?.data?.map((category: ICategory) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </section>
        </div>
        <div className="block md:hidden">
          <section className="grid grid-cols-3  gap-3">
            {categoriesData?.data
              ?.slice(0, 3)
              .map((category: ICategory) => (
                <CategoryCard key={category.id} category={category} />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Categories;

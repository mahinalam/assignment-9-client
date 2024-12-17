import React from "react";

import ProductCart from "../../sharred/ProductCard";

import { IProduct } from "@/types";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";

const JustForYou = () => {
  const { data: productsData } = useGetAllProductsQuery(null);
  // console.log(productsData);

  return (
    <div className="w-full">
      <div>
        <section className="flex justify-between">
          <h1 className="md:text-[22px] text-[16px] md:leading-[38px] leading-[30px]">
            Just For You
          </h1>
          <button className="font-medium block md:hidden ">
            <span> See More </span>
          </button>
        </section>
        <div>
          <section className="hidden md:block">
            <div className="grid md:grid-cols-6 gap-4 mt-2">
              {productsData?.data?.map((product: IProduct) => (
                <ProductCart key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
        <div>
          <section className="md:hidden block">
            <div className="grid  grid-cols-3 gap-4 mt-2 ">
              {productsData?.data
                ?.slice(0, 3)
                .map((product: IProduct) => (
                  <ProductCart key={product.id} product={product} />
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JustForYou;

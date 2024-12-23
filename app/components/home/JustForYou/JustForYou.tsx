import React from "react";

import ProductCart from "../../sharred/ProductCard";

import { IProduct } from "@/types";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import Title from "../Title";
import Link from "next/link";

const JustForYou = () => {
  const { data: productsData } = useGetAllProductsQuery(null);
  // console.log(productsData);

  return (
    <div className="w-full md:mt-10 mt-5">
      <div>
        <section className="flex justify-between">
          <Title title="Just For You" />
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
        <div>
          <section className="hidden md:block">
            <div className="grid md:grid-cols-6 gap-4 mt-2">
              {productsData?.data?.map((product: IProduct) => (
                <Link href={`/products/${product.id}`} key={product.id}>
                  <ProductCart product={product} />
                </Link>
              ))}
            </div>
          </section>
        </div>
        <div>
          <section className="md:hidden block">
            <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4 mt-2 ">
              {productsData?.data?.slice(0, 3).map((product: IProduct) => (
                <Link href={`/products/${product.id}`} key={product.id}>
                  <ProductCart product={product} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JustForYou;

import React from "react";
import Link from "next/link";

import ProductCart from "../../sharred/ProductCard";
import Title from "../Title";
import Loader from "../../sharred/Loader";

import { IProduct } from "@/types";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import Container from "../../sharred/Container";

const JustForYou = () => {
  const { data: productsData, isLoading: productDataLoading } =
    useGetAllProductsQuery(null);

  // console.log(productsData);
  if (productDataLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="w-full md:mt-10 mt-3">
        <div>
          <section className="flex justify-between">
            <Title title="Just For You" />
            <div className="md:hidden block">
              {/* <Button /> */}
              <Link className="md:text-sm text-xs font-light" href="/products">
                <button className="  ">
                  <span> Shop More </span>
                  <span>{`>`}</span>
                </button>
              </Link>
            </div>
          </section>
          <div>
            <section className="hidden md:block">
              <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-2 bg-white">
                {productsData?.data?.data?.map((product: IProduct) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <ProductCart product={product} />
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <div>
            <section className="md:hidden block">
              <div className="grid  grid-cols-2 sm:grid-cols-3  gap-4 mt-2 bg-white">
                {productsData?.data?.data
                  ?.slice(0, 6)
                  .map((product: IProduct) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <ProductCart product={product} />
                    </Link>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default JustForYou;

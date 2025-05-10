import React from "react";
import Link from "next/link";

import ProductCart from "../../sharred/ProductCard";
import Title from "../Title";
import Loader from "../../sharred/Loader";

import { IProduct } from "@/types";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import Container from "../../sharred/Container";
import SkeletonComponent from "../../sharred/Skeleton";

const JustForYou = () => {
  const { data: productsData, isLoading: productDataLoading } =
    useGetAllProductsQuery(null);

  // console.log(productsData);
  // if (productDataLoading) {
  //   return <Loader />;
  // }

  if (productDataLoading) {
    // return <Loader />;
    return (
      // loading for desktop
      <>
        <Container>
          <div className="block sm:hidden">
            <Title title="Just For You" />
            <div className="grid grid-cols-2 gap-4 ">
              <SkeletonComponent />
              <SkeletonComponent />
              {/* <SkeletonComponent /> */}
            </div>
          </div>
        </Container>

        {/* for small and lg loading */}
        <Container>
          <div className="hidden sm:block  xl:hidden ">
            <Title title="Just For You" />
            <div className="grid   grid-cols-3 gap-2 ">
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              {/* <SkeletonComponent /> */}
              {/* <SkeletonComponent /> */}
            </div>
          </div>
        </Container>
        {/* for xl and lg loading */}
        <Container>
          <div className="hidden   xl:block ">
            <Title title="Just For You" />
            <div className="grid   grid-cols-6 gap-4 ">
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              {/* <SkeletonComponent /> */}
            </div>
          </div>
        </Container>
        {/* for  and initial loading */}
        <Container>
          <div className="md:block sm:hidden hidden lg:hidden xl:hidden ">
            <Title title="Just For You" />
            <div className="grid   grid-cols-4 gap-4 ">
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              {/* <SkeletonComponent /> */}
              {/* <SkeletonComponent /> */}
              {/* <SkeletonComponent /> */}
            </div>
          </div>
        </Container>
      </>
    );
  }

  return (
    <Container>
      <div className="w-full md:mt-10 mt-3 sm:px-0 px-3">
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
            {/* large screen */}
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
            {/* small screen */}
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

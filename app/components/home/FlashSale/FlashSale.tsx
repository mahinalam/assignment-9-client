import React from "react";
import Link from "next/link";

import FlashSaleCard from "../../sharred/FlashSaleCard";
import Title from "../Title";
import Loader from "../../sharred/Loader";

import { IProduct } from "@/types";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import Container from "../../sharred/Container";
import { Card, Skeleton } from "@nextui-org/react";
import SkeletonComponent from "../../sharred/Skeleton";

const FlashSale = () => {
  const { data: flashProductsData, isLoading: flashProductsLoading } =
    useGetAllProductsQuery(null);

  if (flashProductsLoading) {
    // return <Loader />;
    return (
      // loading for desktop
      <>
        <Container>
          <div className="block sm:hidden">
            <Title title="Flash Sale" />
            <div className="grid grid-cols-3 gap-4 ">
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
            </div>
          </div>
        </Container>

        {/* for small and lg loading */}
        <Container>
          <div className="hidden sm:block  xl:hidden ">
            <Title title="Flash Sale" />
            <div className="grid   grid-cols-4 gap-2 ">
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
              {/* <SkeletonComponent /> */}
            </div>
          </div>
        </Container>
        {/* for xl and lg loading */}
        <Container>
          <div className="hidden   xl:block ">
            <Title title="Flash Sale" />
            <div className="grid   grid-cols-5 gap-4 ">
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
      </>
    );
  }

  console.log("flash sale proudcts", flashProductsData);
  return (
    <Container>
      <div className="w-full  border-1">
        <div>
          <div className="lg:block hidden">
            <Title title="Flash Sale" />
          </div>
          <section className="bg-white">
            <div className="lg:block hidden">
              <div className="flex justify-between items-center py-2 md:text-sm text-xs border-b-1">
                <p className="ml-4 text-primary font-medium">On Sale Now</p>
                <Link href="/products">
                  <button className="uppercase p-2 border-1 border-primary text-primary font-medium md:block hidden">
                    Shop All Products
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:hidden block ">
              <div className="flex justify-between items-center py-2  border-b-1 ">
                <p className=" font-bold items-center">
                  <div className="flex items-center gap-1 mt-3">
                    <div className="flex items-center text-xl">
                      <span>Fla</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-3 text-primary fill-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                          />
                        </svg>
                      </span>
                      <span>h</span>
                    </div>
                    <div>
                      <span className="text-xl">Sale</span>
                    </div>
                  </div>
                </p>
                <Link className="block lg:hidden" href="products">
                  <button className="text-xs font-light">
                    <span>SHOP MORE </span>
                    <span>{`>`}</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden block ">
              <div className="grid grid-cols-3 mt-2 gap-1">
                {flashProductsData?.data?.data
                  ?.slice(0, 3)
                  .map((flashSaleProduct: any) => (
                    <Link
                      href={`/products/${flashSaleProduct.id}`}
                      key={flashSaleProduct.id}
                    >
                      <FlashSaleCard product={flashSaleProduct} />
                    </Link>
                  ))}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block bg-white">
              <div className="grid  sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 mt-2 gap-4">
                {/* <div className="grid  grid-cols-2"> */}
                {flashProductsData?.data?.data?.map(
                  (flashSaleProduct: IProduct) => (
                    <Link
                      key={flashSaleProduct.id}
                      href={`/products/${flashSaleProduct.id}`}
                    >
                      <FlashSaleCard product={flashSaleProduct} />
                    </Link>
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default FlashSale;

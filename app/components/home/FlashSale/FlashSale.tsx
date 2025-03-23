import React from "react";
import Link from "next/link";

import FlashSaleCard from "../../sharred/FlashSaleCard";
import Title from "../Title";
import Loader from "../../sharred/Loader";

import { IProduct } from "@/types";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import Container from "../../sharred/Container";

const FlashSale = () => {
  const { data: flashProductsData, isLoading: flashProductsLoading } =
    useGetAllProductsQuery(null);

  if (flashProductsLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="w-full md:mt-10 mt-3">
        <div>
          <div className="md:block hidden">
            <Title title="Flash Sale" />
          </div>
          <section className="bg-white">
            <div className="md:block hidden">
              <div className="flex justify-between items-center py-2 md:text-sm text-xs border-b-1">
                <p className="ml-4 text-primary font-medium">On Sale Now</p>
                <Link href="/products">
                  <button className="uppercase p-2 border-1 border-primary text-primary font-medium md:block hidden">
                    Shop All Products
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:hidden block">
              <div className="flex justify-between items-center py-2  border-b-1 ">
                {/* <p className="ml-4 text-primary font-medium">On Sale Now</p> */}
                {/* <Button size="sm">Shop All Products</Button> */}
                {/* <Link href="/products">
                  <button className="uppercase p-2 border-1 border-primary text-primary font-medium md:block hidden">
                    Shop All Products
                  </button>
                </Link> */}
                <p className=" font-bold items-center">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
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
                      <span>Sale</span>
                    </div>
                  </div>
                </p>
                <Link className="block md:hidden" href="products">
                  <button className="text-xs font-light">
                    <span>SHOP MORE </span>
                    <span>{`>`}</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden block">
              <div className="grid grid-cols-3 mt-2 gap-1">
                {flashProductsData?.data?.data
                  ?.slice(0, 3)
                  .map((flashSaleProduct: any) => (
                    <FlashSaleCard
                      key={flashSaleProduct.id}
                      product={flashSaleProduct}
                    />
                  ))}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block bg-white">
              <div className="grid  sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-2 gap-4">
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

import React from "react";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

import FlashSaleCard from "../../sharred/FlashSaleCard";
import Title from "../Title";
import Container from "../../sharred/Container";
import SkeletonComponent from "../../sharred/Skeleton";

import { IProduct } from "@/types";
import { useGetAllFlashProductsQuery } from "@/app/redux/features/product/productApi";
import { useGetUsersCompareProductsQuery } from "@/app/redux/features/compare/compareApi";
import { useGetUsersWishlistQuery } from "@/app/redux/features/wishlist/wishlistApi";

const FlashSale = () => {
  const { data: flashProductsData, isLoading: flashProductsLoading } =
    useGetAllFlashProductsQuery(null);

  const { data: compareProducts, isLoading: compareLoading } =
    useGetUsersCompareProductsQuery(undefined);

  const { data: wishlistProducts, isLoading: wishlistProductLoading } =
    useGetUsersWishlistQuery(undefined);

  if (flashProductsLoading || compareLoading || wishlistProductLoading) {
    // return <Loader />;
    return (
      // loading for desktop
      <>
        <Container>
          <div className="block sm:hidden">
            <Title title="Flash Sale" />
            <div className="grid grid-cols-1 gap-4 ">
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
            </div>
          </div>
        </Container>

        {/* for small and lg loading */}
        <Container>
          <div className="hidden sm:block md:hidden  xl:hidden ">
            <Title title="Flash Sale" />
            <div className="grid   grid-cols-3 gap-2 ">
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

  const compareProductIds = compareProducts?.data?.map(
    (item: any) => item.product.id,
  );

  const wishlistProductsIds = wishlistProducts?.data?.data?.map(
    (wishlist: any) => wishlist?.product.id,
  );

  return (
    <Container>
      <div className="w-full ">
        <div>
          <div className="lg:block hidden lg:mt-6 mt-4">
            <div className="flex items-center justify-between">
              <Title title="Flash Products" />
              <Link
                className="flex  items-center gap-2  text-[#737682]"
                href="/flash"
              >
                <span> See All</span>{" "}
                <span>
                  <GoArrowRight size={20} />
                </span>
              </Link>
            </div>
          </div>
          <section className="bg-white">
            <div className="lg:hidden block ">
              <div className="flex justify-between items-center py-2  ">
                <p className=" font-bold items-center">
                  <div className="flex items-center gap-1 mt-3">
                    <div className="flex items-center text-xl">
                      <span>Fla</span>
                      <span>
                        <svg
                          className="size-3 text-primary fill-current"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
              </div>
            </div>

            {/* Desktop View */}
            <div className=" bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 mt-2 gap-4">
                {flashProductsData?.data?.data?.length > 0 &&
                  flashProductsData?.data?.data?.map(
                    (flashSaleProduct: IProduct) => {
                      const isInCompare = compareProductIds?.includes(
                        flashSaleProduct.id,
                      );
                      const isInWishlist = wishlistProductsIds?.includes(
                        flashSaleProduct.id,
                      );

                      return (
                        <FlashSaleCard
                          key={flashSaleProduct.id}
                          isInCompare={isInCompare}
                          isInWishlist={isInWishlist}
                          product={flashSaleProduct}
                        />
                      );
                    },
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

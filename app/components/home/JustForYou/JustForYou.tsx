import React from "react";

import Title from "../Title";
import Container from "../../sharred/Container";
import SkeletonComponent from "../../sharred/Skeleton";
import FlashSaleCard from "../../sharred/FlashSaleCard";

import { IProduct } from "@/types";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import { useGetUsersCompareProductsQuery } from "@/app/redux/features/compare/compareApi";
import { useGetUsersWishlistQuery } from "@/app/redux/features/wishlist/wishlistApi";

const JustForYou = () => {
  const { data: productsData, isLoading: productDataLoading } =
    useGetAllProductsQuery([
      { name: "page", value: 1 },
      { name: "limit", value: 12 },
    ]);

  const { data: compareProducts, isLoading: compareLoading } =
    useGetUsersCompareProductsQuery(undefined);

  const { data: wishlistProducts, isLoading: wishlistProductLoading } =
    useGetUsersWishlistQuery(undefined);
  // if (productDataLoading) {
  //   return <Loader />;
  // }

  if (productDataLoading || compareLoading || wishlistProductLoading) {
    // return <Loader />;
    return (
      // loading for desktop
      <>
        <Container>
          <div className="block sm:hidden">
            <Title title="Today's For You" />
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
            <Title title="Today's For You" />
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
  const compareProductIds = compareProducts?.data?.map(
    (item: any) => item.product.id,
  );

  const wishlistProductsIds = wishlistProducts?.data?.data?.map(
    (wishlist: any) => wishlist?.product.id,
  );

  return (
    <Container>
      <div className="w-full md:mt-10 mt-3 ">
        <div>
          <section className="flex justify-between">
            <Title title="Today's For You" />
            <div className="md:hidden block" />
          </section>
          <div>
            <section className="">
              <div className="grid grid-cols-1 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 mt-2 gap-4 bg-white">
                {productsData?.data?.data
                  ?.slice(0, 10)
                  .map((flashSaleProduct: IProduct) => {
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
                  })}
              </div>
            </section>
          </div>
          <div />
        </div>
      </div>
    </Container>
  );
};

export default JustForYou;

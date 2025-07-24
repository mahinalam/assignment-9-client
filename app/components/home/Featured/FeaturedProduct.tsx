import React from "react";

import FlashSaleCard from "../../sharred/FlashSaleCard";
import Title from "../Title";
import Container from "../../sharred/Container";
import SkeletonComponent from "../../sharred/Skeleton";

import { IProduct } from "@/types";
import { useGetAllFeaturedProductsQuery } from "@/app/redux/features/product/productApi";

const FeaturedProducts = () => {
  const { data: featuredProducts, isLoading: flashProductsLoading } =
    useGetAllFeaturedProductsQuery(null);

  if (flashProductsLoading) {
    // return <Loader />;
    return (
      // loading for desktop
      <>
        <Container>
          <div className="block sm:hidden">
            <Title title="Featured Products" />
            <div className="grid grid-cols-1 gap-4 ">
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
            </div>
          </div>
        </Container>

        {/* for small and lg loading */}
        <Container>
          <div className="hidden sm:block  xl:hidden ">
            <Title title="Featured Products" />
            <div className="grid   grid-cols-3 gap-2 ">
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
              <SkeletonComponent isFlash={false} />
            </div>
          </div>
        </Container>
        {/* for xl and lg loading */}
        <Container>
          <div className="hidden   xl:block ">
            <Title title="Featured Products" />
            <div className="grid   grid-cols-5 gap-4 ">
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
            </div>
          </div>
        </Container>
        {/* for  and initial loading */}
      </>
    );
  }

  return (
    <Container>
      <div className="w-full  border-1">
        <div>
          <div className=" lg:mt-6 mt-4">
            <Title title="Featured Products" />
          </div>
          <section className="bg-white">
            <div className=" bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 mt-2 gap-4">
                {/* <div className="grid  grid-cols-2"> */}
                {featuredProducts?.data?.data?.map(
                  (flashSaleProduct: IProduct) => (
                    <FlashSaleCard
                      key={flashSaleProduct.id}
                      product={flashSaleProduct}
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedProducts;

"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Description from "./Description";
import Reviews from "./Reviews";
import ProductDetailsLoading from "./Loading";

import ProductDetailsCard from "@/app/components/ProductDetails/ProductDetailsCard";
import Container from "@/app/components/sharred/Container";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/app/redux/features/product/productApi";
import FlashSaleCard from "@/app/components/sharred/FlashSaleCard";
import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
import { TQueryParam } from "@/types";
import { RootState } from "@/app/redux/store";
import { useCreateCartMutation } from "@/app/redux/features/cart/cartApi";
import { useGetUsersCompareProductsQuery } from "@/app/redux/features/compare/compareApi";
import { useGetUsersWishlistQuery } from "@/app/redux/features/wishlist/wishlistApi";

const Page = ({ params }: { params: { productId: string } }) => {
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const router = useRouter();

  const { data: productData, isLoading: productLoading } =
    useGetSingleProductQuery(params?.productId);

  const { data: productsData } = useGetAllProductsQuery(
    [{ name: "categoryId", value: productData?.data?.categoryId }],
    { skip: !productData?.data?.categoryId },
  );

  const [activeTab, setActiveTan] = useState("description");

  const [reviewParams, setReviewParams] = useState<TQueryParam[]>([
    { name: "productId", value: params.productId },
  ]);

  const { data: reviewsData, isLoading: reviewDataLoading } =
    useGetProductReviewsQuery(reviewParams);

  const [quantity, setQuantity] = useState<number>(1);
  const [createCart] = useCreateCartMutation();

  const { data: compareProducts, isLoading: compareLoading } =
    useGetUsersCompareProductsQuery(undefined);

  const { data: wishlistProducts, isLoading: wishlistProductLoading } =
    useGetUsersWishlistQuery(undefined);

  if (
    productLoading ||
    reviewDataLoading ||
    compareLoading ||
    wishlistProductLoading
  ) {
    return <ProductDetailsLoading />;
  }

  const relatedProducts = productsData?.data?.data?.filter(
    (item: any) => item.id !== productData?.data?.id,
  );

  const compareProductIds = compareProducts?.data?.map(
    (item: any) => item.product.id,
  );

  const wishlistProductsIds = wishlistProducts?.data?.data?.map(
    (wishlist: any) => wishlist?.product.id,
  );

  const isInCompare = compareProductIds?.includes(params.productId);
  const isInWishlist = wishlistProductsIds?.includes(params.productId);

  const handleAddToCart = async () => {
    if (!userId) {
      return router.push("/login");
    }

    let cartInfo = {
      productId: productData?.data?.id,
      shopId: productData?.data?.shopId,
      quantity,
      price: productData?.data?.price,
    };

    try {
      const res = await createCart(cartInfo).unwrap();

      if (res?.success) {
        toast.success("Product added to cart.");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Container>
      <div className="bg-white lg:p-8">
        <div className="lg:mt-[170px]  mt-10 md:p-5  md:pl-3">
          <ProductDetailsCard
            handleAddToCart={handleAddToCart}
            isInCompare={isInCompare}
            isInWishlist={isInWishlist}
            product={productData?.data}
            quantity={quantity}
            reviews={reviewsData?.data?.data}
            setQuantity={setQuantity}
          />
        </div>

        {/* descripotion */}
        <div className="flex gap-4">
          <div
            className={`${
              activeTab === "description"
                ? "font-bold   border-b-black   border-b-2"
                : "text-[#94A3B8] font-medium"
            } text-[18px] cursor-pointer pb-3`}
            onClick={() => setActiveTan("description")}
          >
            Description
          </div>
          <div
            className={`${
              activeTab === "reviews"
                ? "font-bold border-b-2 border-b-black "
                : "text-[#94A3B8] font-medium"
            } text-[18px] cursor-pointer flex items-center pb-3 gap-1`}
            onClick={() => setActiveTan("reviews")}
          >
            Reviews
            <p className="mb-0">{`(${reviewsData?.data?.data?.result?.length || 0})`}</p>
          </div>
        </div>
        {activeTab === "description" && (
          <Description productData={productData} />
        )}
        {activeTab === "reviews" && (
          <Reviews
            productId={productData?.data?.id}
            productName={productData?.data?.name}
            reviewsData={reviewsData?.data?.data}
            shopId={productData?.data?.shopId}
          />
        )}

        {/* related products */}
        <div className="lg:pt-10 pt-8">
          <p className="font-bold">Related Products</p>
          <div className="grid  sm:grid-cols-4 lg:grid-cols-4 grid-cols-2 xl:grid-cols-5 mt-2 gap-4">
            {relatedProducts
              ?.slice(0, 5)
              .map((flashSaleProduct: any) => (
                <FlashSaleCard
                  key={flashSaleProduct.id}
                  product={flashSaleProduct}
                />
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;

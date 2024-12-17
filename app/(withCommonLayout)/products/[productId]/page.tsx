"use client";

import ProductDetailsCard from "@/app/components/ProductDetails/ProductDetailsCard";
import React, { useState } from "react";
import ReviewCart from "@/app/components/ProductDetails/ReviewCart";
import { IProduct, IReview } from "@/types";
import ProductCart from "@/app/components/sharred/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cancelAddition,
  replaceCart,
} from "@/app/redux/features/cart/cartSlice";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/app/redux/features/product/productApi";
import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
import ReplaceCartModal from "@/app/components/modal/ReplaceCartModal";
import { RootState } from "@/app/redux/store";

const ProductIdPage = ({ params }: { params: { productId: string } }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();

  const { data: productData, isLoading: productLoading } =
    useGetSingleProductQuery(params?.productId);

  const { data: productsData, isLoading } = useGetAllProductsQuery(null);

  const { data: productReviews, isLoading: productReviewsLoading } =
    useGetProductReviewsQuery(params.productId);

  const [isOpen, setIsOpen] = useState(false);

  const hasVendorConflict = useSelector(
    (state: RootState) => state.cart.vendorConflict
  );
  console.log("hasVendorConflict", hasVendorConflict);
  if (productLoading) {
    return <p>Loaidnfg ...</p>;
  }
  console.log("productData", productData);
  const handleAddToCart = () => {
    try {
      dispatch(
        addToCart({
          productId: productData?.data?.id,
          productName: productData?.data?.name,
          quantity,
          newPrice: productData?.data?.newPrice,
          oldPrice: productData?.data?.oldPrice,
          image: productData?.data?.images[0],
          description: productData?.data?.description,
          shopId: productData?.data?.shop?.id,
        })
      );
    } catch (error: any) {
      if (error.message.includes("different shops")) {
        // Optionally handle errors in a UI-friendly way
        console.error("Vendor conflict detected.");
      }
    }
  };

  // Handle replace cart action
  const handleReplaceCart = () => {
    dispatch(replaceCart());
  };

  // Handle cancel addition action
  const handleCancelAddition = () => {
    dispatch(cancelAddition());
  };

  return (
    <div>
      {/* <ReplaceCartModal /> */}
      <ProductDetailsCard
        product={productData?.data}
        handleAddToCart={handleAddToCart}
      />
      <div className="md:block hidden">
        <div className="space-y-4">
          <section>
            <p className="font-semibold md:text-xl text-lg">
              {productData?.data?.name}
            </p>
          </section>
          <section>
            <p>{productData?.data?.description}</p>
            <div className="max-h-[600px] w-full flex justify-center items-center overflow-hidden">
              <img
                src={productData?.data?.images[0]}
                alt=""
                className="h-[600px] w-auto object-cover"
              />
            </div>
          </section>
          <section></section>
        </div>
      </div>
      <div>
        <div>
          <p className="py-2 md:border-y-1 md:text-base text-[12px] text-[#757575] md:text-black">
            Product Reviews
          </p>
          {productData?.data?.review?.map((review: IReview) => (
            <ReviewCart key={review.id} item={review} />
          ))}
        </div>
        <div>
          <div className="md:my-10 my-5">
            <p className="md:text-left text-center mb-4 md:font-bold font-normal">
              You may also like
            </p>
            <div className="grid md:grid-cols-4 grid-cols-3 gap-4">
              {productsData?.data?.map((product: IProduct) => (
                <ProductCart key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* {isOpen && <ReplaceCartModal />} */}
    </div>
  );
};

export default ProductIdPage;

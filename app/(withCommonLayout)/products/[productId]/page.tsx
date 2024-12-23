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
import Loader from "@/app/components/sharred/Loader";
import Rate from "rc-rate";
import Link from "next/link";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { useCreateOrderMutation } from "@/app/redux/features/order/orderApi";
import { useFollowShopMutation } from "@/app/redux/features/shop/shopApi";
import { toast } from "sonner";

const ProductIdPage = ({ params }: { params: { productId: string } }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();

  const { data: productData, isLoading: productLoading } =
    useGetSingleProductQuery(params?.productId);

  const { data: productsData, isLoading } = useGetAllProductsQuery(null);

  const [followShop] = useFollowShopMutation();

  const hasVendorConflict = useSelector(
    (state: RootState) => state.cart.vendorConflict
  );

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo, isLoading: currentUserInfoLoading } =
    useGetSingleUserQuery(userId);
  console.log("currentUserInfo", currentUserInfo);

  const [createOrder] = useCreateOrderMutation();

  // console.log("hasVendorConflict", hasVendorConflict);
  if (productLoading) {
    return <Loader />;
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

  // // Handle replace cart action
  // const handleReplaceCart = () => {
  //   dispatch(replaceCart());
  // };

  // // Handle cancel addition action
  // const handleCancelAddition = () => {
  //   dispatch(cancelAddition());
  // };

  const handleCreateOrder = async () => {
    // if (cart.items.length === 0) {
    //   alert("Please select at least one item to place an order.");
    //   return;
    // }

    const orderPayload = {
      userId: currentUserInfo?.data?.id,
      shippingAddress: currentUserInfo?.data?.address,
      orderItems: [
        {
          productId: productData?.data?.id,
          quantity: 1,
          price: productData?.data?.newPrice,
        },
      ],
    };
    console.log("orderPayload", orderPayload);
    try {
      const orderResponse: any = await createOrder(orderPayload).unwrap();
      console.log({ orderResponse });
      if (orderResponse.success) {
        window.location.href = orderResponse?.data?.payment_url;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const handleFollowShop = async () => {
    const followShopData = {
      shopId: productData?.data?.shop?.id,
      followerId: userId!,
    };
    console.log("followShopData", followShopData);
    // follow shop
    try {
      const res = await followShop(followShopData);
      if (res?.data?.success) {
        // setIsFollower(true);
        toast.success(res?.data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="md:mt-10 mt-5">
        <ProductDetailsCard
          product={productData?.data}
          handleAddToCart={handleAddToCart}
          handleCreateOrder={handleCreateOrder}
          handleFollowShop={handleFollowShop}
        />
      </div>
      <div className="md:block hidden md:mt-10 mt-5">
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
      <div className="md:mt-10 mt-5">
        <div>
          <p className="py-2 md:border-y-1 md:text-base text-[14px] text-[#757575] md:text-black">
            Product Reviews
          </p>
          {productData?.data?.review?.length === 0 && (
            <div className="md:block hidden ">
              <div className="flex items-center gap-2">
                <div>
                  <Rate
                    allowHalf={false}
                    className="text-[#FACA51] text-xl "
                    count={5}
                    value={5}
                  />
                </div>
                <div className="text-gray-500 ">
                  ({productData?.data?.review.length})
                </div>
              </div>
            </div>
          )}
          {productData?.data?.review?.length > 0 &&
            productData?.data?.review?.map((review: IReview) => (
              <ReviewCart key={review.id} item={review} />
            ))}
        </div>
        <div>
          <div className="md:my-10 my-5">
            <p className="md:text-left text-center mb-4 md:font-bold font-normal">
              You may also like
            </p>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
              {productsData?.data?.map((product: IProduct) => (
                <Link href={`/products/${productData?.data?.id}`}>
                  {" "}
                  <ProductCart key={product.id} product={product} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductIdPage;

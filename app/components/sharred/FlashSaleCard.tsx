"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { IoMdHeartEmpty, IoMdCheckmark } from "react-icons/io";
import { LuGitCompare } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useDisclosure } from "@nextui-org/react";

import CartRemoveWarningModal from "../modal/CartRemoveWarningModal";

import { calculateDiscountPercentage } from ".";

import { useCreateCompareProductMutation } from "@/app/redux/features/compare/compareApi";
import { useCreateCartMutation } from "@/app/redux/features/cart/cartApi";
import { RootState } from "@/app/redux/store";
import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
import { useCreateWishlistMutation } from "@/app/redux/features/wishlist/wishlistApi";

const FlashSaleCard = ({ product, isInCompare, isInWishlist = false }: any) => {
  const { id, images, name, discount, price, shopId } = product;

  const { data: reviewData } = useGetProductReviewsQuery(id);
  const [isHovered, setIsHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const { discountPercentage, discountPrice } = calculateDiscountPercentage(
    Number(price),
    Number(discount)
  );

  const userId = useSelector((state: RootState) => state.auth?.user?.userId);
  const router = useRouter();

  const [createCart] = useCreateCartMutation();
  const [addCompareProduct] = useCreateCompareProductMutation();
  const [addToWishlist] = useCreateWishlistMutation();

  const {
    isOpen: isCompareModalOpen,
    onOpen: onCompareModalOpen,
    onOpenChange: onCompareModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isWishlistModalOpen,
    onOpen: onWishlistModalOpen,
    onOpenChange: onWishlistModalOpenChange,
  } = useDisclosure();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddToCart = async () => {
    if (!userId) {
      return router.push("/login");
    }

    let cartInfo = {
      productId: id,
      shopId,
      quantity: 1,
      price: discountPrice,
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

  const handleAddToWishlist = async () => {
    try {
      const res = await addToWishlist({ productId: id }).unwrap();
      if (res?.success) onWishlistModalOpen();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleCreateCompareProduct = async () => {
    try {
      const res = await addCompareProduct({ productId: id }).unwrap();
      if (res?.success) onCompareModalOpen();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleGotoComparePage = () => router.push("/compare");
  const handleGoToWishlistPage = () => router.push("/wishlist");

  return (
    <div
      className="relative p-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
      onMouseEnter={() => {
        if (isLargeScreen) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (isLargeScreen) setIsHovered(false);
      }}
    >
      {/* Floating Buttons */}
      <div
        className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-5 pointer-events-none"
        }`}
      >
        <div className="relative group" onClick={handleAddToWishlist}>
          <button
            className={`p-2 shadow rounded-full transition ${
              isInWishlist
                ? "bg-primary text-white"
                : "bg-white hover:bg-primary hover:text-white"
            }`}
          >
            <IoMdHeartEmpty size={20} />
          </button>
          {!isInWishlist && (
            <span className="absolute top-1/2 right-full mr-2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-500 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
              Add to Wishlist
            </span>
          )}
        </div>

        <div className="relative group" onClick={handleCreateCompareProduct}>
          <button className="p-2 bg-white shadow rounded-full hover:bg-primary hover:text-white transition">
            {isInCompare ? (
              <IoMdCheckmark size={20} />
            ) : (
              <LuGitCompare size={20} />
            )}
          </button>
          {!isInCompare && (
            <span className="absolute top-1/2 right-full mr-2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-500 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
              Add to Compare
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <div className="w-full">
          <Image
            alt={name}
            className="w-full rounded"
            height={300}
            src={images[0]}
            width={300}
          />
        </div>

        <div className="mx-2 mt-1 flex-grow">
          <div className="mb-1">
            <Rating
              allowFraction
              readonly
              SVGstyle={{ display: "inline" }}
              emptyColor="#E5E7EB"
              fillColor="#FACA51"
              initialValue={reviewData?.data?.averageRating || 0}
              size={15}
            />
          </div>

          <Link
            className="font-semibold text-sm lg:text-base font-sans mb-1 block"
            href={`/products/${id}`}
          >
            {name}
          </Link>

          <div className="flex gap-2 mt-3">
            <p className="text-primary font-bold">৳{discountPrice}</p>
            <p className="line-through text-gray-400">৳{price}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto px-2">
        <button
          className="w-full bg-primary hover:bg-[#ca1d68] lg:py-2 py-1 rounded-lg text-sm font-semibold mt-3 mb-2 text-white"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>

      <CartRemoveWarningModal
        btn1="COMPARE"
        btn2="CLOSE"
        handleRemoveCart={handleGotoComparePage}
        isOpen={isCompareModalOpen}
        subTitle={`${name} has been added to compare.`}
        onOpenChange={onCompareModalOpenChange}
      />
      <CartRemoveWarningModal
        btn1="VIEW"
        btn2="CLOSE"
        handleRemoveCart={handleGoToWishlistPage}
        isOpen={isWishlistModalOpen}
        subTitle={`${name} has been added to wishlist.`}
        onOpenChange={onWishlistModalOpenChange}
      />
    </div>
  );
};

export default FlashSaleCard;

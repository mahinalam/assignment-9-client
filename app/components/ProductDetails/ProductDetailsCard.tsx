"use client";
import React, { useState } from "react";
import Rate from "rc-rate";
import { IoHeartOutline } from "react-icons/io5";
import { LuGitCompareArrows } from "react-icons/lu";
import { HiMiniPlus, HiMiniMinus } from "react-icons/hi2";
import "rc-rate/assets/index.css";
import Link from "next/link";

const ProductDetailsCard = ({
  product,
  quantity,
  setQuantity,
  handleAddToCart,
  isInCompare,
  isInWishlist,
}: any) => {
  const { id, name, images, price, category, shop, shortDescription } = product;

  const [miniImageSrc, setMiniImageSrc] = useState(images[0]);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-4">
      {/*  image section */}
      <div>
        <img alt="" className="h-[500px]" src={miniImageSrc} />
        <div className="flex lg:size-[60px] size-[50px] mt-5 lg:mt-5 gap-4 cursor-pointer transition ease-in-out">
          {images.map((image) => (
            <img src={image} onMouseEnter={() => setMiniImageSrc(image)} />
          ))}
        </div>
      </div>
      {/* text section */}
      <div>
        {/* title and review */}
        <div>
          <p className="font-semibold lg:text-[32px] text-[24px] lg:mb-0">
            {name}
          </p>
          <div className="flex justify-between items-center lg:border-b-1 lg:pb-0 ">
            <div className="flex items-center ">
              <Rate
                allowHalf={false}
                className=""
                count={5}
                style={{ color: "#E21B70" }}
                value={5}
              />
              <p className="lg:ml-1 text-[#475569] lg:text-[13px]">3</p>
            </div>
            <div>
              <button className="lg:font-medium font-semibold  text-[12px] lg:text-sm text-green-600">
                In Stock
              </button>
            </div>
          </div>
        </div>
        {/* price section */}
        <div className="lg:pt-3 lg:pb-1 pt-2 border-b-border border-b">
          <h2 className="text-[24px] font-bold text-primary">৳ {price}</h2>
        </div>
        {/* small description section */}
        <div>
          <p className="text-sm text-[#475569] lg:pt-4 pt-3 pb-4 lg:pb-10">
            {shortDescription}
          </p>
        </div>
        {/* add to cart section */}
        <div className="flex items-center gap-3 lg:gap-2 lg:pt-0 pt-5">
          <div className="border-1 border-black inline-flex rounded-lg  gap-4 lg:px-2 lg:py-2 px-1 py-1">
            <button
              className="text-lg pl-1 flex items-center"
              disabled={quantity === 1}
              onClick={() => setQuantity((quantity: any) => quantity - 1)}
            >
              <HiMiniMinus />
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              className="text-lg flex items-center pr-1"
              disabled={quantity === 10}
              onClick={() => setQuantity((quantity: any) => quantity + 1)}
            >
              <HiMiniPlus />
            </button>
          </div>
          <div className="w-full">
            <button
              className="w-full lg:py-3 py-2 rounded-lg text-sm bg-primary text-white"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>

        {/* category section */}
        <div className="lg:py-5 py-4">
          <p className="font-medium pb-1 lg:text-sm text-[13px] ">Category</p>
          <div className="inline-flex items-center border-1 gap-2 py-2 px-2">
            <button>
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6h.008v.008H6V6Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="lg:font-medium text-[12px] lg:text-[13px] font-semibold">
              {category.name}
            </span>
          </div>
        </div>
        {/* add to wishlist , compare section */}
        <div className="flex items-center gap-4 lg:gap-3">
          {!isInWishlist ? (
            <div className="flex gap-2 items-center">
              {" "}
              <IoHeartOutline />
              <span className="text-sm text-[13px] font-semibold">
                Add to wishlist
              </span>{" "}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              {" "}
              <IoHeartOutline />
              <span className="text-sm text-[13px] font-semibold">
                View wishlist
              </span>{" "}
            </div>
          )}

          <div className="flex gap-2 items-center">
            <LuGitCompareArrows />
            <span className="text-sm font-semibold">Compare</span>
          </div>
        </div>

        {/* store section */}
        <div className="flex items-center lg:mt-6 gap-3 my-5">
          <Link href={`/store/${shop.id}`}>
            <img alt="" className="size-14 rounded-full" src={shop.logo} />
          </Link>
          <div>
            <p className="text-[13px] text-[#64748B]">Store:</p>
            <Link className="font-semibold" href={`/store/${shop.id}`}>
              {shop.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;

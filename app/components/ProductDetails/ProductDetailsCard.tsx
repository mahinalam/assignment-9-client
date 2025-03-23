"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rate from "rc-rate";

import StoreCard from "./StoreCard";

import { IProduct } from "@/types";

import "rc-rate/assets/index.css"; // Ensure you import the styles for rc-rate
import ProductCard from "@/app/(withCommonLayout)/products/[productId]/ProductMiniCard";
import { RootState } from "@/app/redux/store";

import { useRouter } from "next/navigation";

const ProductDetailsCard = ({
  product,
  handleAddToCart,
  handleCreateOrder,
  handleFollowShop,
  quantity,
  setQuantity,
}: {
  product: IProduct;
  handleAddToCart?: any;
  handleCreateOrder?: any;
  handleFollowShop?: any;
  quantity: any;
  setQuantity: any;
}) => {
  const { images, id, name, newPrice, oldPrice, stock, review } = product;
  console.log("images", images);

  const [currentImage, setCurrentImage] = useState(images[0]);

  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const handleCurrentImage = (image: string) => {
    setCurrentImage(image);
  };

  const handleIncrement = () => {
    if (!userId) {
      return router.push("/login");
    }
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col gap-4">
        {/* <section className="col-span-4"> */}
        <div className="md:w-4/12 w-full">
          {/* <div className=""> */}
          {/* <img
            src={images[0]}
            className="w-full h-auto object-cover"
            alt={`Product Image`}
          /> */}
          <img
            alt="productImage"
            className="w-full  h-auto md:max-h-[300px] max-h-[250px] object-cover " // Ensure the image scales well and retains its aspect ratio
            src={currentImage} // Dynamically render the product image
          />
          <div className="md:block hidden">
            <div className="flex items-center  gap-2 mt-2">
              {images?.map((image, index) => (
                <ProductCard
                  key={index}
                  currentImage={currentImage}
                  handleCurrentImage={handleCurrentImage}
                  image={image}
                />
              ))}
            </div>
          </div>
        </div>
        {/* </section> */}
        {/* <section className="col-span-8"> */}
        <div className="md:w-4/12 md:space-y-4 space-y-2 w-full">
          <p className="md:text-2xl text-lg">{name}</p>
          <div className="flex items-center gap-2">
            <div>
              <Rate
                allowHalf={false}
                className="text-[#FACA51] text-xl "
                count={5}
                value={5}
              />
            </div>
            <p className="text-[#136cff] md:block hidden">
              {review.length} Ratings
            </p>
          </div>
          <p className="text-[12px] md:text-[14px] md:block hidden">
            <span className="text-[#9e9e9e] mr-2">Brand:</span>
            <span className="text-[#136cff]">No Brand</span>
          </p>
          {/* <p> */}
          <div className="md:block flex md:gap-0 gap-3 items-center">
            <p className="md:text-3xl text-xl text-primary">
              ৳ <span className="font-bold md:font-normal">{newPrice}</span>
            </p>
            <div className="items-center flex gap-2 ">
              <p className="md:text-[16px] text-[14px] line-through text-secondary">
                ৳ <span>{oldPrice}</span>
              </p>
              <p className="md:text-[16px] text-[14px]">-13%</p>
            </div>
          </div>

          <div className="md:block hidden">
            <div className="flex items-center">
              <span className="md:pr-8 text-[#757575] text-sm">Quantity</span>

              {/* minus button */}
              <button
                onClick={() => setQuantity((quantity: any) => quantity - 1)}
                disabled={quantity === 1}
                className="disabled:cursor-not-allowed cursor-pointer bg-[#EFF0F5] disabled:hover:text-[#9E9E9E] text-[#9E9E9E] disabled:bg-[#FAFAFA] hover:bg-[#DADADA] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7   p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              </button>
              <span className="mx-4">{quantity}</span>

              {/* plus button */}
              <button
                disabled={quantity === 10}
                onClick={() => setQuantity((quantity: any) => quantity + 1)}
                className="disabled:cursor-not-allowed cursor-pointer bg-[#EFF0F5] disabled:hover:text-[#9E9E9E] text-[#9E9E9E] disabled:bg-[#FAFAFA] hover:bg-[#DADADA] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7  p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex  items-center gap-2">
            <span className="md:block hidden w-full">
              <button
                className="md:block  bg-[#2abbe8] py-2 w-full text-white text-center"
                onClick={handleCreateOrder}
              >
                Buy Now
              </button>
            </span>
            <button
              className="cursor-pointer py-2  md:my-0 my-2 w-full  bg-primary text-white text-center"
              onClick={() => handleAddToCart()}
            >
              Add To Cart
            </button>
          </div>

          {/* </div> */}
        </div>
        <div className="md:w-4/12 w-full md:block hidden">
          <StoreCard handleFollowShop={handleFollowShop} product={product} />
        </div>
        {/* </section> */}
      </div>
    </div>
  );
};

export default ProductDetailsCard;

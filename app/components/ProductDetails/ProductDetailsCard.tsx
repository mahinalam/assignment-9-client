"use client";

import React, { useState } from "react";

import StoreCard from "./StoreCard";

import { IProduct } from "@/types";
import { useDispatch } from "react-redux";
import { incrementQuantity } from "@/app/redux/features/cart/cartSlice";
import Rate from "rc-rate";
import "rc-rate/assets/index.css"; // Ensure you import the styles for rc-rate

const ProductDetailsCard = ({
  product,
  handleAddToCart,
  handleCreateOrder,
  handleFollowShop,
}: {
  product: IProduct;
  handleAddToCart?: any;
  handleCreateOrder?: any;
  handleFollowShop?: any;
}) => {
  const { images, id, name, newPrice, oldPrice, stock, review } = product;

  const dispatch = useDispatch();

  // const [quantity, setQuantity] = useState<number>(1);

  // const handleIncrementQuantity = () => {
  //   if (stock > 1) {
  //     setQuantity((quantity) => quantity + 1);
  //     dispatch(incrementQuantity({ id }));
  //   }
  // };

  // const handleDecrementQuantity = () => {
  //   if (stock <= 1) {
  //     setQuantity((quantity) => quantity + 1);
  //     dispatch(incrementQuantity({ id }));
  //   }
  // };

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
            className="w-full h-auto md:max-h-[300px] max-h-[250px] object-contain rounded-lg" // Ensure the image scales well and retains its aspect ratio
            src={images?.[0]} // Dynamically render the product image
          />
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
            <p className="text-[#136cff]">{review.length} Ratings</p>
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
          <div className="flex  items-center gap-2">
            <span className="md:block hidden">
              <button
                onClick={handleCreateOrder}
                className="md:block flex justify-center  items-center h-[44px] md:w-[255px]  bg-[#2abbe8] text-white text-center"
              >
                Buy Now
              </button>
            </span>
            <button
              className="cursor-pointer flex justify-center items-center h-[44px] md:w-[255px] md:my-0 my-2 w-full bg-primary text-white text-center"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
          {/* </div> */}
        </div>
        <div className="md:w-4/12 w-full">
          <StoreCard product={product} handleFollowShop={handleFollowShop} />
        </div>
        {/* </section> */}
      </div>
    </div>
  );
};

export default ProductDetailsCard;

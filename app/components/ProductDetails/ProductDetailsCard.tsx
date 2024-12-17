"use client";

import React, { useState } from "react";

import StoreCard from "./StoreCard";

import { IProduct } from "@/types";
import { useDispatch } from "react-redux";
import { incrementQuantity } from "@/app/redux/features/cart/cartSlice";

const ProductDetailsCard = ({
  product,
  handleAddToCart,
}: {
  product: IProduct;
  handleAddToCart?: any;
}) => {
  console.log("product", product);
  const { images, id, name, newPrice, oldPrice, stock } = product;
  console.log(stock);

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
            className="w-full h-auto md:max-h-[400px] max-h-[250px] object-contain rounded-lg" // Ensure the image scales well and retains its aspect ratio
            src={images[0]} // Dynamically render the product image
          />
        </div>
        {/* </section> */}
        {/* <section className="col-span-8"> */}
        <div className="md:w-4/12 md:space-y-4 space-y-2 w-full">
          <p className="md:text-2xl text-lg">{name}</p>
          {/* <p className="text-[12px] md:text-[14px] text-[#136cff] md:block hidden">
            1589 Ratings892 Answered Questions
          </p> */}
          <p className="text-[12px] md:text-[14px] md:block hidden">
            <span className="text-[#9e9e9e]">Brand:</span>
            <span className="text-[#136cff]">No Brand</span>
          </p>
          {/* <p> */}
          <div className="md:block flex md:gap-0 gap-3 items-center">
            <p className="md:text-3xl text-xl text-[#f57224]">
              ৳ <span className="font-bold md:font-normal">{newPrice}</span>
            </p>
            <div className="items-center flex gap-2 ">
              <p className="md:text-[16px] text-[14px] line-through">
                ৳ <span>{oldPrice}</span>
              </p>
              <p className="md:text-[16px] text-[14px]">-13%</p>
            </div>
          </div>

          {/* <div className="md:block hidden">
            <div className="flex gap-8">
              <div>
                <p className="md:text-[16px] text-[15px]">Quantity</p>
              </div>
              <div className="flex items-center gap-1">
                <button disabled={quantity === 1}>
                  <svg
                    className="size-6 bg-[#eff0f5] text-[#9e9e9e]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12h14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <span className="mx-2 md:text-base">{quantity}</span>
                <button
                  // disabled={quantity <= stock}
                  onClick={handleIncrementQuantity}
                  className=""
                >
                  <svg
                    className="size-6 bg-[#eff0f5] text-[#9e9e9e] "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4.5v15m7.5-7.5h-15"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div> */}
          <div className="flex  items-center gap-2">
            <span className="md:block hidden">
              {" "}
              <button className="md:block flex justify-center  items-center h-[44px] md:w-[255px]  bg-[#2abbe8] text-white text-center">
                Buy Now
              </button>
            </span>
            <button
              className="cursor-pointer flex justify-center items-center h-[44px] md:w-[255px] md:my-0 my-2 w-full bg-[#f57224] text-white text-center"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
          {/* </div> */}
        </div>
        <div className="md:w-4/12 w-full">
          <StoreCard product={product} />
        </div>
        {/* </section> */}
      </div>
    </div>
  );
};

export default ProductDetailsCard;

import React from "react";
import Image from "next/image";
import Rate from "rc-rate";

import "rc-rate/assets/index.css";
import "./ProductCard.css";
import { calculateDiscountPercentage } from ".";

import { IProduct } from "@/types";
import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";

const ProductCart = ({ product }: { product: IProduct }) => {
  const { id, name, images, price, discount } = product;

  const { data: reviewData } = useGetProductReviewsQuery([
    { name: "productId", value: id },
  ]);

  console.log("review data", reviewData);

  const { discountPercentage, discountPrice } = calculateDiscountPercentage(
    Number(price),
    Number(discount),
  );

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-2">
      <div className="">
        <Image alt="" height={200} src={images[0]} width={300} />
      </div>
      {/* </div> */}
      <div className="  mb-0 leading-none">
        <div className="md:text-[14px] text-[12px] mt-1">{name}</div>
        <div className="flex items-center gap-1 mt-2 mb-1">
          <div className="text-primary md:text-[18px] text-[16px] mb-1">
            <span>৳</span>
            <span className="font-semibold">{price}</span>
          </div>
          <div className="md:text-[12px] text-[10px] text-[#9e9e9e] font-semibold">
            <span>
              {/* {calculateDiscountPercentage(Number(price), Number(discount))} */}
            </span>
          </div>
        </div>

        {/* rating for small screen */}
        <div className="md:hidden block">
          <div className="flex items-center ">
            <Rate
              allowHalf={false}
              className="text-[#FACA51] "
              count={1}
              value={1}
            />
            <span className="text-[#111111] text-sm">
              {reviewData?.data?.averageRating}
            </span>
            <span className="text-[#858B9C] text-sm">
              ({reviewData?.data?.data?.length})
            </span>
          </div>
        </div>

        {/* rating for large screen */}
        <div className="hidden md:block">
          <Rate
            allowHalf={false}
            className="text-[#FACA51] "
            count={5}
            value={reviewData?.data?.averageRating}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCart;

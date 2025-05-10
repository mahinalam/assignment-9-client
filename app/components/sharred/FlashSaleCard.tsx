import Image from "next/image";
import React from "react";
import "rc-rate/assets/index.css";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
import { calculateDiscountPercentage } from ".";

const FlashSaleCard = ({ product }: any) => {
  const { id, images, name, discount, price, review } = product;
  const { data: reviewData } = useGetProductReviewsQuery(id);

  const { discountPercentage, discountPrice } = calculateDiscountPercentage(
    Number(price),
    Number(discount)
  );
  console.log({ discountPercentage, discountPrice });
  return (
    <div className="p-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ">
      <div className="">
        <Image alt="" height={200} src={images[0]} width={300} />
      </div>
      <div className="md:hidden block mt-1 ">
        <div className="bg-primary bg-opacity-10 flex items-center justify-between text-xs p-0.5 rounded-lg">
          <p className="text-primary font-bold">৳{discountPrice}</p>
          <p className="bg-primary text-white p-1  rounded-lg">
            {/* discount price */}
            {discountPercentage}%
          </p>
        </div>
      </div>
      <div className="mx-2 mt-1 mb-0 leading-none hidden md:block">
        <div className="font-medium text-sm font-sans mb-1 md:text-base ">
          {name}
        </div>
        <div className="text-primary  md:text-lg text-base mb-1">
          <span>৳</span>
          <span className="font-semibold">{discountPrice}</span>
        </div>
        <div className="flex">
          <div className="text-sm text-secondary flex line-through">
            {/* original price */}
            <span>
              <span>৳</span>
              {price}
            </span>
          </div>
          <div className="md:text-[12px] text-[10px] ml-1 flex items-center">
            <span>-</span>
            <span>
              {/* // percentage */}
              {discountPercentage}%
            </span>
          </div>
        </div>

        {/* rating for small screen */}
        <div>
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

export default FlashSaleCard;

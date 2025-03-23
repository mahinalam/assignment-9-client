import Image from "next/image";
import Rate from "rc-rate";
import React from "react";
import "rc-rate/assets/index.css";

const FlashSaleCard = ({ product }: any) => {
  const { id, images, name, newPrice, oldPrice, review } = product;

  return (
    <div className="p-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ">
      <div className="">
        {/* <div className="md:size-[200px] size-[100px] relative  rounded-t-lg "> */}
        <Image alt="" height={200} src={images[0]} width={300} />
        {/* </div> */}
      </div>
      <div className="md:hidden block mt-1 ">
        <div className="bg-primary bg-opacity-10 flex items-center justify-between text-xs p-0.5 rounded-lg">
          <p className="text-primary font-bold">৳130</p>
          <p className="bg-primary text-white p-1  rounded-lg">78%</p>
        </div>
      </div>
      <div className="mx-2 mt-1 mb-0 leading-none hidden md:block">
        <div className="font-medium text-sm font-sans mb-1 md:text-base ">
          {name}
        </div>
        <div className="text-primary  md:text-lg text-base mb-1">
          <span>৳ </span>
          <span className="font-semibold">{newPrice}</span>
        </div>
        <div className="flex">
          <div className="text-sm text-secondary flex line-through">
            <span>
              <span>৳</span>
              {oldPrice}
            </span>
          </div>
          <div className="md:text-[12px] text-[10px] ml-1 flex items-center">
            <span>-</span>
            <span>27%</span>
          </div>
        </div>
        {/* <div className="flex items-center">
          <Rate
            allowHalf={false}
            className="text-[#FACA51] text-xl gap-0"
            count={5}
            value={5}
          />
          <div>
            <p className="text-sm text-gray-400">({review.length})</p>
          </div>
          
        </div> */}
      </div>
    </div>
  );
};

export default FlashSaleCard;

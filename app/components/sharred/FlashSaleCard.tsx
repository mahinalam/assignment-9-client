import Image from "next/image";
import React from "react";

const FlashSaleCard = ({ product }: any) => {
  const { id, images, name, newPrice, oldPrice } = product;
  return (
    <div className="p-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div>
        <div className="md:h-[200px] h-[100px] w-full relative  rounded-t-lg overflow-hidden">
          <Image alt="" fill src={images[0]} />
        </div>
      </div>
      <div className="mx-2 mt-1 mb-0 leading-none">
        <div className="font-medium text-sm font-sans mb-1 md:text-base ">
          {name}
        </div>
        <div className="text-primary  md:text-lg text-base mb-1">
          <span>৳</span>
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
      </div>
    </div>
  );
};

export default FlashSaleCard;

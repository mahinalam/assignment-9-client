import React from "react";

const FlashSaleCard = ({ product }: any) => {
  const { id, images, name, newPrice, oldPrice } = product;

  return (
    <div className="p-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div>
        <div className="md:h-[200px] h-[80px] w-auto object-cover rounded-t-lg overflow-hidden">
          <img alt="" className="w-full h-full" src={images[0]} />
        </div>
      </div>
      <div className="mx-2 mt-1 mb-0 leading-none">
        <div className="font-medium text-sm font-sans mb-1 md:text-[14px] text-[12px]">
          {name}
        </div>
        <div className="text-[#F57224] md:text-[18px] text-[16px] mb-1">
          <span>৳</span>
          <span className="font-semibold">{newPrice}</span>
        </div>
        <div className="flex">
          <div className="text-[12px] text-[#9e9e9e] flex line-through">
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

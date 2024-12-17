import React from "react";

import { IProduct } from "@/types";

const ProductCart = ({ product }: { product: IProduct }) => {
  const { id, name, images, newPrice, oldPrice } = product;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* <div>
        <img src={images[0]} alt="image" className="w-auto h-[200px]" />
      </div> */}
      <div className="md:h-[200px] h-[100px] md:w-auto w-auto object-cover">
        <img alt="" className="w-full h-full " src={images[0]} />
      </div>
      <div className=" mx-2 mt-1 mb-0 leading-none">
        <div className="md:text-[14px] text-[12px]">{name}</div>
        <div className="flex items-center gap-1 mt-2">
          <div className="text-[rgb(245,114,36)] md:text-[18px] text-[16px] mb-1">
            <span>৳</span>
            <span className="font-semibold">{newPrice}</span>
          </div>
          <div className="md:text-[12px] text-[10px] text-[#9e9e9e] font-semibold">
            <span>-57%</span>
          </div>
        </div>
        <div>{/* <ReactStars count={5} size={24} color2={"#ffd700"} /> */}</div>
      </div>
    </div>
  );
};

export default ProductCart;

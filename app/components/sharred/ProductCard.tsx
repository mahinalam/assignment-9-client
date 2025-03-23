import React from "react";
import Image from "next/image";

import { IProduct } from "@/types";
const ProductCart = ({ product }: { product: IProduct }) => {
  const { id, name, images, newPrice, oldPrice } = product;

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
            <span className="font-semibold">{newPrice}</span>
          </div>
          <div className="md:text-[12px] text-[10px] text-[#9e9e9e] font-semibold">
            <span>-57%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;

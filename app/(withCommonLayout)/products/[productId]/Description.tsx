"use client";

import React, { useState } from "react";

const Description = ({ productData }: { productData: any }) => {
  const [isViewMoreClick, setIsViewMoreClick] = useState(false);

  return (
    <div className=" mt-4  md:p-5 md:pr-0 bg-white">
      <div className="">
        <section />
        <section>
          <p className="mb-4">{productData?.data?.longDescription}</p>
          {!isViewMoreClick && (
            <div className=" w-full flex flex-col justify-center md:py-2 items-center overflow-hidden">
              <img
                alt=""
                className="h-[600px] w-auto object-cover "
                src={productData?.data?.images[1]}
              />
            </div>
          )}
          {isViewMoreClick && (
            <div
              className=" w-full flex flex-col justify-center md:py-2 items-center overflow-hidden"
              id="viewMore"
            >
              {productData?.data?.images
                .slice(1)
                .map((image: any, index: number) => (
                  <img
                    key={index}
                    alt=""
                    className="h-[600px] w-auto object-cover "
                    src={image}
                  />
                ))}
            </div>
          )}

          <div className="text-center">
            {!isViewMoreClick ? (
              <button
                className="py-2 px-6 text-[#136CFF] transition-all duration-300 ease-in-out hover:text-white border-[1px] hover:bg-[#136CFF] border-[#136CFF] hover:border-[#136CFF] text-sm"
                onClick={() => setIsViewMoreClick(true)}
              >
                VIEW MORE
              </button>
            ) : (
              <button
                className="py-2 px-6 text-[#136CFF] transition-all duration-300 ease-in-out hover:text-white border-[1px] hover:bg-[#136CFF] border-[#136CFF] hover:border-[#136CFF] text-sm"
                onClick={() => setIsViewMoreClick(false)}
              >
                VIEW LESS
              </button>
            )}
          </div>
        </section>
        <section />
      </div>
    </div>
  );
};

export default Description;

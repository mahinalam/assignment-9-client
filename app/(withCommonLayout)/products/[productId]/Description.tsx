"use client";

import React, { useState } from "react";

const Description = ({ productData }: { productData: any }) => {
  const [isViewMoreClick, setIsViewMoreClick] = useState(false);

  return (
    <div className=" mt-4  md:p-5 md:pr-0 bg-white">
      <div className="">
        <section>
          {/* <p className="font-semibold  text-medium  bg-[#FAFAFA] mb-0 py-2  ">
            {`Product details of ${productData?.data?.name}`}
          </p> */}
        </section>
        <section>
          <p className="mb-4">{productData?.data?.description}</p>
          {!isViewMoreClick && (
            <div className=" w-full flex flex-col justify-center md:py-2 items-center overflow-hidden">
              <img
                alt=""
                className="h-[600px] w-auto object-cover "
                src={productData?.data?.images[0]}
              />
            </div>
          )}
          {isViewMoreClick && (
            <div
              id="viewMore"
              className=" w-full flex flex-col justify-center md:py-2 items-center overflow-hidden"
            >
              {productData?.data?.images.map((image: any) => (
                <img
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
                onClick={() => setIsViewMoreClick(true)}
                className="py-2 px-6 text-[#136CFF] transition-all duration-300 ease-in-out hover:text-white border-[1px] hover:bg-[#136CFF] border-[#136CFF] hover:border-[#136CFF] text-sm"
              >
                VIEW MORE
              </button>
            ) : (
              <button
                onClick={() => setIsViewMoreClick(false)}
                className="py-2 px-6 text-[#136CFF] transition-all duration-300 ease-in-out hover:text-white border-[1px] hover:bg-[#136CFF] border-[#136CFF] hover:border-[#136CFF] text-sm"
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

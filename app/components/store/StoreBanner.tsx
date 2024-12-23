"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import storeImg from "@/public/images/store.webp";
// import storeImg from "../../../public/images/image.png";

const StoreBanner = ({
  storeData,
  handleFollowShop,
  isFollower,
}: {
  storeData?: {
    id: string;
    name: string;
    logo: string;
    follower: string | number;
  };
  handleFollowShop: any;
  isFollower: boolean;
}) => {
  //   const { data: vendorProductsData, isLoading } =
  //     useGetAllVendorProductsQuery(null);

  console.log("storeData", storeData);

  return (
    <section>
      <div className="bg-white ">
        <div className="flex items-center gap-5">
          <div>
            <div className="md:size-[70px] size-[50px]">
              <Image src={storeImg} alt="" className="" />
            </div>
          </div>
          <div className="flex flex-col space-y-0.5 md:text-left ">
            <p className="font-semibold md:text-base text-[15px]">
              {storeData?.name}
            </p>
            <p className="text-[#757575] text-[12px] flex items-center gap-1">
              <span> {storeData?.follower}</span>
              <span>Followers</span>
            </p>
            <p className="text-[#757575] text-[12px] md:block hidden">
              89% Positive seller ratings
            </p>
          </div>
          <div
            onClick={handleFollowShop}
            className="flex flex-col ml-4 relative hover:bg-primary hover:bg-opacity-10 hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:border-t-0 hover:before:border-l-4 hover:before:border-r-4 hover:before:border-b-4 hover:before:border-transparent hover:before:rounded"
          >
            <div className="text-primary flex items-center cursor-pointer ">
              <span className="font-bold">+</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="md:size-6 size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>
              </span>
            </div>
            <div>
              <p className="text-primary text-[12px]">
                {!isFollower ? (
                  <span className="">UNFOLLOW</span>
                ) : (
                  <span className="">FOLLOW</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreBanner;

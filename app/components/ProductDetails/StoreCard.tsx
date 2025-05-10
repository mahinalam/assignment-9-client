import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import { IProduct } from "@/types";
import shopImg from "@/public/images/store.webp";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiCashRegisterLight } from "react-icons/pi";

const StoreCard = ({
  product,
  handleFollowShop,
}: {
  product: IProduct;
  handleFollowShop?: any;
}) => {
  console.log("product", product);

  return (
    <div>
      <div />
      <div className="bg-[#FAFAFA] p-5 md:block hidden mt-10">
        <div>
          <section>
            <div>
              <p className="text-[#757575] text-[14px]">Delivery Options</p>
              <div className="flex justify-between">
                <div className="flex gap-1 mt-2">
                  <CiDeliveryTruck size={25} />
                  <div className="">
                    <p className="text-[#212121] text-sm">Standard Delivery</p>
                    <p className="text-xs text-[#757575]">
                      Guaranteed delivery within 3-7 days{" "}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-title">
                    ৳ <span className="font-bold">60</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <PiCashRegisterLight size={25} />
                <p className="text-sm text-[#757575]">
                  Cash on Delivery Available
                </p>
              </div>
            </div>
          </section>
          <section>
            <div>
              <p className="text-[#757575] text-[14px] mt-3">Sold By</p>
              <p className="text-[#212121]">{product?.shop?.name}</p>
            </div>
          </section>
          <section className=" ">
            {/* <div className="flex flex-col gap-4 ">
            <p>Positive Seller Ratings</p>
            <p className="text-3xl font-bold">91%</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>Ship on Time</p>
            <p className="text-3xl font-bold">100%</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>Chat Response Rate</p>
            <p>Not enough data</p>
          </div> */}
            {/* <div className="flex justify-between text-[#757575] text-[14px]">
              <p>Positive Seller Ratings</p>
              <p>Ship on Time</p>
              <p>Chat Response Rate</p>
            </div>
            <div className="flex justify-between mt-3">
              <p className="font-medium text-2xl">100%</p>
              <p className="font-medium text-2xl">100%</p>
              <p className="font-medium text-2xl text-left">100%</p>
            </div> */}
            <div className="mt-2">
              <Link
                className="text-[#136cff] text-center font-medium border-y-1 p-2 mt-2"
                href={`/store/${product.shop?.id}`}
              >
                GO TO STORE
              </Link>
            </div>
          </section>
        </div>
      </div>
      <div className=" block md:hidden mt-3">
        <section>
          <div className="flex justify-between items-center">
            {/* positive seller */}
            <div className="flex items-center">
              <Image alt="" height={50} src={shopImg} width={50} />
              <p className="ml-2">{product?.shop?.name}</p>
            </div>
            {/* shop on time */}
            <div>
              <Button
                className="text-primary border-primary border-[1px] hover:text-white hover:border-white hover:bg-primary"
                size="sm"
                variant="bordered"
                onClick={handleFollowShop}
              >
                Follow
              </Button>
            </div>
          </div>
        </section>
        {/* <section>
            <div>
                
            </div>
        </section> */}
        {/* <section className="flex px-4 py-2 my-[20px]">
          <div className="flex flex-col items-center text-center">
            <p className="font-2xl font-semibold">100%</p>
            <p className="text-[12px] mt-1 text-[#757575]">
              Positive seller ratings
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="font-2xl font-semibold">100%</p>
            <p className="text-[12px] mt-1 text-[#757575]">Shop On Time</p>
          </div>
        </section> */}
        <section>
          <Link
            className="text-center text-[14px] text-primary mb-[20px] block"
            href={`/shop/${product.shop!.id}`}
          >
            visit store
          </Link>
        </section>
      </div>
    </div>
  );
};

export default StoreCard;

import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";

import { IProduct } from "@/types";

const StoreCard = ({ product }: { product: IProduct }) => {
  console.log("product", product);

  return (
    <div>
      <div />
      <div className="bg-[#FAFAFA] p-5 md:block hidden">
        <div>
          <section>
            <div>
              <p className="text-[#757575] text-[14px]">Sold By</p>
              <p className="text-[#212121]">TP-Link</p>
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
            <div className="flex justify-between text-[#757575] text-[14px]">
              <p>Positive Seller Ratings</p>
              <p>Ship on Time</p>
              <p>Chat Response Rate</p>
            </div>
            <div className="flex justify-between mt-3">
              <p className="font-medium text-2xl">100%</p>
              <p className="font-medium text-2xl">100%</p>
              <p className="font-medium text-2xl text-left">100%</p>
            </div>
            <div>
              <Link
                className="text-[#136cff] text-center font-medium border-y-1 p-2 mt-2"
                href={`/store/${product.shop?.ownerId}`}
              >
                GO TO STORE
              </Link>
            </div>
          </section>
        </div>
      </div>
      <div className=" block md:hidden">
        <section>
          <div className="flex justify-between items-center">
            <div className="flex">
              <p>Logo</p>
              <p className="ml-2">Name</p>
            </div>
            <div>
              <Button
                className="text-[#f57224] border-[#f57224] border-[1px]"
                size="sm"
                variant="bordered"
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
        <section className="flex px-4 py-2 my-[20px]">
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
          <div className="flex flex-col items-center text-center">
            <p className="font-2xl font-semibold">100%</p>
            <p className="text-[12px] mt-1 text-[#757575]">
              Chat Response Rate
            </p>
          </div>
        </section>
        <section>
          <p className="text-center text-[12px] text-[#f57224] mb-[20px]">
            visit store
          </p>
        </section>
      </div>
    </div>
  );
};

export default StoreCard;

import React from "react";
import Link from "next/link";

import FlashSaleCard from "../../sharred/FlashSaleCard";

import { IProduct } from "@/types";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";

const FlashSale = () => {
  const { data: flashProductsData, isLoading: flashProductsLoading } =
    useGetAllProductsQuery(null);

  return (
    <div className="w-full">
      <div>
        <section>
          <h1 className="md:text-[22px] text-[16px] md:leading-[38px] leading-[30px]">
            Flash Sale
          </h1>
        </section>
        <section>
          <div>
            <div className="flex justify-between items-center  py-2 md:text-[14px] text-[12px] border-b-1">
              <p className="ml-4 text-[#F57224] font-medium">On Sale Now</p>
              {/* <Button size="sm">Shop All Products</Button> */}
              <button className="uppercase p-2 border-1 border-[#F57224] text-[#F57224] font-medium md:block hidden">
                Shop All Products
              </button>
              <button className="font-medium block md:hidden ">
                <span> Shop More </span>
                <span>{`>`}</span>
              </button>
            </div>
          </div>
          <div className="md:hidden block">
            <div className="grid  grid-cols-3 mt-2 gap-4  ">
              {flashProductsData?.data
                ?.slice(0, 3)
                .map((flashSaleProduct: any) => (
                  <FlashSaleCard
                    key={flashSaleProduct.id}
                    product={flashSaleProduct}
                  />
                ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-6 mt-2 gap-4 ">
              {flashProductsData?.data.map((flashSaleProduct: IProduct) => (
                <Link
                  key={flashSaleProduct.id}
                  href={`/products/${flashSaleProduct.id}`}
                >
                  <FlashSaleCard product={flashSaleProduct} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FlashSale;

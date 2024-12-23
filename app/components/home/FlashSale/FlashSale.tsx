import React from "react";
import Link from "next/link";

import FlashSaleCard from "../../sharred/FlashSaleCard";

import { IProduct } from "@/types";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import Title from "../Title";

const FlashSale = () => {
  const { data: flashProductsData, isLoading: flashProductsLoading } =
    useGetAllProductsQuery(null);

  return (
    <div className="w-full md:mt-10 mt-5">
      <div>
        <Title title="Flash Sale" />
        <section>
          <div>
            <div className="flex justify-between items-center  py-2 md:text-sm text-xs border-b-1">
              <p className="ml-4 text-primary font-medium">On Sale Now</p>
              {/* <Button size="sm">Shop All Products</Button> */}
              <Link href="/products">
                <button className="uppercase p-2 border-1 border-primary text-primary font-medium md:block hidden">
                  Shop All Products
                </button>
              </Link>
              <Link href="products" className="block md:hidden">
                <button className="font-medium  ">
                  <span> Shop More </span>
                  <span>{`>`}</span>
                </button>
              </Link>
            </div>
          </div>
          <div className="md:hidden block">
            <div className="grid  grid-cols-1 sm:grid-cols-2 mt-2 gap-4  ">
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

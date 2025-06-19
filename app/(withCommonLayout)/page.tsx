"use client";

import React from "react";

import CarouselPage from "../components/home/CarouselComponent";
import NewsLetter from "../components/home/NewsLetter";
import CouponCode from "../components/home/CouponCode/CouponCode";
import FeaturedProducts from "../components/home/Featured/FeaturedProduct";

import Categories from "@/app/components/home/Categories/Categories";
import FlashSale from "@/app/components/home/FlashSale/FlashSale";
import JustForYou from "@/app/components/home/JustForYou/JustForYou";

const Home = () => {
  return (
    <div>
      <div className="lg:mt-[160px] md:mt-[96px] mt-[62px]">
        <CarouselPage />
      </div>
      <FlashSale />
      <Categories />
      <FeaturedProducts />
      <CouponCode />
      <JustForYou />
      <NewsLetter />
    </div>
  );
};

export default Home;

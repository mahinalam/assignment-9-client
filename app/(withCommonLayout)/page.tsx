"use client";

import React from "react";

import CarouselPage from "../components/home/CarouselComponent";
import NewsLetter from "../components/home/NewsLetter";
import CouponCode from "../components/home/CouponCode/CouponCode";

import Categories from "@/app/components/home/Categories/Categories";
import FlashSale from "@/app/components/home/FlashSale/FlashSale";
import JustForYou from "@/app/components/home/JustForYou/JustForYou";

const Home = () => {
  return (
    <div>
      <div className="md:mt-[160px] mt-10">
        <CarouselPage />
      </div>
      <FlashSale />
      <Categories />
      {/* <CouponCode /> */}
      <JustForYou />
      <NewsLetter />
    </div>
  );
};

export default Home;

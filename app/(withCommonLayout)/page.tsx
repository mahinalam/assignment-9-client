"use client";

import React from "react";

import Categories from "@/app/components/home/Categories/Categories";
import FlashSale from "@/app/components/home/FlashSale/FlashSale";
import JustForYou from "@/app/components/home/JustForYou/JustForYou";
import Container from "@/app/components/sharred/Container";

const Home = () => {
  return (
    <Container>
      <FlashSale />
      <Categories />
      <JustForYou />
    </Container>
  );
};

export default Home;

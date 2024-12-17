"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/tabs";

const StoreBanner = () => {
  //   const { data: vendorProductsData, isLoading } =
  //     useGetAllVendorProductsQuery(null);

  return (
    <section>
      <div className="bg-white">
        <div className="flex items-center gap-4">
          <p>Logo</p>
          <div className="flex flex-col space-y-0.5">
            <p className="font-semibold">Marico</p>
            <p className="text-[#757575] text-[12px]">136999 Followers</p>
            <p className="text-[#757575] text-[12px]">
              89% Positive seller ratings
            </p>
          </div>
          <div>
            <Button color="danger">Follow</Button>
          </div>
        </div>
      </div>
      <div>
        <Tabs aria-label="Options" className="bg-none">
          <Tab key="store" className="mr-10" title="Store">
            <div />
          </Tab>
          <Tab key="music" title="Music" />
        </Tabs>
      </div>
    </section>
  );
};

export default StoreBanner;

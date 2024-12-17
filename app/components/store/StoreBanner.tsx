"use client";

import React from "react";
import { Button } from "@nextui-org/button";

const StoreBanner = ({
  storeData,
}: {
  storeData?: { id: string; name: string; logo: string };
}) => {
  //   const { data: vendorProductsData, isLoading } =
  //     useGetAllVendorProductsQuery(null);

  return (
    <section>
      <div className="bg-white">
        <div className="flex items-center gap-4">
          <p>{""}</p>
          <div className="flex flex-col space-y-0.5">
            <p className="font-semibold md:text-base text-[15px]">{""}</p>
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
      {/* <div>
        <Tabs aria-label="Options" className="bg-none">
          <Tab key="store" title="Store" className="mr-10">
            <div></div>
          </Tab>
          <Tab key="music" title="Music"></Tab>
        </Tabs>
      </div> */}
    </section>
  );
};

export default StoreBanner;

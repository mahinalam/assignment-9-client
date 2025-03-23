"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";

const StoreBanner = ({ isFollower, storeData, handleFollowShop }: any) => {
  const { follower, id, logo, name, description, createdAt } = storeData;

  console.log("storedata", storeData);

  return (
    <section className="mt-40">
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <section>
            <Image alt="" height={100} src={logo} width={100} />
          </section>
          <section>
            <div className="flex flex-col space-y-3">
              <p className="font-bold text-2xl">{name}</p>
              <p className="text-gray-500">{description}</p>
              <div className="flex gap-4 items-center">
                <div className="flex items-center">
                  <span>
                    <svg
                      className="size-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{follower} followers</span>
                </div>
                <p className="text-gray-500">
                  Since {new Date(createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </section>
        </div>
        <section>
          <Button
            className="bg-[#2abbe8] text-white"
            onClick={() => handleFollowShop()}
          >
            {!isFollower ? "Follow" : "Following"}
          </Button>
        </section>
      </div>
    </section>
  );
};

export default StoreBanner;

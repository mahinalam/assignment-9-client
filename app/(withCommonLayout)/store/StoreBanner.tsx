"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IoSearchOutline } from "react-icons/io5";
import { TQueryParam } from "@/types";

const StoreBanner = ({
  isFollower,
  storeData,
  handleFollowShop,
  hanldeUnfollowShop,
  followLoading,
  unFollowLoading,
}: any) => {
  const { follower, id, logo, name, description, createdAt } = storeData;

  // console.log("storedata", storeData);
  console.log("is follower", isFollower);
  const [value, setValue] = useState("");

  return (
    <section className="lg:px-2 lg:pt-8 pt-6">
      <div className="flex items-center justify-between ">
        <div className="flex justify-between lg:gap-6 gap-4">
          {/* image */}
          <section>
            <div className="relative ">
              {" "}
              {/* Adjust width/height based on screen size */}
              <img src={logo} alt="Logo" className="lg:size-20 size-16" />
            </div>
          </section>
          {/* title section */}
          <section>
            <div className="flex flex-col ">
              <p className="font-bold lg:text-2xl text-lg">{name}</p>
              <p className="text-gray-500">{description}</p>
              <div className="flex gap-4 items-center">
                <div className="lg:block hidden">
                  <div className="flex items-center l">
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
                </div>
                <p className="text-gray-500 sm:text-base text-sm">
                  Since {new Date(createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </section>

          {/* follow button */}
          <div className="text-end lg:text-start ">
            {isFollower ? (
              <Button
                disabled={unFollowLoading}
                size="sm"
                className="text-white bg-primary mt-4 border-primary border-1 hover:bg-primary"
                onClick={() => hanldeUnfollowShop()}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                size="sm"
                className="text-white bg-primary mt-4 border-primary border-1 hover:bg-primary"
                onClick={() => handleFollowShop()}
                disabled={followLoading}
              >
                Follow
              </Button>
            )}
          </div>
        </div>
        {/* <section>
          <Button
            className="text-[#2abbe8] bg-white border-[#2abbe8] border-1 hover:bg-[#2abbe8] hover:text-white"
            onClick={() => handleFollowShop()}
          >
            {!isFollower ? "Follow" : "Following"}
          </Button>
        </section> */}

        {/* search section */}
        <section className="lg:block hidden ">
          <Input
            variant="bordered"
            size="md"
            placeholder="Search in store"
            className="focus:border-transparent"
            endContent={
              <button type="button">
                <IoSearchOutline size={20} />
              </button>
            }
          />
        </section>
      </div>
    </section>
  );
};

export default StoreBanner;

"use client";
import React from "react";

import { useGetUserStatsQuery } from "@/app/redux/features/user/userApi";
import Loader from "@/app/components/sharred/Loader";

const UserOverViewPage = () => {
  // const { data: userStatsInfo, isLoading: userStatsLoading } =
  //   useGetUserStatsQuery(null);

  // console.log("stats", userStatsInfo);
  // if (userStatsLoading) {
  //   return <Loader />;
  // }

  // const { totalCartItems, totalFollowedShops, totalOrders, totalReviews } =
  //   userStatsInfo?.data;

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-3">
      <div className="flex items-center justify-between bg-[#DBEAFE] font-bold px-3 py-5 gap-4 ">
        <section>
          <div className="text-xl">
            <p>Total Orders</p>
            {/* <p>{totalOrders || 0}</p> */}
          </div>
        </section>
        <section>
          <svg
            className="size-8 font-bold"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </section>
      </div>
      <div className="flex items-center justify-between bg-[#FEE2E2] font-bold px-3 py-5 gap-4 ">
        <section>
          <div className="text-xl">
            <p>Followed Shops</p>
            {/* <p>{totalFollowedShops || 0}</p> */}
          </div>
        </section>
        <section>
          <svg
            className="size-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </section>
      </div>
      <div className="flex items-center justify-between bg-[#DCFCE7] font-bold px-3 py-5 gap-4 ">
        <section>
          <div className="text-xl">
            <p>Cart Items</p>
            {/* <p>{totalCartItems || 0}</p> */}
          </div>
        </section>
        <section>
          <svg
            className="size-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </section>
      </div>
      <div className="flex items-center justify-between bg-[#FEF9C3] font-bold px-3 py-5 gap-4 ">
        <section>
          <div className="text-xl">
            <p>My Reviews</p>
            {/* <p>{totalReviews || 0}</p> */}
          </div>
        </section>
        <section>
          <svg
            className="size-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </section>
      </div>
    </div>
  );
};

export default UserOverViewPage;

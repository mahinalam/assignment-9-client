import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/app/redux/store";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";

const BillingCard = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo, isLoading } = useGetSingleUserQuery(userId);

  console.log("currentUserInfo", currentUserInfo);

  if (isLoading) {
    return;
  }

  const getDeliveryDateRange = () => {
    const today = new Date();
    const endDay = new Date(today);

    endDay.setDate(today.getDate() + 3);

    const optionsDay = { day: "numeric" }; // For day only
    const optionsMonth = { month: "short" }; // For month only

    const startDate = today.toLocaleDateString("en-US", optionsDay as any); // e.g., 11
    const endDate = endDay.toLocaleDateString("en-US", optionsDay as any); // e.g., 14
    const month = today.toLocaleDateString("en-US", optionsMonth as any); // e.g., Jan

    return `Get by ${startDate}-${endDate} ${month}`;
  };

  return (
    <div>
      <div className="space-y-4 text-sm">
        <section>
          <p>Shipping & Billing</p>
        </section>
        <section className="flex gap-4 items-center">
          <p>{currentUserInfo?.data?.name}</p>
          <p>{currentUserInfo?.data?.phoneNumber}</p>
        </section>
        <section>
          <div className="flex items-center gap-4">
            <span className="font-bold bg-primary text-white text-[14px] rounded-xl  px-2">
              HOME
            </span>
            <span>{currentUserInfo?.data?.address}</span>
          </div>
        </section>
      </div>
      <section className="mt-4">
        <p className="text-sm mb-2">Delivery Option</p>
        <div>
          <section className="flex gap-3 border-[#0094b6] border-1 w-1/4 p-2">
            <div>
              <svg
                className="size-4 bg-[#0094b6] rounded-full text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m4.5 12.75 6 6 9-13.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-[#121212] text-xs">
              <p>
                <span>৳ 60</span>
              </p>
              <p className="mt-2">Standard Delivery</p>
              <p className="mt-4">{getDeliveryDateRange()}</p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default BillingCard;

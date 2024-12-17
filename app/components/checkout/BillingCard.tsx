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

  return (
    <div>
      <div className="space-y-4">
        <section>
          <p>Shipping & Billing</p>
        </section>
        <section className="flex gap-4 items-center">
          <p>{currentUserInfo?.data?.name}</p>
          <p>{currentUserInfo?.data?.phoneNumber}</p>
        </section>
        <section>
          <div className="flex items-center gap-4">
            <span className="font-bold bg-[#F57224] text-white text-[14px] rounded-xl  px-2">
              HOME
            </span>
            <span>{currentUserInfo?.data?.address}</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BillingCard;

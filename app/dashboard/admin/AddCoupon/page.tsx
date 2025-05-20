"use client";

import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { DateInput } from "@nextui-org/react";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";
import { useCreateCouponMutation } from "@/app/redux/features/coupon/couponApi";

const CreateCoupon = () => {
  const [addCoupon, { isSuccess, isLoading }] = useCreateCouponMutation();

  const [dateValue, setDateValue] = useState<string | Date>("");

  const user = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo } = useGetSingleUserQuery(user, {
    skip: !user,
  });

  const onSubmit = async (data: any) => {
    const couponData = {
      code: data.code,
      discount: Number(data.discount),
      minPurchase: Number(data.minPurchase),
      expiration: new Date(dateValue).toISOString(),
    };

    try {
      if (couponData.code) {
        const res = await addCoupon(couponData).unwrap();

        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-center">
          <div className="md:w-[33%] mx-auto  p-5 bg-white">
            <div>
              <p className="text-center text-[18px] font-bold">Create Coupon</p>
            </div>
            <GTForm onSubmit={onSubmit}>
              <div className="py-3">
                <GTInput label="Code" name="code" type="text" />
              </div>
              <div className="py-3">
                <GTInput label="Discount" name="discount" type="number" />
              </div>
              <div className="py-3">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <DateInput
                    label={"Expiration Date"}
                    onChange={(value: any) => setDateValue(value)}
                    variant="bordered"
                    // placeholderValue={new Date()}
                  />
                </div>
              </div>
              <Button
                className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
                isLoading={isLoading && isSuccess}
                size="lg"
                type="submit"
              >
                Create Coupon
              </Button>
            </GTForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;

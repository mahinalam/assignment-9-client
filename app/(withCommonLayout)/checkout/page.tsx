"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import BillingCard from "@/app/components/checkout/BillingCard";
import {
  useApplyCouponCodeMutation,
  useGetUsersUnconfirmOrderQuery,
  useUpdateOrderStatusMutation,
} from "@/app/redux/features/order/orderApi";
import PackageDetailsCard from "@/app/components/checkout/PackageDetailsCard";
import Container from "@/app/components/sharred/Container";

const CheckoutPage = () => {
  const { data: unconfirmOrder, isLoading } =
    useGetUsersUnconfirmOrderQuery(null);

  const [couponValue, setCouponValue] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState<{
    value: boolean;
    discount: number;
  }>({
    value: false,
    discount: 0,
  });
  const [isClient, setIsClient] = useState(false);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [applyCouponCode] = useApplyCouponCodeMutation();

  console.log("unconfirmOrder", unconfirmOrder);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return "Loading...";
  }

  const handleUpdateOrderStatus = async () => {
    const totalPrice =
      isValidCoupon.value && couponValue
        ? Number(unconfirmOrder?.data?.totalPrice) -
          Number(isValidCoupon.discount) +
          Number(60)
        : Number(unconfirmOrder?.data?.totalPrice) + Number(60);

    const upadteOrderPayload = {
      transactionId: unconfirmOrder?.data?.transactionId,
      totalPrice,
    };

    try {
      const orderResponse: any =
        await updateOrderStatus(upadteOrderPayload).unwrap();

      if (orderResponse.success) {
        window.location.href = orderResponse?.data?.payment_url;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const handleCouponCode = async () => {
    if (couponValue.trim()) {
      try {
        const res = await applyCouponCode({ couponCode: couponValue }).unwrap();

        if (res?.success) {
          setIsValidCoupon({ value: true, discount: res.data.discount });
          toast.success("Coupon applied successfully!");
        }
      } catch (err: any) {
        setIsValidCoupon({ value: false, discount: 0 });
        toast.error(err.data.message || "Invalid coupon code!");
      }
    } else {
      setIsValidCoupon({ value: false, discount: 0 });
      toast.error("Please enter a valid coupon code.");
    }
  };

  const totalPrice =
    isValidCoupon.value && couponValue
      ? Number(unconfirmOrder?.data?.totalPrice) -
        Number(isValidCoupon.discount) +
        Number(60)
      : Number(unconfirmOrder?.data?.totalPrice) + Number(60);

  return (
    <Container>
      <div className="lg:mt-[160px] md:mt-[96px] mt-[62px]">
        <div className="flex gap-4">
          <div className="md:w-8/12">
            <BillingCard />
            <div>
              {unconfirmOrder?.data?.orderItems?.length > 0 &&
                unconfirmOrder?.data?.orderItems?.map(
                  (item: any, index: number) => (
                    <PackageDetailsCard key={index} item={item} />
                  )
                )}
            </div>
          </div>
          <div className="md:w-4/12 bg-white shadow p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">
                Items Total ({unconfirmOrder?.data?.orderItems?.length} items)
              </p>
              <p>৳ {unconfirmOrder?.data?.totalPrice}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">Shipping Fee:</p>
              <p>৳ 60</p>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <p>Total:</p>
              <p>৳ {totalPrice}</p>
            </div>
            <div className="mt-4">
              <div className="flex gap-4 items-center">
                <Input
                  className="mb-4"
                  placeholder="Enter voucher code"
                  onChange={(e) => setCouponValue(e.target.value)}
                />
                <Button
                  className=" bg-[#21B7D1] text-white mb-4 hover:bg-blue-600"
                  size="sm"
                  onClick={handleCouponCode}
                >
                  Apply
                </Button>
              </div>
              <Button
                className="w-full bg-primary text-white hover:bg-orange-600"
                onClick={handleUpdateOrderStatus}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;

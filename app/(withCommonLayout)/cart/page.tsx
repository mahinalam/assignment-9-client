"use client";

import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";

import CartPage from "./components/CartPage";
import CartPageLoading from "./loading";

import CheckoutModal from "@/app/components/modal/CheckoutModal";
import { useGetCartQuantityQuery } from "@/app/redux/features/cart/cartApi";
import { RootState } from "@/app/redux/store";
import {
  useApplyCouponCodeMutation,
  useCreateOrderMutation,
} from "@/app/redux/features/order/orderApi";
import Container from "@/app/components/sharred/Container";
import { useGetNewsLetterQuery } from "@/app/redux/features/newsLetter/newsLetterApi";
import EmptyState from "@/app/components/dashboard/EmptyState";

const AllCart = () => {
  const {
    isOpen: isCheckoutModalOpen,
    onOpen: onCheckoutModalOpen,
    onOpenChange: onCheckoutModalChange,
    onClose,
  } = useDisclosure();

  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  const {
    data: cart,
    isLoading: cartLoading,
    isFetching,
  } = useGetCartQuantityQuery(null);
  const { data: newsLetterData } = useGetNewsLetterQuery(undefined);

  const [createOrder, { isSuccess }] = useCreateOrderMutation();
  const [createOrderLoading, setCreateOrderLoading] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState<{
    value: boolean;
    discount: number;
  }>({
    value: false,
    discount: 0,
  });
  const [applyCouponCode] = useApplyCouponCodeMutation();

  if (cartLoading || isFetching) {
    return <CartPageLoading />;
  }

  if (!userId) {
    router.push("/login");
  }

  const isSubscriptionUser = newsLetterData?.data?.email === userEmail;

  const handleCreateOrder = async (data: any) => {
    setCreateOrderLoading(true);

    const orderPayload = {
      ...data,
      shopId: cart?.data?.shopId,
      orderItems: cart?.data?.cartItems?.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const orderResponse: any = await createOrder(orderPayload).unwrap();

      if (orderResponse?.success) {
        setCreateOrderLoading(false);
        window.location.href = orderResponse?.data?.payment_url;

        onClose();
      }
    } catch (err) {
      setCreateOrderLoading(false);
    }
  };

  // handle coupon
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

  let totalPrice =
    100 + Number(cart?.data?.totalPrice) - isValidCoupon.discount || 0;

  if (isSubscriptionUser) {
    totalPrice = totalPrice * 0.8;
  }

  return (
    <Container>
      {cart?.data?.cartItems?.length > 0 ? (
        <>
          {" "}
          <div className=" grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-3  pt-[100px] min-h-[70vh] sm:pt-[120px] lg:pt-48">
            <div className="lg:col-span-8">
              {cart?.data?.cartItems.length > 0 ? (
                cart?.data?.cartItems.map((cartItem: any, index: number) => (
                  <CartPage key={index} cartData={cartItem} />
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
            {/* Right Section: Order Summary */}
            <div className="lg:col-span-4 bg-white shadow p-4 rounded">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <p className="text-gray-700">Subtotal items:</p>
                <p>{cart?.data?.totalPrice}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-700">Shipping Fee:</p>
                <p>৳ {Number(100)}</p>
              </div>

              <div className="flex mt-4 gap-4 items-center">
                <Input
                  className="mb-4"
                  placeholder="Enter coupon code"
                  onChange={(e) => setCouponValue(e.target.value)}
                />
                <Button
                  className=" bg-[#DCDCDC] text-black mb-4 hover:bg-blue-600"
                  size="sm"
                  onClick={handleCouponCode}
                >
                  Apply
                </Button>
              </div>
              {isSubscriptionUser && (
                <p className="my-2 p-1 font-medium text-sm border-2 border-green-700">
                  20% subscriber discount has been applied.
                </p>
              )}

              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <p>Total:</p>
                <p>৳ {totalPrice}</p>
              </div>
              <Button
                className="w-full bg-primary mt-3 text-white disabled:cursor-not-allowed"
                disabled={cart?.data?.totalQuantity === 0}
                onClick={() => onCheckoutModalOpen()}
              >
                Proceed to Checkout
              </Button>
            </div>
            <CheckoutModal
              handleCreateOrder={handleCreateOrder}
              isForBuy={true}
              isOpen={isCheckoutModalOpen}
              isSuccess={isSuccess}
              loading={createOrderLoading}
              onOpenChange={onCheckoutModalChange}
            />
          </div>
        </>
      ) : (
        <>
          <EmptyState
            address="/products"
            label="Browse products"
            message="Oops! Your cart is empty"
          />{" "}
        </>
      )}
    </Container>
  );
};

export default AllCart;

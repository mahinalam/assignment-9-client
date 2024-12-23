"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BillingCard from "@/app/components/checkout/BillingCard";
import PackageDetailsCard from "@/app/components/checkout/PackageDetailsCard";
import { clearCart, ICartItem } from "@/app/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/app/redux/features/order/orderApi";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";

const CheckoutPage = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const { data: currentUserInfo } = useGetSingleUserQuery(userId, {
    skip: !userId,
  });

  const dispatch = useDispatch();

  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  // console.log("cartItems", cartItems);
  const handleCreateOrder = async () => {
    if (cart.items.length === 0) {
      alert("Please select at least one item to place an order.");
      return;
    }

    const orderPayload = {
      userId,
      shippingAddress: currentUserInfo?.data?.address,
      orderItems: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.newPrice,
      })),
    };
    console.log("orderPayload", orderPayload);
    try {
      const orderResponse: any = await createOrder(orderPayload).unwrap();
      console.log({ orderResponse });
      if (orderResponse.success) {
        dispatch(clearCart());
        window.location.href = orderResponse?.data?.payment_url;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="md:w-8/12">
        <BillingCard />
        <div>
          {cart.items.length > 0 &&
            cart.items.map((item: ICartItem, index: number) => (
              <PackageDetailsCard key={index} item={item} />
            ))}
        </div>
      </div>
      <div className="md:w-4/12 bg-white shadow p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Subtotal items:</p>
          <p>{cart.items.reduce((total, item) => total + item.quantity, 0)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Shipping Fee:</p>
          <p>৳ 0</p>
        </div>
        <div className="border-t pt-4 flex justify-between text-lg font-bold">
          <p>Total:</p>
          <p>৳ {cart.totalAmount}</p>
        </div>
        <div className="mt-4">
          <div className="flex gap-4 items-center">
            <Input className="mb-4" placeholder="Enter voucher code" />
            <Button
              className=" bg-[#21B7D1] text-white mb-4 hover:bg-blue-600"
              size="sm"
            >
              Apply
            </Button>
          </div>

          <Button
            className="w-full bg-orange-500 text-white hover:bg-orange-600"
            onClick={handleCreateOrder}
          >
            Proceed to Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

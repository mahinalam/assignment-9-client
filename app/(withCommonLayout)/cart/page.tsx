"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";

import CartPage from "./components/CartPage";

import { RootState } from "@/app/redux/store";
import { IProduct } from "@/types";
import FlashSaleCard from "@/app/components/sharred/FlashSaleCard";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/app/redux/features/cart/cartSlice";
import { useGetAllProductsQuery } from "@/app/redux/features/product/productApi";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { useCreateOrderMutation } from "@/app/redux/features/order/orderApi";

const Page = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isClient, setIsClient] = useState(false);
  // const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo } = useGetSingleUserQuery(userId, {
    skip: !userId,
  });
  const dispatch = useDispatch();

  console.log("cartItems", cartItems);

  const { data: productsData, isLoading } = useGetAllProductsQuery(null);

  const [createOrder] = useCreateOrderMutation();

  // Ensure this component only renders on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // if (checkedItems[item.productId]) {
      return total + item.newPrice * item.quantity;
      // }
      // return total;
    }, 0);
  };

  const handleInCrementQuantity = (id: string) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementQuantity({ id }));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div>
      <div className="flex  gap-4">
        <div className="md:w-8/12">
          {cartItems?.length > 0 ? (
            cartItems.map((cart, index) => (
              <CartPage
                key={index}
                cartData={cart}
                handleDecrementQuantity={handleDecrementQuantity}
                handleInCrementQuantity={handleInCrementQuantity}
                handleRemoveFromCart={handleRemoveFromCart}
                // handleCheckboxChange={handleCheckboxChange} // New prop
                // isChecked={checkedItems[cart.productId] || false} // New prop
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Right Section: Order Summary */}
        <div className="md:w-4/12 bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-700">Subtotal items:</p>
            <p>{cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-700">Shipping Fee:</p>
            <p>৳ 0</p>
          </div>
          <div className="border-t pt-4 flex justify-between text-lg font-bold">
            <p>Total:</p>
            <p>৳ {calculateSubtotal()}</p>
          </div>
          <div className="mt-4">
            <Input className="mb-4" placeholder="Enter voucher code" />
            <Button className="w-full bg-blue-500 text-white mb-4 hover:bg-blue-600">
              Apply Voucher
            </Button>
            <Link href="/checkout">
              <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <p className="my-4 font-normal">Just For You</p>
        <div className="grid grid-cols-6 mt-2 gap-4 ">
          {productsData?.data.map((flashSaleProduct: IProduct) => (
            <Link
              key={flashSaleProduct.id}
              href={`/products/${flashSaleProduct.id}`}
            >
              <FlashSaleCard product={flashSaleProduct} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";

import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/button";

import CartPage from "./components/CartPage";

import CheckoutModal from "@/app/components/modal/CheckoutModal";
import { useGetCartQuantityQuery } from "@/app/redux/features/cart/cartApi";
import { RootState } from "@/app/redux/store";
import { useCreateOrderMutation } from "@/app/redux/features/order/orderApi";
import Container from "@/app/components/sharred/Container";

const AllCart = () => {
  const {
    isOpen: isCheckoutModalOpen,
    onOpen: onCheckoutModalOpen,
    onOpenChange: onCheckoutModalChange,
    onClose,
  } = useDisclosure();

  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: cart, isLoading: cartLoading } = useGetCartQuantityQuery(null);

  console.log("cart", cart);

  const [createOrder, { isSuccess, isLoading }] = useCreateOrderMutation();

  if (!userId) {
    router.push("/login");
  }

  const handleCreateOrder = async (data: any) => {
    console.log("order data", data);

    const orderPayload = {
      ...data,
      shopId: cart?.data?.shopId,
      orderItems: cart?.data?.cartItems?.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    console.log("orderpayload", orderPayload);

    try {
      const orderResponse: any = await createOrder(orderPayload).unwrap();
      console.log("order response", orderResponse);
      if (orderResponse?.success) {
        window.location.href = orderResponse?.data?.payment_url;

        onClose();
      }
    } catch (err) {}
  };

  console.log({ isSuccess });

  return (
    <Container>
      <div className=" flex gap-4 min-h-[60vh] lg:mt-[160px] md:mt-[96px] mt-[62px]">
        <div className="md:w-8/12">
          {/* {cart?.data?.cartItems.length > 0 && (
          <div className="flex items-center mb-4">
            <Checkbox
              isSelected={allItemsSelected} // Controlled by parent
              onChange={(e) => handleGlobalCheckboxChange(e.target.checked)}
            />
            <span>Select All</span>
          </div>
        )} */}
          {cart?.data?.cartItems.length > 0 ? (
            cart?.data?.cartItems.map((cartItem: any, index: number) => (
              <CartPage
                // onCartRemoveWarningModalOpen={onCartRemoveWarningModalOpen}
                key={index}
                cartData={cartItem}
                // isChecked={selectedItems.includes(cartItem?.product?.id)
                // handleRemoveCart={handleRemoveCart}
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
            <p>{cart?.data?.totalPrice}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-700">Shipping Fee:</p>
            <p>৳ {Number(60)}</p>
          </div>
          <div className="border-t pt-4 flex justify-between text-lg font-bold">
            <p>Total:</p>
            <p>৳: {Number(60 + cart?.data?.totalPrice)}</p>
            {/* <p>৳<p/> */}

            {/* </Link> */}
          </div>
          <Button
            className="w-full bg-primary text-white disabled:cursor-not-allowed"
            disabled={cart?.data?.totalQuantity === 0}
            onClick={() => onCheckoutModalOpen()}
          >
            Proceed to Checkout
          </Button>
        </div>
        <CheckoutModal
          handleCreateOrder={handleCreateOrder}
          isOpen={isCheckoutModalOpen}
          isSuccess={isSuccess}
          onOpenChange={onCheckoutModalChange}
          isForBuy={true}
        />
      </div>
    </Container>
  );
};

export default AllCart;

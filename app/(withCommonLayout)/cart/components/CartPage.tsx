"use client";

import { useDisclosure } from "@nextui-org/react";
import React from "react";
import { toast } from "sonner";
import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";

import {
  useCreateCartMutation,
  useRemoveCartMutation,
} from "@/app/redux/features/cart/cartApi";
import CartRemoveWarningModal from "@/app/components/modal/CartRemoveWarningModal";
import { calculateDiscountPercentage } from "@/app/components/sharred";

const CartPage = ({ cartData }: { cartData: any }) => {
  const [removeCart] = useRemoveCartMutation();

  const {
    isOpen: isCartRemoveWarningModalOpen,
    onOpen: onCartRemoveWarningModalOpen,
    onOpenChange: onCartRemoveModalChange,
    onClose: onRemoveCartClose,
  } = useDisclosure();

  const { id, product, quantity } = cartData;
  const [createCart] = useCreateCartMutation();
  const {
    price,
    discount,
    images,
    name,
    description,
    id: productId,
    shopId,
  } = product;

  const { discountPercentage, discountPrice } = calculateDiscountPercentage(
    Number(price),
    Number(discount),
  );

  const handleRemoveCart = async () => {
    await removeCart({ cartItemId: id }).unwrap();
    onRemoveCartClose();
  };

  const handleAddToCart = async (type: "incre" | "decre") => {
    let cartInfo = {
      productId,
      shopId,
      quantity: type === "incre" ? 1 : -1,
      price: discountPrice,
    };

    try {
      await createCart(cartInfo).unwrap();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex justify-between bg-white border-b pb-4 mb-4 pr-4 md:pt-0 pt-3">
      <img
        alt={images[0]}
        className="lg:size-20 size-14 object-cover rounded ml-3"
        src={images[0]}
      />
      <div className="flex-1 ml-4">
        <h3 className="font-medium lg:text-base text-sm">{name}</h3>
        <p className="text-sm text-gray-500">
          {description?.length > 100 && description?.substring(0, 100)} ...
        </p>

        <div className="flex  justify-between">
          <div className="flex">
            <span className="mr-2 text-primary font-medium">
              {" "}
              ৳ {discountPrice}
            </span>
            <span className="line-through text-gray-400 lg:block hidden ">
              ৳ {price}
            </span>
          </div>
          <div className="block md:hidden pr-4">
            <div className="border-1 border-black inline-flex rounded-lg  gap-4 lg:px-2 lg:py-2 px-1 py-1">
              <button
                className="text-sm pl-1 flex items-center"
                disabled={quantity === 1}
                onClick={() => {
                  handleAddToCart("decre");
                }}
              >
                <HiMiniMinus />
              </button>
              <span className="text-sm">{quantity}</span>
              <button
                className="text-sm flex items-center pr-1"
                disabled={quantity === 10}
                onClick={() => {
                  handleAddToCart("incre");
                }}
              >
                <HiMiniPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex hidden items-center">
        <div className="border-1 border-black inline-flex rounded-lg  gap-4 lg:px-2 lg:py-2 px-1 py-1">
          <button
            className="text-sm pl-1 flex items-center"
            disabled={quantity === 1}
            onClick={() => {
              handleAddToCart("decre");
            }}
          >
            <HiMiniMinus />
          </button>
          <span className="text-sm">{quantity}</span>
          <button
            className="text-sm flex items-center pr-1"
            disabled={quantity === 10}
            onClick={() => {
              handleAddToCart("incre");
            }}
          >
            <HiMiniPlus />
          </button>
        </div>
      </div>
      <button
        className="md:block hidden ml-4"
        onClick={() => onCartRemoveWarningModalOpen()}
      >
        <RiDeleteBin5Line size={20} />
      </button>

      <CartRemoveWarningModal
        btn1="REMOVE"
        btn2="CANCEL"
        handleRemoveCart={handleRemoveCart}
        isOpen={isCartRemoveWarningModalOpen}
        subTitle="Items will be remove from cart."
        title="Remove from cart"
        onOpenChange={onCartRemoveModalChange}
      />
    </div>
  );
};

export default CartPage;

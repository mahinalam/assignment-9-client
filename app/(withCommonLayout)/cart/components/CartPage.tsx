"use client";

import React from "react";

import { ICartItem } from "@/app/redux/features/cart/cartSlice";

const CartPage = ({
  cartData,
  handleInCrementQuantity,
  handleDecrementQuantity,
  handleRemoveFromCart,
}: {
  cartData: ICartItem;
  handleInCrementQuantity: any;
  handleDecrementQuantity: any;
  handleRemoveFromCart: any;
}) => {
  const {
    productId,
    image,
    productName,
    newPrice,
    oldPrice,
    description,
    quantity,
  } = cartData;

  return (
    <div className="flex justify-between items-center border-b pb-4 mb-4">
      {/* <Checkbox
        isSelected={isChecked} // Controlled by parent
        onChange={(e) => handleCheckboxChange(productId, e.target.checked)}
      /> */}
      <img
        alt={image}
        className="h-20 w-20 object-cover rounded ml-3"
        src={image}
      />
      <div className="flex-1 ml-4">
        <h3 className="font-medium">{productName}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-orange-500">
          ৳ {newPrice}{" "}
          <span className="line-through text-gray-400">৳ {oldPrice}</span>
        </p>
      </div>
      <div className="flex items-center">
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={quantity === 1}
          onClick={() => handleDecrementQuantity(productId)}
        >
          -
        </button>
        <span className="mx-4">{quantity}</span>
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleInCrementQuantity(productId)}
        >
          +
        </button>
      </div>
      <button
        className="text-red-500 hover:text-red-600 ml-4"
        onClick={() => handleRemoveFromCart(productId)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartPage;

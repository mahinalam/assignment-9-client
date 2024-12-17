"use client";

import React from "react";

import { ICartItem } from "@/app/redux/features/cart/cartSlice";

const PackageDetailsCard = ({ item }: { item: ICartItem }) => {
  const { image, newPrice, oldPrice, description, quantity } = item;

  return (
    <div>
      <div>
        {/* <section>
          <div>
            <p>Delivery Option</p>
          </div>
        </section> */}
        {/* <section>
          <div className="flex flex-col gap-4">
            <p className="flex items-center">
              <span>৳</span> <span>70</span>
            </p>
            <p>Standard Delivery</p>
          </div>
        </section> */}
        <section>
          <div className="flex justify-between items-center border-t pb-4 mt-4">
            <img
              alt={image}
              className="h-20 w-20 object-cover rounded ml-3"
              src={image}
            />
            <div className="flex-1 ml-4">
              <h3 className="font-medium">{""}</h3>
              <p className="text-sm text-gray-500">{description}</p>
              <p className="text-orange-500">
                ৳ {newPrice}
                <span className="line-through text-gray-400">৳ {oldPrice}</span>
              </p>
            </div>
            <div>
              <p>Qty: {quantity}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PackageDetailsCard;

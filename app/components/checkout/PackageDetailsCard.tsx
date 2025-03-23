"use client";

import React from "react";

const PackageDetailsCard = ({ item }: { item: any }) => {
  console.log("item", item);
  const { quantity } = item;
  const { newPrice, oldPrice, description, images } = item?.product;

  return (
    <div>
      <div>
        <section>
          <div className="flex justify-between items-center border-t pb-4 mt-4">
            <img
              alt={images[0]}
              className="h-20 w-20 object-cover rounded ml-3"
              src={images[0]}
            />
            <div className="flex-1 ml-4">
              <h3 className="font-medium">{""}</h3>
              <p className="text-sm text-gray-500">
                {description.length > 100 && description.substring(0, 100)} ...
              </p>
              <p className="text-primary">
                <span className="line-through text-gray-400 mr-2">
                  ৳ {oldPrice}
                </span>
                ৳ {newPrice}
              </p>
            </div>
            <div>
              <p className="text">
                <span className="text-sm text-[#757575]">Qty:</span> {quantity}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PackageDetailsCard;

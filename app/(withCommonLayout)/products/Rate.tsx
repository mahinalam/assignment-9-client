"use client";

import Rate from "rc-rate";
import React from "react";
import "rc-rate/assets/index.css";

const RateComponent = ({
  hasTitle = true,
  value,
  handleRatingFunctionality,
  ratingValue,
}: {
  hasTitle?: boolean;
  value: number;
  handleRatingFunctionality: (value: number | string) => void;
  ratingValue?: number;
}) => {
  return (
    <div>
      <div
        className="flex items-center gap-3"
        onClick={() => handleRatingFunctionality(value)}
      >
        <Rate
          disabled
          allowHalf={false}
          className="text-[#FACA51] text-xl "
          count={5}
          value={value}
        />
        {hasTitle && (
          <div>
            <span
              className={`${ratingValue == value ? "text-gray-500 font-bold" : "text-gray-500"}`}
            >
              And Up
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateComponent;

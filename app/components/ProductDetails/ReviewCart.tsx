import Rate from "rc-rate";
import React from "react";
import "rc-rate/assets/index.css";
import "./ReviewCart.css";
import moment from "moment";
import { LuUser } from "react-icons/lu";

import { IReview } from "@/types";

const ReviewCart = ({
  item,
  className,
}: {
  item: IReview;
  className: string;
}) => {
  const { id, rating, comment, createdAt, images, customerId, customer } = item;

  return (
    <div className="flex gap-3 border-b-[1px] border-border py-7 ">
      <div>
        {customer?.profilePhoto ? (
          <img
            alt="User avatar"
            className="size-[60px] rounded-full"
            src={customer?.profilePhoto}
          />
        ) : (
          <div className="size-[50px] rounded-full flex items-center justify-center bg-gray-200">
            <LuUser size={40} />
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center gap-6">
          <Rate allowHalf={false} className="" count={rating} value={rating} />
          {customerId && (
            <span className="flex items-center gap-[2px]">
              <svg
                className="size-4 text-green-600 bg-white font-semibold md:block hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-green-600 font-bold text-[13px] md:block hidden">
                Verified Purchase
              </span>
            </span>
          )}
        </div>
        <p className="text-[#768088] text-sm">
          {customer?.name}- {moment(createdAt).format("MMM DD, YYYY")}
        </p>
        <p className="pt-3 font-medium text-[15px]">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCart;

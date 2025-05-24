import Rate from "rc-rate";
import React from "react";

import "rc-rate/assets/index.css"; // Ensure you import the styles for rc-rate
import "./ReviewCart.css";
import moment from "moment";

import { IReview } from "@/types";

const ReviewCart = ({
  item,
  className,
}: {
  item: IReview;
  className: string;
}) => {
  console.log("ite,m review", item);
  const {
    id,
    rating,
    comment,
    createdAt,
    images,
    // user: { name },
  } = item;

  return (
    <div className={`${className} `}>
      <div className="flex   items-center">
        <Rate allowHalf={false} className="" count={5} value={rating} />
        <p className="text-[#757575] lg:pl-28 text-[14px] ">
          {moment(createdAt).format("DD MMM YYYY")}
        </p>
      </div>
      <div className="flex  items-center">
        {/* <p className="mt-0"> Sk Z.Verified Purchase</p> */}
        <span className="text-[#808080] text-[14px] md:block hidden">
          {/* {name} */}
        </span>
        <span className="flex items-center ">
          <svg
            className="size-5 text-green-600 bg-white font-semibold md:block hidden"
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
          <span className="text-green-600 font-bold text-[14px] md:block hidden">
            Verified Purchase
          </span>
        </span>
      </div>
      <div>
        <p className="my-3 md:text-base text-[14px]">{comment}</p>
      </div>
      <div>
        <img
          alt="review"
          className="md:size-[100px] size-[60px]"
          src={images?.[0] && images![0]}
        />
      </div>
    </div>
  );
};

export default ReviewCart;

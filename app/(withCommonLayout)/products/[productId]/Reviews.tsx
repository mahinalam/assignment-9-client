"use client";

import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { Select, SelectItem } from "@nextui-org/react";

import RatingProgress from "./AvgRatingComponent";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import GTTextArea from "@/app/components/form/GTTestArea";
import ReviewCart from "@/app/components/ProductDetails/ReviewCart";
import { IReview } from "@/types";
import { useCreatePublicReviewMutation } from "@/app/redux/features/review/reviewApi";
import "rc-rate/assets/index.css";

const Reviews = ({
  reviewsData: productReviews,
  shopId,
  productId,
  productName,
}: any) => {
  const [createReview] = useCreatePublicReviewMutation();
  const [userRating, setUserRating] = useState(1);

  // create review
  const handleCreateReview = async (data: any) => {
    try {
      const reviewsData = {
        rating: Number(userRating),
        comment: data.comment,
        email: data.email,
        name: data.name,
        productId,
        shopId,
      };

      const res = await createReview(reviewsData).unwrap();
    } catch (err: any) {
      toast.error("Failed to add review.");
    }
  };

  const options = [
    {
      key: 1,
      label: "1",
    },
    {
      key: 2,
      label: "2",
    },
    {
      key: 3,
      label: "3",
    },
    {
      key: 4,
      label: "4",
    },
    {
      key: 5,
      label: "5",
    },
  ];

  return (
    <div>
      <RatingProgress
        avgReview={productReviews?.aggregateRating?._avg?.rating}
        productName={productName}
        totalReview={productReviews.result.length}
      />
      {/* <ReviewProgress /> */}
      {productReviews.result.length > 0 ? (
        productReviews.result?.map((review: IReview, index: number) => (
          <ReviewCart
            key={index}
            className="pb-4 border-b-1 border-[#E2E8F0] mt-4"
            item={review}
          />
        ))
      ) : (
        <p className="lg:py-6 py-5 font-semibold lg:text-lg">No reviews yet.</p>
      )}
      {/* add a review section */}
      <div className="lg:w-2/3">
        <p className="font-semibold lg:text-[22px] text-[18px] py-3 lg:py-4">
          Add a review
        </p>
        <p className="lg:font-semibold font-medium lg:text-base text-sm pb-3 lg:pb-4">
          Your email address will not be published. Required fields are marked *
        </p>
        <p className="font-medium lg:text-[13px]  text-xs pb-2 lg:pb-3">
          Your rating *
        </p>
        <div className="py-3">
          {" "}
          <Select
            className="min-w-full sm:min-w-[225px] border-border border-1"
            label="Rating"
            name="rating"
            style={{ background: "transparent" }}
            onChange={(e) => setUserRating(Number(e.target.value))}
          >
            {options.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
        </div>

        {/* review form */}
        <div>
          <GTForm onSubmit={handleCreateReview}>
            <div className="space-y-3">
              <GTTextArea required label="Your review *" name="comment" />
              <GTInput required label="Name *" name="name" type="text" />
              <GTInput required label="Email *" name="email" type="email" />
            </div>

            <Button
              className="my-4 rounded-md bg-primary  font-semibold text-white"
              //   isLoading={createProductLoading}
              size="md"
              type="submit"
            >
              Submit
            </Button>
          </GTForm>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

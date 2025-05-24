"use client";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import GTTextArea from "@/app/components/form/GTTestArea";
import ReviewCart from "@/app/components/ProductDetails/ReviewCart";
import { IReview } from "@/types";
import { Button } from "@nextui-org/button";
import Rate from "rc-rate";
import React, { useState } from "react";
import "./Reviews.css";
import { useCreatePublicReviewMutation } from "@/app/redux/features/review/reviewApi";
import { toast } from "sonner";

const Reviews = ({ reviewsData: productReviews }) => {
  const [createReview] = useCreatePublicReviewMutation();
  const [userRating, setUserRating] = useState(1);

  // create review
  const handleCreateReview = async (data: any) => {
    // setCreateProductLoading(true);
    // setCreateProductLoadingName("Creating product...");
    try {
      const reviewsData = {
        rating: Number(userRating),
        comment: data.comment,
        email: data.email,
        name: data.name,
      };

      const res = await createReview(reviewsData).unwrap();

      if (res?.success) {
        // setCreateProductLoading(false);
        toast.success("Successfully created review!");
        // setCreateProductLoadingName("Create product...");
        // onCreateProductModalChange();
        // router.push("/dashboard/AddProducts");
      }
    } catch (err: any) {
      //   setEditProductLoading(false);
      console.log(err.message);
      toast.error("Failed to add review.");
      //   onCreateProductModalChange();
      //   setCreateProductLoadingName("Create product...");
    }
  };

  //   console.log("from reviews", userRating);
  return (
    <div>
      {productReviews.map((review: IReview) => (
        <ReviewCart
          className="pb-4 border-b-1 border-[#E2E8F0] mt-4"
          item={review}
        />
      ))}
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

        {/* rating */}
        <div className="flex lg:pb-5 pb-4">
          <div
            onClick={() => setUserRating(1)}
            className="lg:pr-5 pr-4 border-r-1 "
          >
            <Rate
              style={{ color: "#E21B70" }}
              allowHalf={false}
              className="pr-4 !text-gray-400 cursor-pointer"
              count={1}
              value={1}
              disabled
            />
          </div>

          <div onClick={() => setUserRating(2)} className="lg:pr-8 pr-6 ">
            <Rate
              style={{ color: "#E21B70" }}
              allowHalf={false}
              className="pr-4 cursor-pointer"
              count={2}
              value={2}
              disabled
            />
          </div>

          <div onClick={() => setUserRating(3)} className="lg:pr-8 pr-6 ">
            <Rate
              style={{ color: "#E21B70" }}
              allowHalf={false}
              className="pr-4 cursor-pointer"
              count={3}
              value={3}
              disabled
            />
          </div>
          <div onClick={() => setUserRating(4)} className="lg:pr-8 pr-6 ">
            <Rate
              style={{ color: "#E21B70" }}
              allowHalf={false}
              className="pr-4 cursor-pointer"
              count={4}
              value={4}
              disabled
            />
          </div>
          <div onClick={() => setUserRating(5)} className="lg:pr-8 pr-6">
            <Rate
              style={{ color: "#E21B70" }}
              allowHalf={false}
              className="pr-4 cursor-pointer"
              count={5}
              value={5}
              disabled
            />
          </div>
        </div>

        {/* review form */}
        <div>
          <GTForm onSubmit={handleCreateReview}>
            <div className="space-y-3">
              <GTTextArea required label="Your review *" name="review" />
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
              {/* {createProductLoadingName} */}
            </Button>
          </GTForm>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

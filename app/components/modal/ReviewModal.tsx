import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Rate from "rc-rate";
import React from "react";
import ReviewCartForSmallScreen from "../ProductDetails/ReviewCartForSmallScreen";

const ReviewModal = ({
  reviewsData,
  isOpen,
  onOpenChange,
  reviews,
}: {
  reviewsData: any;
  isOpen: any;
  onOpenChange: any;
  reviews: any;
}) => {
  console.log("reviews from modal", reviewsData);
  return (
    <>
      <Modal isOpen={isOpen} size="full" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                product-reviews
              </ModalHeader> */}
              <ModalBody>
                <p className="border-b-[1px] border-b-[#D5D5D5] pb-4">
                  product-reviews
                </p>
                {/* for average rate demonstration */}
                <div className="flex items-center justify-between p-3 bg-[#F8F8F8] rounded-xl border-b-[1px] border-b-[#D5D5D5] ">
                  <div className="flex items-end gap-0.5">
                    <p className="text-[26px] font-bold">4.4</p>
                    <Rate
                      allowHalf={false}
                      className="text-[#FACA51] text-xl "
                      count={5}
                      value={5}
                    />
                  </div>
                  {/* total reviews count */}
                  <p className="text-xs text-subTitle">80 reviews</p>
                </div>

                {/* reviews section */}
                <div>
                  {reviews?.map((review: any) => (
                    <ReviewCartForSmallScreen reviewData={review} />
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;

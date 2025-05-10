"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useGetAllOrderHistoryQuery,
  useGetVendorOrderHistoryQuery,
} from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { ICoupon, IOrder, IReview } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { CgProfile } from "react-icons/cg";
import moment from "moment";
import { useGetAllCouponsQuery } from "@/app/redux/features/coupon/couponApi";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from "@/app/redux/features/review/reviewApi";
import { toast } from "sonner";

const AllReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const [isOpen, setIsOpen] = useState(false);

  //   console.log(vendorId);

  const { data: allReviews, isLoading: allReviewsLoading } =
    useGetAllReviewsQuery(undefined);

  const [deleteReview] = useDeleteReviewMutation();
  console.log("all allReviews", allReviews);

  //   console.log("order history from admin", allOrders);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (allReviewsLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  // console.log(vendorOrderHistory);
  const handleDeleteReview = async () => {
    if (deleteModalId) {
      const { data } = await deleteReview(deleteModalId);
      if (data?.success) {
        toast.success("Review deleted successfully.");
      } else {
        toast.error("Failed to delete review");
      }
      onDeleteModalChange(); //   }
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    // console.log("id", id);
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  console.log("delete modal id", deleteModalId);
  return (
    <>
      <SidebarButton
        title={"Reviews"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="admin"
      />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>USER </TableColumn>
          <TableColumn>RATING</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {allReviews?.data?.map((review: IReview) => (
            <TableRow key={review.id}>
              <TableCell>
                <div className="flex  gap-2">
                  <div>
                    <img
                      src={review?.product?.images?.[0]}
                      alt=""
                      className="size-[40px]"
                    />
                  </div>
                  <div>
                    <p>{review?.product?.name}</p>
                    <p>{review?.product?.category?.name}</p>
                  </div>
                  {/* <p className="mr-12 lg:mr-0">{order.name}</p> */}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex  gap-2">
                  <div>
                    {review?.user?.profilePhoto ? (
                      // TODO: fixed customerProfilePhoto pronoun
                      <img
                        src={review?.user?.profilePhoto}
                        alt=""
                        className="size-[40px]"
                      />
                    ) : (
                      <CgProfile size={40} />
                    )}
                  </div>
                  <div>
                    <p>{review?.user?.name}</p>
                    <p>{review?.user?.email}</p>
                  </div>
                  {/* <p className="mr-12 lg:mr-0">{order.name}</p> */}
                </div>
              </TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>
                <Tooltip content="Delete review" color="danger">
                  <span
                    onClick={() => handleDeleteModalOpen(review?.id)}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteModal
        handleDeleteProduct={handleDeleteReview}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
        title="Review"
      />
    </>
  );
};

export default AllReviews;

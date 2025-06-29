"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { FiUser } from "react-icons/fi";

import ReviewsLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from "@/app/redux/features/review/reviewApi";
import EmptyState from "@/app/components/dashboard/EmptyState";

const AllReviews = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [page, setPage] = useState(1);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const [isOpen, setIsOpen] = useState(false);

  //   console.log(vendorId);

  const { data: allReviews, isLoading: allReviewsLoading } =
    useGetAllReviewsQuery(params);

  const [deleteReview] = useDeleteReviewMutation();

  //   console.log("order history from admin", allOrders);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (allReviewsLoading) {
    return (
      <div>
        <ReviewsLoading />
      </div>
    );
  }

  const totalReviews = allReviews?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalReviews / 5);
  // pagination handler
  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 },
    );
    setParams(queryParams);
  };

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

  return (
    <>
      <SidebarButton
        className={"mb-5"}
        hasLeftButton={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"All Reviews"}
        userRole="admin"
      />
      {allReviews?.data?.data?.length > 0 ? (
        <>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>PRODUCT</TableColumn>
              <TableColumn>USER </TableColumn>
              <TableColumn>RATING</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>

            <TableBody>
              {allReviews?.data?.data?.map((review: any) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex  gap-2">
                      <div>
                        <img
                          alt=""
                          className="size-[40px]"
                          src={review?.product?.images?.[0]}
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
                        {review?.customer?.profilePhoto ? (
                          // TODO: fixed customerProfilePhoto pronoun
                          <img
                            alt=""
                            className="size-[40px]"
                            src={review?.customer?.profilePhoto}
                          />
                        ) : (
                          <FiUser size={40} />
                        )}
                      </div>
                      <div>
                        <p>{review?.customer?.name}</p>
                        <p>{review?.customer?.email}</p>
                      </div>
                      {/* <p className="mr-12 lg:mr-0">{order.name}</p> */}
                    </div>
                  </TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>
                    <Tooltip color="danger" content="Delete review">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => handleDeleteModalOpen(review?.id)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex  justify-center mt-8">
            <Pagination
              showControls
              page={page}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <EmptyState label="Go Home" message="No reviews yet!" />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteReview}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this review?"
        title="Delete review"
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default AllReviews;

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

import DeleteModal from "@/app/components/modal/DeleteModal";

import { TQueryParam } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { LuUser } from "react-icons/lu";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from "@/app/redux/features/review/reviewApi";
import { toast } from "sonner";
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

  const totalReviews = allReviews?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalReviews / 5);
  // pagination handler
  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];
    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
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

  console.log("all reviews", allReviews);
  return (
    <>
      {allReviews?.data?.data?.length > 0 ? (
        <>
          {" "}
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
              {allReviews?.data?.data?.map((review: any) => (
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
                        {review?.customer?.profilePhoto ? (
                          // TODO: fixed customerProfilePhoto pronoun
                          <img
                            src={review?.customer?.profilePhoto}
                            alt=""
                            className="size-[40px]"
                          />
                        ) : (
                          <CgProfile size={40} />
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
          <div className="flex  justify-center mt-8">
            <Pagination
              page={page}
              total={totalPages}
              onChange={handlePageChange}
              showControls
            />
          </div>
        </>
      ) : (
        <>
          <EmptyState message="No reviews yet!" label="Go Home" />
        </>
      )}
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

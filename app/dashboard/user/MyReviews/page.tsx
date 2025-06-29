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

import Loading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteReviewMutation,
  useGetAllUsersReviewQuery,
} from "@/app/redux/features/review/reviewApi";
import { TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import EmptyState from "@/app/components/dashboard/EmptyState";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const {
    data: userReviews,
    isLoading: userReviewsLoading,
    isFetching,
  } = useGetAllUsersReviewQuery(params);

  const [deleteReview] = useDeleteReviewMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  if (userReviewsLoading || isFetching) {
    return <Loading />;
  }

  const totalReviews = userReviews?.data?.meta?.total || 0;
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

  //   console.log(isSuccess);
  const handleDeleteProduct = async () => {
    try {
      if (deleteModalId) {
        const res = await deleteReview(deleteModalId);

        if (res?.data?.success) {
          toast.success("Successfully deleted review!");
        }
        onDeleteModalChange(); //   }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  return (
    <>
      <SidebarButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="My Reviews"
        userRole="user"
      />
      {userReviews?.data?.data?.length > 0 ? (
        <>
          {" "}
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>PRODUCT</TableColumn>
              <TableColumn>REVIEW </TableColumn>
              <TableColumn>RATING </TableColumn>
              <TableColumn>CREATED DATE </TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {userReviews?.data?.data?.map((review: any) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        alt=""
                        className="size-[40px]"
                        src={review?.product?.images[0]}
                      />
                      <p className="mr-12 lg:mr-0">
                        {review?.product?.name.length > 15
                          ? review?.product?.name.slice(0, 20) + "..."
                          : review?.product?.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <div className="flex items-center gap-2">
                      <img
                        alt=""
                        className="size-[40px]"
                        src={review?.images[0]}
                      />
                      <p className="mr-12 lg:mr-0">
                        {review?.comment?.length > 15
                          ? review.comment.slice(0, 15) + "..."
                          : review.comment}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Tooltip color="danger" content="Delete review">
                        <span
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                          onClick={() => handleDeleteModalOpen(review?.id)}
                        >
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </div>
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
          <EmptyState
            address="/products"
            label="Browse Products"
            message="Reviews found empty."
          />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this review?"
        title="Delete Review"
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default ProductReviews;

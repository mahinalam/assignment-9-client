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

import ReviewsLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteReviewMutation,
  useGetVendorProductReviewsQuery,
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
    data: vendorProductsReviews,
    isLoading: vendorProductsReviewsLoading,
    isFetching,
  } = useGetVendorProductReviewsQuery(params);

  const [deleteReview] = useDeleteReviewMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  if (vendorProductsReviewsLoading || isFetching) {
    return (
      <div>
        <ReviewsLoading />
      </div>
    );
  }

  const totalReviews = vendorProductsReviews?.data?.meta?.total || 0;
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

  const handleDeleteProduct = async () => {
    try {
      if (deleteModalId) {
        const res = await deleteReview(deleteModalId);

        if (res?.data?.success) {
          toast.success("Review deleted successfully!");
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
      <div className="mb-5">
        {" "}
        <SidebarButton
          hasLeftButton={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Product Reviews"}
          userRole="vendor"
        />
      </div>
      {vendorProductsReviews?.data?.data?.length > 0 ? (
        <>
          {" "}
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>PRODUCT</TableColumn>
              <TableColumn>USER</TableColumn>
              <TableColumn>RATING </TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {vendorProductsReviews?.data?.data?.map((review: any) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        alt=""
                        className="size-12"
                        src={review?.product?.images[0]}
                      />
                      <p className="mr-12 lg:mr-0">{review.product?.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{review?.email}</TableCell>
                  <TableCell>{review?.rating}</TableCell>
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
              initialPage={params?.[0].value as number}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          {" "}
          <EmptyState
            address="/"
            label="Go Home"
            message="Reviews found empty!"
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

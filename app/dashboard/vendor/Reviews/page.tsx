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
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteReviewMutation,
  useGetVendorProductReviewsQuery,
} from "@/app/redux/features/review/reviewApi";
import { RootState } from "@/app/redux/store";
import { TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import { toast } from "sonner";
import ReviewsLoading from "./Loading";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const vendorId = useSelector((state: RootState) => state.auth.user?.userId);
  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);

  console.log("vendor", vendorId);
  const {
    data: vendorProductsReviews,
    isLoading: vendorProductsReviewsLoading,
    isFetching,
  } = useGetVendorProductReviewsQuery(params);

  const [deleteReview] = useDeleteReviewMutation();

  console.log("vendorProductsReviews", vendorProductsReviews);

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
      { name: "limit", value: 5 }
    );
    setParams(queryParams);
  };

  //   console.log(isSuccess);
  const handleDeleteProduct = async () => {
    try {
      if (deleteModalId) {
        const res = await deleteReview(deleteModalId);
        console.log("res", res);
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
    // console.log("id", id);
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  return (
    <>
      <SidebarButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="vendor"
        title="Reviews"
      />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>RATING </TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {vendorProductsReviews?.data?.data?.map((review: any) => (
            <TableRow key={review.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={review?.product?.images[0]}
                    alt=""
                    className="size-12"
                  />
                  <p className="mr-12 lg:mr-0">{review.product?.name}</p>
                </div>
              </TableCell>
              <TableCell>{review?.customer.email}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Tooltip content="Delete review" color="danger">
                    <span
                      onClick={() => handleDeleteModalOpen(review?.id)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
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
          page={page}
          total={totalPages}
          onChange={handlePageChange}
          showControls
        />
      </div>
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
        title="Review"
      />
    </>
  );
};

export default ProductReviews;

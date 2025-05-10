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
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { useGetVendorProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
import { RootState } from "@/app/redux/store";
import { IProduct, IReview } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import Loader from "@/app/components/sharred/Loader";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const vendorId = useSelector((state: RootState) => state.auth.user?.userId);

  console.log("vendor", vendorId);
  const {
    data: vendorProductsReviews,
    isLoading: vendorProductsReviewsLoading,
  } = useGetVendorProductReviewsQuery(vendorId as string);

  const [deleteProduct] = useDeleteProductMutation();

  console.log("vendorProductsReviews", vendorProductsReviews);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (vendorProductsReviewsLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  //   console.log(isSuccess);
  const handleDeleteProduct = () => {
    if (deleteModalId) {
      deleteProduct(deleteModalId);
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
          {vendorProductsReviews?.data?.products?.map((product: IProduct) =>
            product.review.map((review: IReview) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={product?.images[0]}
                      alt=""
                      className="size-[40px]"
                    />
                    <p className="mr-12 lg:mr-0">{product.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {" "}
                  <div className="flex items-center gap-2">
                    <img
                      src={review?.user?.profilePhoto}
                      alt=""
                      className="size-[40px]"
                    />
                    <div>
                      <p className="mr-12 lg:mr-0">{review?.user?.name}</p>
                      <p className="mr-12 lg:mr-0">{review?.user?.email}</p>
                    </div>
                  </div>
                </TableCell>
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
            ))
          )}
        </TableBody>
      </Table>
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default ProductReviews;

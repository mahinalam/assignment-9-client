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
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { useGetVendorProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
import { RootState } from "@/app/redux/store";
import { IProduct, IReview } from "@/types";

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
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (vendorProductsReviewsLoading) {
    return <div>Loading...</div>;
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
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>PRODUCT NAME</TableColumn>
          <TableColumn>REVIEWER NAME</TableColumn>
          <TableColumn>RATING </TableColumn>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>COMMENT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {vendorProductsReviews?.data?.products?.map((product: IProduct) =>
            product.review.map((review: IReview) => (
              <TableRow key={review.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{review.user.name}</TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>
                  <img
                    alt="Product"
                    className="size-12"
                    src={product.images[0]}
                  />
                </TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteModalOpen(review.id)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleDeleteModalOpen(review.id)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            )),
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

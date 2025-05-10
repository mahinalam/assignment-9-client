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
import { useGetUserProductReviewQuery } from "@/app/redux/features/review/reviewApi";
import { RootState } from "@/app/redux/store";
import SidebarButton from "../SidebarButton";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  console.log("vendor", userId);
  const { data: userProductReviews, isLoading: userProductReviewLoading } =
    useGetUserProductReviewQuery(userId as string);

  const [deleteProduct] = useDeleteProductMutation();
  const [isOpen, setIsOpen] = useState(false);

  console.log("userProductReviews", userProductReviews);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (userProductReviewLoading) {
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
      <SidebarButton
        title={"All Products"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="user"
      />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>PRODUCT IMAGE</TableColumn>
          <TableColumn>PRODUCT NAME</TableColumn>
          <TableColumn>REVIEW IMAGE</TableColumn>
          <TableColumn>RATING </TableColumn>
          <TableColumn>COMMENT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {userProductReviews?.data?.map(
            (review: any) => (
              // review.map((review: IReview) => (
              <TableRow key={review.id}>
                <TableCell>
                  <img
                    alt=""
                    className="size-12"
                    src={review?.product.images[0]}
                  />
                </TableCell>
                <TableCell>{review.product.name}</TableCell>
                <TableCell>
                  <img alt="" className="size-12" src={review?.images[0]} />
                </TableCell>
                <TableCell>{review.rating}</TableCell>
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
            )
            // ))
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

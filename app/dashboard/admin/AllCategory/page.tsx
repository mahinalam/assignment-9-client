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
import moment from "moment";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  console.log("vendor", userId);
  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetAllCategoriesQuery(null);

  const [deleteProduct] = useDeleteProductMutation();

  //   console.log("userProductReviews", userProductReviews);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (categoryDataLoading) {
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
          <TableColumn> IMAGE</TableColumn>
          <TableColumn> NAME</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {categoryData?.data?.map(
            (review: any) => (
              // review.map((review: IReview) => (
              <TableRow key={review.id}>
                <TableCell>
                  <img alt="" className="size-12" src={review?.imageUrl} />
                </TableCell>
                <TableCell>{review.name}</TableCell>
                <TableCell>
                  {" "}
                  {moment(review.createdAt).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteModalOpen(review.id)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleDeleteModalOpen(review.id)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ),
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

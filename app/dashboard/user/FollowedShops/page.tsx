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
import React from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const { data: currentUserInfo } = useGetSingleUserQuery(userId);

  console.log("currentUserInfo", currentUserInfo);
  //   const { data: userProductReviews, isLoading: userProductReviewLoading } =
  //     useGetUserProductReviewQuery(userId as string);

  const [deleteProduct] = useDeleteProductMutation();

  //   console.log("userProductReviews", userProductReviews);
  //   const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  //   if (userProductReviewLoading) {
  //     return <div>Loading...</div>;
  //   }
  //   console.log(isSuccess);
  // const handleDeleteProduct = () => {
  //   if (deleteModalId) {
  //     deleteProduct(deleteModalId);
  //     onDeleteModalChange(); //   }
  //   }
  // };
  // const handleDeleteModalOpen = (id: string) => {
  //   // console.log("id", id);
  //   setDeleteModalId(id);
  //   onDeleteModalOpen();
  // };

  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>CREATED YEAR </TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {currentUserInfo?.data?.followingShop?.map(
            (shop: any) => (
              // review.map((review: IReview) => (
              <TableRow key={shop.id}>
                <TableCell>{shop?.shop?.name}</TableCell>
                <TableCell>{shop.shop.address}</TableCell>
                <TableCell>{shop.shop.description}</TableCell>
                <TableCell>{shop.shop.createdAt}</TableCell>
                <TableCell>
                  <Button>UNFOLLOW</Button>
                </TableCell>
              </TableRow>
            )
            // ))
          )}
        </TableBody>
      </Table>
      {/* <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
      /> */}
    </>
  );
};

export default ProductReviews;

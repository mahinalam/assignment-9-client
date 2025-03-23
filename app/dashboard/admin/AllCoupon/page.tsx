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
import { useGetAllCouponsQuery } from "@/app/redux/features/coupon/couponApi";

const CouponPage = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: couponData, isLoading: couponLoading } =
    useGetAllCouponsQuery(null);

  const [deleteProduct] = useDeleteProductMutation();

  //   console.log("userProductReviews", userProductReviews);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (couponLoading) {
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
          <TableColumn> CODE</TableColumn>
          <TableColumn> TYPE</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>EXPIRATION DATE</TableColumn>
          <TableColumn>MIN. PURCHASE</TableColumn>
          <TableColumn>USAGE COUNT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {couponData?.data?.map(
            (coupon: any) => (
              // coupon.map((coupon: Icoupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.type}</TableCell>
                <TableCell>
                  {moment(coupon.createdAt).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  {moment(coupon.expiration).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>{coupon.minPurchase}</TableCell>
                <TableCell>{coupon.usageCount}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteModalOpen(coupon.id)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleDeleteModalOpen(coupon.id)}>
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

export default CouponPage;

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
import moment from "moment";
import { GoPlus } from "react-icons/go";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { useGetAllCouponsQuery } from "@/app/redux/features/coupon/couponApi";

const CouponPage = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();
  const { data: couponData, isLoading: couponLoading } =
    useGetAllCouponsQuery(null);
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (couponLoading) {
    return <div>Loading...</div>;
  }
  const handleDeleteProduct = () => {
    if (deleteModalId) {
      deleteProduct(deleteModalId);
      onDeleteModalChange(); //   }
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <button className="flex bg-primary text-sm items-center gap-1 rounded-md text-white px-4 py-2">
          <span>Create New</span>
          <span>
            <GoPlus size={20} />
          </span>
        </button>
      </div>
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
          {couponData?.data?.map((coupon: any) => (
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
          ))}
        </TableBody>
      </Table>
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this coupon?"
        title="Delete coupon"
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default CouponPage;

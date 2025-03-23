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
import { useGetVendorOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { IOrder } from "@/types";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const vendorId = useSelector((state: RootState) => state.auth.user?.userId);

  console.log(vendorId);

  const { data: vendorOrderHistory, isLoading: vendorOrderHistoryLoading } =
    useGetVendorOrderHistoryQuery(vendorId as string);

  const [deleteProduct] = useDeleteProductMutation();

  console.log({ vendorOrderHistory });
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (vendorOrderHistoryLoading) {
    return <div>Loading...</div>;
  }
  console.log(vendorOrderHistory);
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
          <TableColumn>USER EMAIL</TableColumn>
          <TableColumn>TRANSACTION ID</TableColumn>
          <TableColumn>PAYMENT STATUS </TableColumn>
          <TableColumn>SHIPPING ADDRESS</TableColumn>
          <TableColumn>ORDER ITEMS</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {vendorOrderHistory?.data?.map((order: IOrder) => (
            <TableRow key={order.id}>
              <TableCell>{order.user.email}</TableCell>
              <TableCell>{order.transactionId}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>{order.customerShippingAddress}</TableCell>
              <TableCell>{order.orderItems.length}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteModalOpen(order.id)}>
                  Delete
                </Button>
                <Button onClick={() => handleDeleteModalOpen(order.id)}>
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
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default ProductReviews;

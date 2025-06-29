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
import { useGetUsersOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { IOrder } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";

const UsersOrderHistory = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const { data: usersOrderHistory, isLoading: userOrderHistoryLoading } =
    useGetUsersOrderHistoryQuery(userId as string);

  const [deleteProduct] = useDeleteProductMutation();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (userOrderHistoryLoading) {
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
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  return (
    <>
      <div className="mb-5">
        <SidebarButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"My Wishlist"}
          userRole="user"
        />
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>TRANSACTION ID</TableColumn>
          <TableColumn>PAYMENT STATUS </TableColumn>
          <TableColumn>SHIPPING ADDRESS</TableColumn>
          <TableColumn>ORDER ITEMS</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {usersOrderHistory?.data?.data?.map((order: IOrder) => {
            order.orderItem?.map(() => (
              <TableRow key={order.id}>
                <TableCell>{order.transactionId}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.customerShippingAddress}</TableCell>
                <TableCell>{order.orderItem.length}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteModalOpen(order.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this order?"
        title="Delete order"
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default UsersOrderHistory;

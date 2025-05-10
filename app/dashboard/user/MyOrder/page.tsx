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
  Pagination,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useGetUsersOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { IOrder, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";

const UsersOrderHistory = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const [isOpen, setIsOpen] = useState(false);
  console.log("vendor", userId);
  const { data: usersOrderHistory, isLoading: userOrderHistoryLoading } =
    useGetUsersOrderHistoryQuery(userId as string);

  const totalOrders = usersOrderHistory?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalOrders / 10);
  const [deleteProduct] = useDeleteProductMutation();

  console.log("usersOrderHistory", usersOrderHistory);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<string | number>(1);

  let queryParams: TQueryParam[] = [];

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const updatedQueryParams = queryParams.filter(
      (param) => param.name !== "page"
    );

    updatedQueryParams.push({ name: "page", value: page });
    setParams(updatedQueryParams);
  };

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
      <SidebarButton
        title={"My Orders"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="user"
      />
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
          {usersOrderHistory?.data?.data?.length > 0 &&
            usersOrderHistory?.data?.data?.map((order: IOrder) => (
              <TableRow key={order.id}>
                <TableCell>{order.transactionId}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.customerShippingAddress}</TableCell>
                <TableCell>{order.orderItems.length}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  <Button
                    className="bg-red-500 text-white"
                    size="sm"
                    onClick={() => handleDeleteModalOpen(order.id)}
                  >
                    Delete
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
      <div className="flex justify-center lg:mt-8 mt-5">
        <Pagination
          initialPage={currentPage as number}
          total={totalPages} // You should have this in your API response
          onChange={handlePageChange}
          showControls
          // renderItem={generatePageNumbers}
        />
      </div>
    </>
  );
};

export default UsersOrderHistory;

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
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteUsersOrderMutation,
  useGetUsersOrderHistoryQuery,
} from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { IOrder, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import OrdersLoading from "./Loading";

const UsersOrderHistory = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const [isOpen, setIsOpen] = useState(false);
  console.log("vendor", userId);
  const { data: usersOrderHistory, isLoading: userOrderHistoryLoading } =
    useGetUsersOrderHistoryQuery(params);

  const totalOrders = usersOrderHistory?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalOrders / 5);
  const [deleteOrder] = useDeleteUsersOrderMutation();

  console.log("usersOrderHistory", usersOrderHistory);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  // let queryParams: TQueryParam[] = [];
  const handlePageChange = (page: number) => {
    console.log("page value", page);
    const queryParams: TQueryParam[] = [];
    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setParams(queryParams);
  };

  if (userOrderHistoryLoading) {
    return <OrdersLoading />;
  }
  //   console.log(isSuccess);
  const handleDeleteProduct = () => {
    if (deleteModalId) {
      deleteOrder(deleteModalId);
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
        className="mb-4"
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
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{order.orderItem.length}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  <Tooltip content="Delete order" color="danger">
                    <span
                      onClick={() =>
                        handleDeleteModalOpen(order?.orderItem[0].id)
                      }
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
        title="Order"
      />
      <div className="flex justify-center lg:mt-8 mt-5">
        <Pagination
          page={page}
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

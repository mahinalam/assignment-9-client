"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import moment from "moment";

import OrdersLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteUsersOrderMutation,
  useGetUsersOrderHistoryQuery,
} from "@/app/redux/features/order/orderApi";
import { IOrder, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import EmptyState from "@/app/components/dashboard/EmptyState";

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

  const [isOpen, setIsOpen] = useState(false);
  const {
    data: usersOrderHistory,
    isLoading: userOrderHistoryLoading,
    isFetching,
  } = useGetUsersOrderHistoryQuery(params);

  const totalOrders = usersOrderHistory?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalOrders / 5);
  const [deleteOrder] = useDeleteUsersOrderMutation();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 },
    );
    setParams(queryParams);
  };

  if (userOrderHistoryLoading || isFetching) {
    return <OrdersLoading />;
  }
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
        className="mb-4"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"My Orders"}
        userRole="user"
      />
      {usersOrderHistory?.data?.data?.length > 0 ? (
        <>
          {" "}
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>TRANSACTION ID</TableColumn>
              <TableColumn>PAYMENT STATUS </TableColumn>
              <TableColumn>ORDER DATE</TableColumn>
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
                    <TableCell>
                      {moment(order.createdAt).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell>{order.orderItem.length}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>
                      <Tooltip color="danger" content="Delete order">
                        <span
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                          onClick={() =>
                            handleDeleteModalOpen(order?.orderItem[0].id)
                          }
                        >
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className="flex justify-center lg:mt-8 mt-5">
            <Pagination
              showControls
              initialPage={params?.[0].value as number}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <EmptyState
            address="/products"
            label="Browse Products"
            message="Orders found empty."
          />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this order?"
        title="Delete Order"
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default UsersOrderHistory;

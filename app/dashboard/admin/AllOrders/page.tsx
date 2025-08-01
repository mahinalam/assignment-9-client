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
} from "@nextui-org/react";
import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import moment from "moment";

import OrdersLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useGetAllOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { IOrder, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import EmptyState from "@/app/components/dashboard/EmptyState";

const ProductReviews = () => {
  const { isOpen: isDeleteModalOpen, onOpenChange: onDeleteModalChange } =
    useDisclosure();

  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: allOrders,
    isLoading: allOrdersLoading,
    isFetching,
  } = useGetAllOrderHistoryQuery(params);

  const [deleteProduct] = useDeleteProductMutation();

  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (allOrdersLoading || isFetching) {
    return (
      <div>
        <OrdersLoading />
      </div>
    );
  }
  const handleDeleteProduct = () => {
    if (deleteModalId) {
      deleteProduct(deleteModalId);
      onDeleteModalChange();
    }
  };

  const totalOrders = allOrders?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalOrders / 5);

  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 },
    );
    setParams(queryParams);
  };

  return (
    <>
      <SidebarButton
        className="mt-8"
        hasLeftButton={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"All Orders"}
        userRole="admin"
      />
      {allOrders?.data?.data?.length > 0 ? (
        <>
          {" "}
          <Table aria-label="Example static collection table" className="mt-4">
            <TableHeader>
              <TableColumn>USER</TableColumn>
              <TableColumn>TOTAL PRICE </TableColumn>
              <TableColumn>TRANSACTION ID</TableColumn>
              <TableColumn>SHIPPING ADDRESS</TableColumn>
              <TableColumn>ORDER ITEMS</TableColumn>
              <TableColumn>ORDER DATE</TableColumn>
            </TableHeader>

            <TableBody>
              {allOrders?.data?.data?.map((order: IOrder) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex  gap-2">
                      <div>
                        {order?.profilePhoto ? (
                          // TODO: fixed customerProfilePhoto pronoun
                          <img
                            alt=""
                            className="size-[40px]"
                            src={order.profilePhoto}
                          />
                        ) : (
                          <LuUser size={40} />
                        )}
                      </div>
                      <div>
                        <p>{order?.customerName}</p>
                        <p>{order?.customerEmail}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order?.totalPrice}</TableCell>
                  <TableCell>{order?.transactionId}</TableCell>
                  <TableCell>{order?.customerShippingAddress}</TableCell>
                  <TableCell>{order?.orderItem?.length}</TableCell>
                  <TableCell>
                    {moment(order?.createdAt).format("DD MMM YYYY")}~
                    {moment(order?.createdAt).format("HH:mm:ss")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex  justify-center mt-8">
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
          {" "}
          <EmptyState
            address="/"
            label="Go Home"
            message="Orders found empty!"
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

export default ProductReviews;

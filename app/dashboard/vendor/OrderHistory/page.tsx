"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import React, { useState } from "react";
import moment from "moment";

import OrdersLoading from "./Loading";

import { useGetVendorOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import { IOrder, TQueryParam } from "@/types";
import EmptyState from "@/app/components/dashboard/EmptyState";

const VendorOrderHistory = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [page, setPage] = useState(1);

  const {
    data: vendorOrderHistory,
    isLoading: vendorOrderHistoryLoading,
    isFetching,
  } = useGetVendorOrderHistoryQuery(params);

  if (vendorOrderHistoryLoading || isFetching) {
    return (
      <div>
        <OrdersLoading />
      </div>
    );
  }

  const totalOrders = vendorOrderHistory?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalOrders / 5);
  // pagination handler
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
      {vendorOrderHistory?.data?.data?.shop?.order?.length > 0 ? (
        <>
          {" "}
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>TRANSACTION ID</TableColumn>
              <TableColumn>PAYMENT STATUS </TableColumn>
              <TableColumn>ORDER DATE</TableColumn>
              <TableColumn>ORDER ITEMS</TableColumn>
              <TableColumn>TOTAL PRICE</TableColumn>
            </TableHeader>

            <TableBody>
              {vendorOrderHistory?.data?.data?.shop?.order?.map(
                (order: IOrder) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.transactionId}</TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                    <TableCell>
                      {moment(order.createdAt).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell>{order.orderItem.length}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
          <div className="flex  justify-center mt-8">
            <Pagination
              showControls
              page={page}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <EmptyState
            address="/"
            label="Go Home"
            message="Orders found empty!"
          />
        </>
      )}
    </>
  );
};

export default VendorOrderHistory;

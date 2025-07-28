"use client";

import React, { useState } from "react";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import Loading from "../../vendor/Overview/Loading";

import { useGetAdminStatsQuery } from "@/app/redux/features/user/userApi";
import { IOrder, TQueryParam } from "@/types";
import { useGetAllOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import SidebarButton from "@/app/components/dashboard/SidebarButton";

const AdminOverviewPage = () => {
  const [allProductParams, setAllProductParams] = useState<
    TQueryParam[] | undefined
  >([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const { data: adminStats, isLoading: adminStatsLoading } =
    useGetAdminStatsQuery(undefined);

  const {
    data: allOrders,
    isLoading,
    isFetching,
  } = useGetAllOrderHistoryQuery(allProductParams);

  const [isOpen, setIsOpen] = useState(false);

  if (adminStatsLoading || isLoading || isFetching) {
    return <Loading />;
  }

  console.log({ allOrders });
  const totalOrders = allOrders?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalOrders / 5);
  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 },
    );
    setAllProductParams(queryParams);
  };

  return (
    <div className="">
      <SidebarButton
        className="mb-5"
        hasLeftButton={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Overview"}
        userRole="user"
      />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <div className="flex items-center justify-between bg-[#DBEAFE] font-bold px-3 py-5 gap-4 rounded-xl">
          <section>
            <div className="text-xl">
              <p>Total Products</p>
              <p>0</p>
            </div>
          </section>
          <section>
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </section>
        </div>
        <div className="flex items-center justify-between bg-[#FEE2E2] font-bold px-3 py-5 gap-4 rounded-xl">
          <section>
            <div className="text-xl">
              <p>Total Orders</p>
              <p>0</p>
            </div>
          </section>
          <section>
            <svg
              className="size-8 font-bold"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </section>
        </div>
        <div className="flex items-center justify-between bg-[#DCFCE7] font-bold px-3 py-5 gap-4 rounded-xl">
          <section>
            <div className="text-xl">
              <p>Total Payments</p>
              <p>0</p>
            </div>
          </section>
          <section>
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </section>
        </div>
        <div className="flex items-center justify-between bg-[#FEF9C3] font-bold px-3 py-5 gap-4 rounded-xl">
          <section>
            <div className="text-xl">
              <p>Total Categories</p>
              <p>0</p>
            </div>
          </section>
          <section>
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </section>
        </div>
        <div className="flex items-center justify-between bg-[#DBEAFE] font-bold px-3 py-5 gap-4 rounded-xl">
          <section>
            <div className="text-xl">
              <p>Total Shops</p>
              <p>0</p>
            </div>
          </section>
          <section>
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </section>
        </div>
      </div>
      <div className="w-full">
        <p className="font-bold text-2xl mt-8 ">Recent Orders</p>
        <Table aria-label="Example static collection table" className="mt-4">
          <TableHeader>
            <TableColumn>PRODUCT</TableColumn>
            <TableColumn>USER EMAIL</TableColumn>
            <TableColumn>TRANSACTION ID</TableColumn>
            <TableColumn>PAYMENT STATUS </TableColumn>
            <TableColumn>ORDER ITEMS</TableColumn>
            <TableColumn>TOTAL PRICE</TableColumn>
          </TableHeader>

          <TableBody>
            {allOrders?.data?.data?.map((order: IOrder) =>
              order?.orderItem?.map((item) => (
                <TableRow key={order.id}>
                  <TableCell className="">
                    <div className="flex items-center gap-1">
                      <img
                        alt=""
                        className="size-12"
                        src={item?.product?.images[0]}
                      />
                      <p>{item?.product?.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order?.customerEmail}</TableCell>
                  <TableCell>{order?.transactionId}</TableCell>
                  <TableCell>{order?.paymentStatus}</TableCell>
                  <TableCell>{order?.orderItem.length}</TableCell>
                  <TableCell>{order?.totalPrice}</TableCell>
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
        <div className="flex  justify-center mt-8">
          <Pagination
            showControls
            initialPage={allProductParams?.[0].value as number}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;

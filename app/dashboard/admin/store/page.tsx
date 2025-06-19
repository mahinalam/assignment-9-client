"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import React, { useState } from "react";
import moment from "moment";
import { toast } from "sonner";
import { LuUser } from "react-icons/lu";
import { MdBlock } from "react-icons/md";

import StoresLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { IShop, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import {
  useBlockShopMutation,
  useGetAllShopsQuery,
} from "@/app/redux/features/shop/shopApi";

import "./Store.css";
import EmptyState from "@/app/components/dashboard/EmptyState";

const AllShops = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [page, setPage] = useState(1);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const [isOpen, setIsOpen] = useState(false);

  const { data: allShops, isLoading: allShopsLoading } =
    useGetAllShopsQuery(params);

  const [blockShop] = useBlockShopMutation();

  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (allShopsLoading) {
    return (
      <div>
        <StoresLoading />
      </div>
    );
  }

  const totalShops = allShops?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalShops / 5);
  // pagination handler
  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setParams(queryParams);
  };

  const handleDeleteUser = async () => {
    if (deleteModalId) {
      const { data } = await blockShop(deleteModalId);

      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.error("Failed to delete user.");
      }
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
        isOpen={isOpen}
        role="admin"
        setIsOpen={setIsOpen}
        title={"Vendor Shops"}
        hasLeftButton={false}
        className="mb-5"
      />
      {allShops?.data?.data?.length > 0 ? (
        <>
          {" "}
          <Table aria-label="Example static collection table">
            <TableHeader
              className="table"
              style={{
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
              }}
            >
              <TableColumn>SHOP</TableColumn>
              <TableColumn>OWNER </TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>CREATED AT</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>

            <TableBody>
              {allShops?.data?.data?.map((shop: IShop) => (
                <TableRow key={shop.id}>
                  <TableCell>
                    <div className="flex  gap-2">
                      <div>
                        {shop?.logo ? (
                          <img alt="" className="size-[40px]" src={shop.logo} />
                        ) : (
                          <LuUser size={40} />
                        )}
                      </div>
                      <div>
                        <p>{shop?.name}</p>
                        <p>{shop?.vendor?.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{shop?.vendor?.name}</TableCell>
                  <TableCell>{"ACTIVE"}</TableCell>
                  <TableCell>
                    {moment(shop?.createdAt).format("DD MMM YYYY")}~
                    {moment(shop?.createdAt).format("HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Tooltip color="danger" content="Block">
                      <span
                        className="text-lg  cursor-pointer active:opacity-50"
                        onClick={() => handleDeleteModalOpen(shop?.id)}
                      >
                        <MdBlock />
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
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
            message="Vendor's stores found empty!"
          />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteUser}
        isOpen={isDeleteModalOpen}
        title="Store"
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default AllShops;

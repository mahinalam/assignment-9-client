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

import DeleteModal from "@/app/components/modal/DeleteModal";
import { IShop, TQueryParam } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import moment from "moment";
import { toast } from "sonner";
import { LuUser } from "react-icons/lu";
import {
  useBlockShopMutation,
  useGetAllShopsQuery,
} from "@/app/redux/features/shop/shopApi";
import { MdBlock } from "react-icons/md";
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

  //   console.log(vendorId);

  const { data: allShops, isLoading: allShopsLoading } =
    useGetAllShopsQuery(params);

  const [blockShop] = useBlockShopMutation();
  console.log(" allShops", allShops);

  //   console.log("order history from admin", allOrders);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (allShopsLoading) {
    return (
      <div>
        <Loader />
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

  // console.log(vendorOrderHistory);
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
      {allShops?.data?.data?.length > 0 ? (
        <>
          {" "}
          <SidebarButton
            title={"Vendor Stores"}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            role="admin"
          />
          <Table
            // style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
            aria-label="Example static collection table"
            // className="table"
          >
            <TableHeader
              style={{
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
              }}
              className="table"
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
                          // TODO: fixed customerProfilePhoto pronoun
                          <img src={shop.logo} alt="" className="size-[40px]" />
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
                    <Tooltip content="Block" color="danger">
                      <span
                        onClick={() => handleDeleteModalOpen(shop?.id)}
                        className="text-lg  cursor-pointer active:opacity-50"
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
              page={page}
              total={totalPages}
              onChange={handlePageChange}
              showControls
            />
          </div>
        </>
      ) : (
        <>
          <EmptyState
            message="Vendor's stores found empty"
            address="/"
            label="Go Home"
          />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteUser}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
        title="Store"
      />
    </>
  );
};

export default AllShops;

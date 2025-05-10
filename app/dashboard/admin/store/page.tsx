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
} from "@nextui-org/react";
import React, { useState } from "react";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { IUser } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import moment from "moment";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import { useDeleteReviewMutation } from "@/app/redux/features/review/reviewApi";
import { toast } from "sonner";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/app/redux/features/user/userApi";
import { LuUser } from "react-icons/lu";
import { useGetAllShopsQuery } from "@/app/redux/features/shop/shopApi";
import { TiShoppingBag } from "react-icons/ti";
import { MdBlock } from "react-icons/md";
import "./Store.css";

const AllShops = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const [isOpen, setIsOpen] = useState(false);

  //   console.log(vendorId);

  const { data: allShops, isLoading: allShopsLoading } =
    useGetAllShopsQuery(undefined);

  const [deleteUser] = useDeleteUserMutation();
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
  // console.log(vendorOrderHistory);
  const handleDeleteUser = async () => {
    if (deleteModalId) {
      const { data } = await deleteUser(deleteModalId);
      if (data?.success) {
        toast.success("User deleted successfully.");
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

  console.log("delete modal id", deleteModalId);
  return (
    <>
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
          style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
          className="table"
        >
          <TableColumn>SHOP</TableColumn>
          <TableColumn>OWNER </TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {allShops?.data?.map((shop: IUser) => (
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
                    <p>{shop?.owner?.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{shop?.owner?.name}</TableCell>
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

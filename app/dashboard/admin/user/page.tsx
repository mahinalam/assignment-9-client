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
LuUser;

const AllUsers = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const [isOpen, setIsOpen] = useState(false);

  //   console.log(vendorId);

  const { data: allUsers, isLoading: allUsersLoading } =
    useGetAllUsersQuery(undefined);

  const [deleteUser] = useDeleteUserMutation();
  console.log(" allUsers", allUsers);

  //   console.log("order history from admin", allOrders);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (allUsersLoading) {
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
    <div className="">
      <SidebarButton
        title={"Users"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="admin"
      />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>PROFILE</TableColumn>
          <TableColumn>ROLE </TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {allUsers?.data?.map((user: IUser) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex  gap-2">
                  <div>
                    {user?.profilePhoto ? (
                      // TODO: fixed customerProfilePhoto pronoun
                      <img
                        src={user.profilePhoto}
                        alt=""
                        className="size-[40px]"
                      />
                    ) : (
                      <LuUser size={40} />
                    )}
                  </div>
                  <div>
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>{user?.status}</TableCell>
              <TableCell>
                {moment(user?.createdAt).format("DD MMM YYYY")}~
                {moment(user?.createdAt).format("HH:mm:ss")}
              </TableCell>
              <TableCell>
                <Tooltip content="Delete user" color="danger">
                  <span
                    onClick={() => handleDeleteModalOpen(user?.id)}
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
        handleDeleteProduct={handleDeleteUser}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
        title="User"
      />
    </div>
  );
};

export default AllUsers;

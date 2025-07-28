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

import UsersLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { IUser, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/app/redux/features/user/userApi";
import EmptyState from "@/app/components/dashboard/EmptyState";

const AllUsers = () => {
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
    data: allUsers,
    isLoading: allUsersLoading,
    isFetching,
  } = useGetAllUsersQuery(params);

  const [deleteUser] = useDeleteUserMutation();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (allUsersLoading || isFetching) {
    return (
      <div>
        <UsersLoading />
      </div>
    );
  }

  const totalUsers = allUsers?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalUsers / 5);
  // pagination handler
  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 },
    );
    setParams(queryParams);
  };

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

  return (
    <div className="">
      <SidebarButton
        className={"mb-5"}
        hasLeftButton={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"All Users"}
        userRole="admin"
      />
      {allUsers?.data?.data?.length > 0 ? (
        <>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>PROFILE</TableColumn>
              <TableColumn>ROLE </TableColumn>
              <TableColumn>CREATED AT</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>

            <TableBody>
              {allUsers?.data?.data?.map((user: IUser) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex  gap-2">
                      <div>
                        {user?.profilePhoto ? (
                          // TODO: fixed customerProfilePhoto pronoun
                          <img
                            alt=""
                            className="size-[40px]"
                            src={user.profilePhoto}
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
                  <TableCell>
                    {moment(user?.createdAt).format("DD MMM YYYY")}~
                    {moment(user?.createdAt).format("HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Tooltip color="danger" content="Delete user">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => handleDeleteModalOpen(user?.id)}
                      >
                        <DeleteIcon />
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
              initialPage={params?.[0].value as number}
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
            message="Users found empty!"
          />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteUser}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this user?"
        title="Delete user"
        onOpenChange={onDeleteModalChange}
      />
    </div>
  );
};

export default AllUsers;

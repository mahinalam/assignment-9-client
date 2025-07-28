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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";
import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";
import moment from "moment";

import Loading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteWishlistMutation,
  useGetUsersWishlistQuery,
} from "@/app/redux/features/wishlist/wishlistApi";
import { TQueryParam } from "@/types";
import EmptyState from "@/app/components/dashboard/EmptyState";
import SidebarButton from "@/app/components/dashboard/SidebarButton";

const Wishlists = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);

  // get users wishhlist
  const {
    data: usersWishlistsData,
    isLoading: usersWishlistLoading,
    isFetching,
  } = useGetUsersWishlistQuery(params);

  const [deleteWishlist] = useDeleteWishlistMutation();
  const [isOpen, setIsOpen] = useState(false);

  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (usersWishlistLoading || isFetching) {
    return <Loading />;
  }
  const handleDeleteProduct = async () => {
    if (deleteModalId) {
      const res = await deleteWishlist(deleteModalId);

      if (res.data.success) {
        toast.success("Wishlist deleted successfully.");
        onDeleteModalChange(); //   }
      } else {
        toast.success("Failed to delete wishlist.");
        onDeleteModalChange(); //
      }
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  const totalWishlists = usersWishlistsData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalWishlists / 5);

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
      <div className="mb-5">
        <SidebarButton
          hasLeftButton={true}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"My Wishlist"}
          userRole="user"
        />
      </div>
      {usersWishlistsData?.data?.data?.length > 0 ? (
        <>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>PRODUCT</TableColumn>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn>CREATED DATE </TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {usersWishlistsData?.data?.data?.map((wishlist: any) => (
                <TableRow key={wishlist.id}>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <div>
                        <img
                          alt=""
                          className="size-12"
                          src={wishlist?.product?.images[0]}
                        />
                      </div>
                      <div>
                        <p>
                          {wishlist?.product?.name?.length > 25
                            ? `${wishlist.product.name.slice(0, 25)}...`
                            : wishlist?.product?.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{wishlist.product?.category?.name}</TableCell>
                  <TableCell>{wishlist?.product?.price} ৳</TableCell>
                  <TableCell>
                    {moment(wishlist.createdAt).format("MMMM D, YYYY")}
                  </TableCell>
                  <TableCell>
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <BiDotsVerticalRounded size={20} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Product Actions">
                        <DropdownItem
                          onClick={() =>
                            handleDeleteModalOpen(wishlist.product.id)
                          }
                        >
                          <span className="flex items-center gap-1">
                            <span>
                              <RiDeleteBin5Line size={20} />
                            </span>
                            <span>Delete</span>
                          </span>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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
            address="/products"
            label="Browse Products"
            message="Your wishlist is empty."
          />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this wishlist?"
        title="Delete Wishlist"
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default Wishlists;

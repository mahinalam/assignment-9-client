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
import { useSelector } from "react-redux";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";
import moment from "moment";

import WishlistSkeletonLoading from "./WishlistLoading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { RootState } from "@/app/redux/store";
import {
  useDeleteWishlistMutation,
  useGetUsersWishlistQuery,
} from "@/app/redux/features/wishlist/wishlistApi";
import { TQueryParam } from "@/types";
import Container from "@/app/components/sharred/Container";
import EmptyState from "@/app/components/dashboard/EmptyState";

const Wishlist = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [page, setPage] = useState(1);

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  // get users wishhlist
  const { data: usersWishlistsData, isLoading: usersWishlistLoading } =
    useGetUsersWishlistQuery(params);

  const [deleteWishlist] = useDeleteWishlistMutation();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (usersWishlistLoading) {
    return <WishlistSkeletonLoading />;
  }
  console.log({ usersWishlistsData });
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

  // Thank you for your message. It has been sent.
  return (
    <>
      {usersWishlistsData?.data?.data?.length > 0 ? (
        <>
          {" "}
          <div className="mt-[62px] sm:mt-[96px] lg:mt-44 bg-white p-8">
            <div className="text-center mb-1  lg:pb-8 pb-5">
              <h1 className="lg:text-3xl text-2xl  mb-2 font-bold">
                My Wishlist
              </h1>
            </div>
            {/* table */}
            <div>
              <Container>
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
                                <p>{wishlist?.product?.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {wishlist.product?.category?.name}
                          </TableCell>
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
                      page={page}
                      total={totalPages} // You should have this in your API response
                      onChange={handlePageChange}
                    />
                  </div>
                </>
              </Container>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <EmptyState
            address="/"
            label="Go Home"
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

export default Wishlist;

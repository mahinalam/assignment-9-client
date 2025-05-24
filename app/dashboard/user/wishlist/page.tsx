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

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  useDeleteWishlistMutation,
  useGetUsersWishlistQuery,
} from "@/app/redux/features/wishlist/wishlistApi";
import { toast } from "sonner";
import { TQueryParam } from "@/types";
// import { useGetUsersWishlistQuery } from "@/app/redux/features/wishlist/wishlistapi";

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
  const [page, setPage] = useState(1);

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const { data: currentUserInfo } = useGetSingleUserQuery(userId);

  // get users wishhlist
  const { data: usersWishlistsData, isLoading: usersWishlistLoading } =
    useGetUsersWishlistQuery(params);
  console.log("users wishlist", usersWishlistsData);
  console.log("currentUserInfo", currentUserInfo);
  //   const { data: userProductReviews, isLoading: userProductReviewLoading } =
  //     useGetUserProductReviewQuery(userId as string);

  const [deleteWishlist] = useDeleteWishlistMutation();

  //   console.log("userProductReviews", userProductReviews);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  //   if (userProductReviewLoading) {
  //     return <div>Loading...</div>;
  //   }
  //   console.log(isSuccess);
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
    console.log("id", id);
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  const totalWishlists = usersWishlistsData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalWishlists / 5);

  const handlePageChange = (page: number) => {
    console.log("page value", page);
    const queryParams: TQueryParam[] = [];
    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setParams(queryParams);
  };

  return (
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
          {usersWishlistsData?.data?.data?.wishlistItem?.map(
            (wishlist: any) => (
              // review.map((review: IReview) => (
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
                <TableCell>{wishlist.product?.category?.name}</TableCell>
                <TableCell>{wishlist?.product?.price} ৳</TableCell>
                <TableCell>{wishlist?.createdAt}</TableCell>
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
            )
            // ))
          )}
        </TableBody>
      </Table>
      <div className="flex  justify-center mt-8">
        <Pagination
          page={page}
          total={totalPages} // You should have this in your API response
          onChange={handlePageChange}
          showControls
        />
      </div>
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
        title="Wishlist"
      />
    </>
  );
};

export default Wishlists;

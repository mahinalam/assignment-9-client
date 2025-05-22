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
} from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useGetUsersWishlistQuery } from "@/app/redux/features/wishlist/wishlistApi";
// import { useGetUsersWishlistQuery } from "@/app/redux/features/wishlist/wishlistapi";

const Wishlists = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const { data: currentUserInfo } = useGetSingleUserQuery(userId);

  // get users wishhlist
  const { data: usersWishlistsData, isLoading: usersWishlistLoading } =
    useGetUsersWishlistQuery(undefined);
  console.log("users wishlist", usersWishlistsData);
  console.log("currentUserInfo", currentUserInfo);
  //   const { data: userProductReviews, isLoading: userProductReviewLoading } =
  //     useGetUserProductReviewQuery(userId as string);

  const [deleteProduct] = useDeleteProductMutation();

  //   console.log("userProductReviews", userProductReviews);
  //   const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  //   if (userProductReviewLoading) {
  //     return <div>Loading...</div>;
  //   }
  //   console.log(isSuccess);
  // const handleDeleteProduct = () => {
  //   if (deleteModalId) {
  //     deleteProduct(deleteModalId);
  //     onDeleteModalChange(); //   }
  //   }
  // };
  // const handleDeleteModalOpen = (id: string) => {
  //   // console.log("id", id);
  //   setDeleteModalId(id);
  //   onDeleteModalOpen();
  // };

  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>CREATED DATE </TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {currentUserInfo?.data?.followingShop?.map(
            (shop: any) => (
              // review.map((review: IReview) => (
              <TableRow key={shop.id}>
                <TableCell>
                  <div className="flex gap-2">
                    <div>
                      <img alt="" className="size-12" src={item?.images[0]} />
                    </div>
                    <div>
                      <p>{item?.name.slice(0, 15)}...</p>
                      <p className="text-[#737682]">{item.category.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{shop.shop.address}</TableCell>
                <TableCell>{shop.shop.createdAt}</TableCell>
                <TableCell>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <BiDotsVerticalRounded size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Product Actions">
                      <DropdownItem
                      // onClick={() =>
                      //   handleRemoveFeaturedProductModalOpen(item.id)
                      // }
                      >
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          <span>Remove</span>
                        </span>
                      </DropdownItem>
                      <DropdownItem
                      // onClick={() => handleDeleteModalOpen(item.id)}
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
      {/* <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
      /> */}
    </>
  );
};

export default Wishlists;

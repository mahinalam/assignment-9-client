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
  Pagination,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import {
  useGetUsersFollowingShopsQuery,
  useUnFollowShopMutation,
} from "@/app/redux/features/shop/shopApi";
import { toast } from "sonner";
import { TQueryParam } from "@/types";
import Loading from "./Loading";

const ProductReviews = () => {
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

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const { data: currentUserInfo } = useGetSingleUserQuery(userId);

  console.log("currentUserInfo", currentUserInfo);
  const {
    data: followingShopsData,
    isLoading: followingShopLoading,
    isFetching,
  } = useGetUsersFollowingShopsQuery(params);
  console.log("follow data", followingShopsData);

  const [unfollowShop] = useUnFollowShopMutation();

  //   console.log("userProductReviews", userProductReviews);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (followingShopLoading || isFetching) {
    return <Loading />;
  }

  const handleDeleteProduct = async () => {
    try {
      const result = await unfollowShop(deleteModalId as string).unwrap();
      toast.success("Successfully unfollowed the shop!");
      console.log("Unfollow response:", result);
    } catch (error) {
      toast.error("Failed to unfollow the shop.");
      console.error("Unfollow error:", error);
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    console.log("id", id);
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  const totalFollowingShops =
    Number(followingShopsData?.data?.meta?.total) || 0;
  const totalPages = Math.ceil(totalFollowingShops / 5);

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
          <TableColumn>SHOP</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED DATE </TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {followingShopsData?.data?.data?.map(
            (shop: any) => (
              // review.map((review: IReview) => (
              <TableRow key={shop.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div>
                      <img alt="" className="size-12" src={shop?.shop.logo} />
                    </div>
                    <p>{shop.shop.name}</p>
                  </div>
                </TableCell>
                <TableCell>{shop.shop.address}</TableCell>
                <TableCell>{shop.shop.status}</TableCell>
                <TableCell>{shop.shop.createdAt}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteModalOpen(shop.shop.id)}
                    className="bg-gray-200"
                    size="sm"
                  >
                    UNFOLLOW
                  </Button>
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
          total={totalPages}
          onChange={handlePageChange}
          showControls
        />
      </div>
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
        title="Unfollow Shop"
        subTitle="Are you sure want to unfollow this shop?"
      />
    </>
  );
};

export default ProductReviews;

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
import { toast } from "sonner";

import Loading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useGetUsersFollowingShopsQuery,
  useUnFollowShopMutation,
} from "@/app/redux/features/shop/shopApi";
import { TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";

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

  const {
    data: followingShopsData,
    isLoading: followingShopLoading,
    isFetching,
  } = useGetUsersFollowingShopsQuery(params);

  const [unfollowShop] = useUnFollowShopMutation();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (followingShopLoading || isFetching) {
    return <Loading />;
  }

  const handleDeleteProduct = async () => {
    try {
      await unfollowShop(deleteModalId as string).unwrap();

      toast.success("Successfully unfollowed the shop!");
    } catch (error) {
      toast.error("Failed to unfollow the shop.");
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  const totalFollowingShops =
    Number(followingShopsData?.data?.meta?.total) || 0;
  const totalPages = Math.ceil(totalFollowingShops / 5);

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
      <SidebarButton
        className="mb-5"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Following Shops"
        userRole="user"
      />

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>SHOP</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED DATE </TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {followingShopsData?.data?.data?.map((shop: any) => (
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
                  className="bg-gray-200"
                  size="sm"
                  onClick={() => handleDeleteModalOpen(shop.shop.id)}
                >
                  UNFOLLOW
                </Button>
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
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to unfollow this shop?"
        title="Unfollow Shop"
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default ProductReviews;

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
} from "@nextui-org/react";
import React, { useState } from "react";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetAllVendorProductsQuery,
} from "@/app/redux/features/product/productApi";
import { IProduct } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import EmptyState from "@/app/components/dashboard/EmptyState";

const AllProducts = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo, isSuccess } = useGetSingleUserQuery(userId, {
    skip: !userId,
  });
  // console.log("shopOwnerInfo", shopOwnerInfo);

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const { data: allProducts, isLoading } = useGetAllVendorProductsQuery(
    currentUserInfo?.data?.shop?.id,
    { skip: !isSuccess }
  );

  const [deleteProduct] = useDeleteProductMutation();

  console.log("allProducts", allProducts);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  // console.log(user);

  if (isLoading) {
    return <Loader />;
  }
  //   console.log(isSuccess);
  const handleDeleteProduct = () => {
    if (deleteModalId) {
      deleteProduct(deleteModalId);
      onDeleteModalChange(); //   }
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    // console.log("id", id);
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  return (
    <>
      {allProducts?.data?.length > 0 ? (
        <>
          {" "}
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>Price </TableColumn>
              <TableColumn>IMAGE</TableColumn>
              <TableColumn>STOCK</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {!isLoading &&
                allProducts?.data?.length > 0 &&
                allProducts?.data?.map((item: IProduct) => (
                  <TableRow key={item?.id}>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.category?.name}</TableCell>
                    <TableCell>{item?.newPrice}</TableCell>
                    <TableCell>
                      <img alt="" className="size-12" src={item?.images[0]} />
                    </TableCell>

                    <TableCell>{item?.stock}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDeleteModalOpen(item.id)}>
                        Delete
                      </Button>
                      <Button onClick={() => handleDeleteModalOpen(item.id)}>
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <DeleteModal
            handleDeleteProduct={handleDeleteProduct}
            isOpen={isDeleteModalOpen}
            onOpenChange={onDeleteModalChange}
          />
        </>
      ) : (
        <>
          <EmptyState
            message="Products Found Empty"
            address="/dashboard/AddProducts"
            label="Add Product"
          />
        </>
      )}
    </>
  );
};

export default AllProducts;

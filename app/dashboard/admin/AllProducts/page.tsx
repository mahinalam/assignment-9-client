"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/app/redux/features/product/productApi";
import { IProduct } from "@/types";
import Loader from "@/app/components/sharred/Loader";
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

  const { data: allProducts, isLoading } = useGetAllProductsQuery(null);

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
      {allProducts?.data?.data?.length > 0 ? (
        <>
          {" "}
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>BRAND</TableColumn>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>SHOP NAME</TableColumn>
              <TableColumn>Price </TableColumn>
              <TableColumn>IMAGE</TableColumn>
              <TableColumn>STOCK</TableColumn>
              {/* <TableColumn>ACTION</TableColumn> */}
            </TableHeader>
            <TableBody>
              {!isLoading &&
                allProducts?.data?.data?.length > 0 &&
                allProducts?.data?.data?.map(
                  (item: IProduct & { brand: Record<string, any> }) => (
                    <TableRow key={item?.id}>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.brand?.name || "NO BRAND"}</TableCell>
                      <TableCell>{item?.category?.name}</TableCell>
                      <TableCell>{item?.shop?.name}</TableCell>
                      <TableCell>{item?.newPrice}</TableCell>
                      <TableCell>
                        <img alt="" className="size-12" src={item?.images[0]} />
                      </TableCell>

                      <TableCell>{item?.stock}</TableCell>
                      {/* <TableCell>
                        <Button onClick={() => handleDeleteModalOpen(item.id)}>
                          Delete
                        </Button>
                        <Button onClick={() => handleDeleteModalOpen(item.id)}>
                          Update
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ),
                )}
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
            address="/dashboard/AddProducts"
            label="Add Product"
            message="Products Found Empty"
          />
        </>
      )}
    </>
  );
};

export default AllProducts;

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
} from "@/app/redux/features/product/productApi";
import { IProduct } from "@/types";

const AllProducts = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();
  const { data: allProducts, isLoading } = useGetAllProductsQuery(null);

  const [deleteProduct] = useDeleteProductMutation();

  console.log(allProducts);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (isLoading) {
    return <div>Loading...</div>;
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
  );
};

export default AllProducts;

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
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useGetVendorOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { IOrder } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import SidebarButton from "@/app/components/dashboard/SidebarButton";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const vendorId = useSelector((state: RootState) => state.auth.user?.userId);
  const [isOpen, setIsOpen] = useState(false);

  console.log(vendorId);

  const { data: vendorOrderHistory, isLoading: vendorOrderHistoryLoading } =
    useGetVendorOrderHistoryQuery(undefined);

  const [deleteProduct] = useDeleteProductMutation();

  console.log("order history", vendorOrderHistory);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (vendorOrderHistoryLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  // console.log(vendorOrderHistory);
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

  console.log("email", vendorOrderHistory?.data?.shop?.order);
  return (
    <>
      <SidebarButton
        title={"Orders"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="vendor"
      />
      <Table aria-label="Example static collection table" className="mt-4">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>USER EMAIL</TableColumn>
          <TableColumn>TRANSACTION ID</TableColumn>
          <TableColumn>PAYMENT STATUS </TableColumn>
          <TableColumn>ORDER ITEMS</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
        </TableHeader>

        <TableBody>
          {vendorOrderHistory?.data?.shop?.order?.map((order: IOrder) =>
            order?.orderItem?.map((item) => (
              <TableRow key={order.id}>
                <TableCell className="">
                  <div className="flex items-center gap-1">
                    <img
                      alt=""
                      className="size-12"
                      src={item?.product?.images[0]}
                    />
                    <p>{item?.product?.name}</p>
                  </div>
                </TableCell>
                <TableCell>{order?.customerEmail}</TableCell>
                <TableCell>{order?.transactionId}</TableCell>
                <TableCell>{order?.paymentStatus}</TableCell>
                <TableCell>{order?.orderItem.length}</TableCell>
                <TableCell>{order?.totalPrice}</TableCell>
              </TableRow>
            ))
          )}
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

export default ProductReviews;

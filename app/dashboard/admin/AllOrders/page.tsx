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
import {
  useGetAllOrderHistoryQuery,
  useGetVendorOrderHistoryQuery,
} from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { IOrder } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { CgProfile } from "react-icons/cg";
import moment from "moment";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const vendorId = useSelector((state: RootState) => state.auth.user?.userId);
  const [isOpen, setIsOpen] = useState(false);

  console.log(vendorId);

  const { data: allOrders, isLoading: allOrdersLoading } =
    useGetAllOrderHistoryQuery(undefined);

  const [deleteProduct] = useDeleteProductMutation();
  console.log("all orders", allOrders);

  console.log("order history from admin", allOrders);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (allOrdersLoading) {
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

  return (
    <>
      <SidebarButton
        title={"All Orders"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="admin"
      />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>USER</TableColumn>
          <TableColumn>TOTAL PRICE </TableColumn>
          <TableColumn>TRANSACTION ID</TableColumn>
          <TableColumn>SHIPPING ADDRESS</TableColumn>
          <TableColumn>ORDER ITEMS</TableColumn>
          <TableColumn>ORDER DATE</TableColumn>
        </TableHeader>

        <TableBody>
          {allOrders?.data?.map((order: IOrder) => (
            <TableRow key={order.id}>
              <TableCell>
                <div className="flex  gap-2">
                  <div>
                    {order?.cutomerProfilePhoto ? (
                      // TODO: fixed customerProfilePhoto pronoun
                      <img
                        src={order.cutomerProfilePhoto}
                        alt=""
                        className="size-[40px]"
                      />
                    ) : (
                      <CgProfile size={40} />
                    )}
                  </div>
                  <div>
                    <p>{order?.customerName}</p>
                    <p>{order?.customerEmail}</p>
                  </div>
                  {/* <p className="mr-12 lg:mr-0">{order.name}</p> */}
                </div>
              </TableCell>
              <TableCell>{order?.totalPrice}</TableCell>
              <TableCell>{order?.transactionId}</TableCell>
              <TableCell>{order?.customerShippingAddress}</TableCell>
              <TableCell>{order?.orderItems.length}</TableCell>
              <TableCell>
                {moment(order?.createdAt).format("DD MMM YYYY")}~
                {moment(order?.createdAt).format("HH:mm:ss")}
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

export default ProductReviews;

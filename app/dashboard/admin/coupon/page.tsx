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
import { ICoupon, IOrder } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { CgProfile } from "react-icons/cg";
import moment from "moment";
import { useGetAllCouponsQuery } from "@/app/redux/features/coupon/couponApi";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";

const AllCoupons = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const [isOpen, setIsOpen] = useState(false);

  //   console.log(vendorId);

  const { data: allCoupons, isLoading: allCouponsLoading } =
    useGetAllCouponsQuery(undefined);

  const [deleteProduct] = useDeleteProductMutation();
  console.log("all coupons", allCoupons);

  //   console.log("order history from admin", allOrders);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (allCouponsLoading) {
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
        title={"Coupons"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="admin"
      />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>COUPON</TableColumn>
          <TableColumn>DISCOUNT </TableColumn>
          <TableColumn>DISCOUNT BY</TableColumn>
          <TableColumn>VALID TILL</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {allCoupons?.data?.map((coupon: ICoupon) => (
            <TableRow key={coupon.id}>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{coupon.discount}</TableCell>
              <TableCell>{coupon.type}</TableCell>
              <TableCell>
                {moment(coupon?.expiration).format("DD MMM YYYY")}~
                {moment(coupon?.expiration).format("HH:mm:ss")}
              </TableCell>
              <TableCell>
                <Tooltip content="Delete coupon" color="danger">
                  <span
                    onClick={() => handleDeleteModalOpen(coupon?.id)}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
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

export default AllCoupons;

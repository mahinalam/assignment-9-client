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
  Pagination,
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
import { ICoupon, IOrder, TQueryParam } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { CgProfile } from "react-icons/cg";
import moment from "moment";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "@/app/redux/features/coupon/couponApi";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import { GoPlus } from "react-icons/go";
import CreateCoupon from "../AddCoupon/page";
import CreateCouponModal from "@/app/components/modal/CreateCouponModal";
import { toast } from "sonner";
import EmptyState from "@/app/components/dashboard/EmptyState";
import CouponsLoading from "./Loading";

const AllCoupons = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();
  const {
    isOpen: isCouponModalOpen,
    onOpen: onCouponModalOpen,
    onOpenChange: onCouponModalOpenChange,
  } = useDisclosure();

  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [dateValue, setDateValue] = useState<string | Date>("");
  const [couponLoadingName, setCategoryLoadingName] = useState("Create Coupon");
  const [couponLoading, setCouponLoading] = useState(false);

  const [addCoupon] = useCreateCouponMutation();
  //   console.log(vendorId);

  const { data: allCoupons, isLoading: allCouponsLoading } =
    useGetAllCouponsQuery(params);

  const [deleteCoupon] = useDeleteCouponMutation();

  //   console.log("order history from admin", allOrders);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const totalCoupons = allCoupons?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalCoupons / 5);

  const handlePageChange = (page: number) => {
    console.log("page value", page);
    const queryParams: TQueryParam[] = [];
    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setParams(queryParams);
  };

  if (allCouponsLoading) {
    return (
      <div>
        <CouponsLoading />
      </div>
    );
  }

  const handleCreateCoupon = async (data: any) => {
    setCouponLoading(true);
    setCategoryLoadingName("Creating Coupon...");
    const couponData = {
      code: data.code,
      discount: Number(data.discount),
      expiration: new Date(dateValue).toISOString(),
    };

    try {
      if (couponData.code) {
        const res = await addCoupon(couponData).unwrap();

        if (res.success) {
          setCouponLoading(false);
          setCategoryLoadingName("Create coupon");
          toast.success(res.message);
          onCouponModalOpenChange();
        }
      }
    } catch (err: any) {
      setCategoryLoadingName("Create coupon");
      setCouponLoading(false);
      onCouponModalOpenChange();
      toast.error("Coupon already exists");
      console.log(err.message);
    }
  };

  // console.log(vendorOrderHistory);
  const handleDeleteCoupon = async () => {
    try {
      if (deleteModalId) {
        const res = await deleteCoupon(deleteModalId).unwrap();
        console.log("res", res);
        onDeleteModalChange(); //   }
        console.log("from deltew", deleteModalId);
        if ((res as any)?.success) {
          toast.success("Coupon deleted successfull.");
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    // console.log("id", id);
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  return (
    <>
      {allCoupons?.data?.data?.length > 0 ? (
        <>
          {" "}
          <SidebarButton
            title={"Coupons"}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            role="admin"
          />
          <div className="flex justify-end mb-2">
            <button
              onClick={onCouponModalOpen}
              className="flex bg-primary text-sm items-center gap-1 rounded-md text-white px-4 py-2"
            >
              <span>Create New</span>
              <span>
                <GoPlus size={20} />
              </span>
            </button>
          </div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>COUPON</TableColumn>
              <TableColumn>DISCOUNT </TableColumn>
              <TableColumn>DISCOUNT BY</TableColumn>
              <TableColumn>VALID TILL</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>

            <TableBody>
              {allCoupons?.data?.data?.map((coupon: ICoupon) => (
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
          <div className="flex  justify-center mt-8">
            <Pagination
              page={page}
              total={totalPages}
              onChange={handlePageChange}
              showControls
              // renderItem={generatePageNumbers}
            />
          </div>
        </>
      ) : (
        <>
          {" "}
          <EmptyState
            onClick={onCouponModalOpen}
            message="Coupons found empty!"
            label="Add Coupon"
          />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteCoupon}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
        title="Coupon"
      />
      <CreateCouponModal
        isOpen={isCouponModalOpen}
        onOpenChange={onCouponModalOpenChange}
        handleCreateCoupon={handleCreateCoupon}
        setDateValue={setDateValue}
        isLoading={couponLoading}
        couponLoadingName={couponLoadingName}
      />
    </>
  );
};

export default AllCoupons;

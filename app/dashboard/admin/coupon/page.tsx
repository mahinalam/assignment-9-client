"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import React, { useState } from "react";
import moment from "moment";
import { GoPlus } from "react-icons/go";
import { toast } from "sonner";

import CouponsLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { ICoupon, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "@/app/redux/features/coupon/couponApi";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import CreateCouponModal from "@/app/components/modal/CreateCouponModal";
import EmptyState from "@/app/components/dashboard/EmptyState";

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

  const { data: allCoupons, isLoading: allCouponsLoading } =
    useGetAllCouponsQuery(params);

  const [deleteCoupon] = useDeleteCouponMutation();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const totalCoupons = allCoupons?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalCoupons / 5);

  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 },
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
    }
  };
  const handleDeleteCoupon = async () => {
    try {
      if (deleteModalId) {
        const res = await deleteCoupon(deleteModalId).unwrap();

        onDeleteModalChange();
        if ((res as any)?.success) {
          toast.success("Coupon deleted successfull.");
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  return (
    <>
      <SidebarButton
        className={"mb-5"}
        hasLeftButton={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Coupons"}
        userRole="admin"
      />
      {allCoupons?.data?.data?.length > 0 ? (
        <>
          {" "}
          <div className="flex justify-end mb-2">
            <button
              className="flex bg-primary text-sm items-center gap-1 rounded-md text-white px-4 py-2"
              onClick={onCouponModalOpen}
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
                    <Tooltip color="danger" content="Delete coupon">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => handleDeleteModalOpen(coupon?.id)}
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
            label="Add Coupon"
            message="Coupons found empty!"
            onClick={onCouponModalOpen}
          />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteCoupon}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this coupon?"
        title="Delete coupon"
        onOpenChange={onDeleteModalChange}
      />
      <CreateCouponModal
        couponLoadingName={couponLoadingName}
        handleCreateCoupon={handleCreateCoupon}
        isLoading={couponLoading}
        isOpen={isCouponModalOpen}
        setDateValue={setDateValue}
        onOpenChange={onCouponModalOpenChange}
      />
    </>
  );
};

export default AllCoupons;

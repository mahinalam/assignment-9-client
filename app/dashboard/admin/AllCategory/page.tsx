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
import moment from "moment";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/app/redux/features/category/categoryApi";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import { toast } from "sonner";
import Loader from "@/app/components/sharred/Loader";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const [isOpen, setIsOpen] = useState(false);

  console.log("vendor", userId);
  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetAllCategoriesQuery(null);

  const [deleteCategory] = useDeleteCategoryMutation();

  //   console.log("userProductReviews", userProductReviews);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (categoryDataLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  //   console.log(isSuccess);
  const handleDeleteProduct = async () => {
    if (deleteModalId) {
      const { data } = await deleteCategory(deleteModalId);
      if (data?.success) {
        toast.success("Category Deleted Successfull.");
      } else {
        toast.error("Failed to delete category.");
      }
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
        title={"Categories"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="admin"
      />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Category NAME</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>UPDATED AT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {categoryData?.data?.map(
            (category: any) => (
              // review.map((review: IReview) => (
              <TableRow key={category.id}>
                <TableCell className="">
                  <div className="flex items-center gap-1">
                    <img alt="" className="size-12" src={category?.imageUrl} />
                    <p>{category?.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {" "}
                  {moment(category.createdAt).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  {" "}
                  {moment(category.updatedAt).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  <Tooltip content="Delete category" color="danger">
                    <span
                      onClick={() => handleDeleteModalOpen(category?.id)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
            // ))
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

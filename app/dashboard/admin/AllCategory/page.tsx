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
import moment from "moment";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/app/redux/features/category/categoryApi";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import { toast } from "sonner";
import Loader from "@/app/components/sharred/Loader";
import { GoPlus } from "react-icons/go";
import CreateProductModal from "@/app/components/modal/CreateProductModal";
import CreateCategoryModal from "@/app/components/modal/CreateCategoryModal";
import CategoryLoading from "@/app/components/dashboard/CategoryLoading";
import { TQueryParam } from "@/types";
import EmptyState from "@/app/components/dashboard/EmptyState";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const {
    isOpen: isCategoryModalOpen,
    onOpen: onCategoryModalOpen,
    onOpenChange: onCategoryModalChange,
  } = useDisclosure();

  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const [isOpen, setIsOpen] = useState(false);

  console.log("vendor", userId);
  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetAllCategoriesQuery(params);

  const [deleteCategory] = useDeleteCategoryMutation();
  const [CreateCategory, isLoading] = useCreateCategoryMutation();
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryLoadingName, setCategoryLoadingName] =
    useState("Create Category");

  //   console.log("userProductReviews", userProductReviews);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<string | number>(1);

  let queryParams: TQueryParam[] = [];

  if (categoryDataLoading) {
    return (
      <div>
        {/* <Loader /> */}
        <CategoryLoading />
      </div>
    );
  }

  const totalCategories = categoryData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalCategories / 10);

  //   console.log(isSuccess);
  const handleDeleteProduct = async () => {
    if (deleteModalId) {
      const { data } = await deleteCategory(deleteModalId);
      if (data?.success) {
        toast.success("Category Deleted Successfully.");
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

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const updatedQueryParams = queryParams.filter(
      (param) => param.name !== "page"
    );

    updatedQueryParams.push({ name: "page", value: page });
    setParams(updatedQueryParams);
  };

  // create category
  const handleCreateCategory = async (data: any) => {
    setCategoryLoadingName("Creating category...");
    setCategoryLoading(true);
    console.log("clikced");
    // const toastId = toast.loading("Creating category...");
    console.log("form data", data);
    try {
      const categoryData = {
        ...data,
      };

      const res = await CreateCategory(categoryData).unwrap();

      console.log("res", res);
      if (res?.success) {
        setCategoryLoading(false);
        onCategoryModalChange();
        toast.success("Category created successfull!");
        setCategoryLoadingName("Create category");
      }
    } catch (err: any) {
      setCategoryLoading(false);
      onCategoryModalChange();
      toast.error(err.message);
      console.log(err.message);
      setCategoryLoadingName("Create category");
    }
  };

  return (
    <>
      {categoryData?.data?.data?.length > 0 ? (
        <>
          <div className="flex justify-between">
            <SidebarButton
              title={"Categories"}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              role="admin"
            />
            <div className="flex justify-end mb-2">
              <button
                onClick={onCategoryModalOpen}
                className="flex bg-primary text-sm items-center gap-1 rounded-md text-white px-4 py-2"
              >
                <span>Create New</span>
                <span>
                  <GoPlus size={20} />
                </span>
              </button>
            </div>
          </div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Category NAME</TableColumn>
              <TableColumn>CREATED AT</TableColumn>
              <TableColumn>UPDATED AT</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {categoryData?.data?.data?.map(
                (category: any) => (
                  // review.map((review: IReview) => (
                  <TableRow key={category.id}>
                    <TableCell className="">
                      <div className="flex items-center gap-1">
                        <img
                          alt=""
                          className="size-12"
                          src={category?.imageUrl}
                        />
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
          <Pagination
            initialPage={currentPage as number}
            total={totalPages} // You should have this in your API response
            onChange={handlePageChange}
            showControls
            // renderItem={generatePageNumbers}
          />
        </>
      ) : (
        <>
          <EmptyState
            onClick={onCategoryModalOpen}
            message="Categories found empty!"
            label="Add Category"
          />
        </>
      )}

      <DeleteModal
        title="Category"
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
      />
      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onOpenChange={onCategoryModalChange}
        handleCreateCategory={handleCreateCategory}
        isLoading={categoryLoading}
        categoryLoadingName={categoryLoadingName}
      />
    </>
  );
};

export default ProductReviews;

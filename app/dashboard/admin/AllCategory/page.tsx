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
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "sonner";
import { GoPlus } from "react-icons/go";
import DeleteModal from "@/app/components/modal/DeleteModal";
import { RootState } from "@/app/redux/store";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/app/redux/features/category/categoryApi";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
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

  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [page, setPage] = useState(1);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: categoryData,
    isLoading: categoryDataLoading,
    isFetching,
  } = useGetAllCategoriesQuery(params);

  const [deleteCategory] = useDeleteCategoryMutation();
  const [CreateCategory, isLoading] = useCreateCategoryMutation();
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryLoadingName, setCategoryLoadingName] =
    useState("Create Category");
  console.log("category data", categoryData);

  //   console.log("userProductReviews", userProductReviews);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (categoryDataLoading || isFetching) {
    return (
      <div>
        {/* <Loader /> */}
        <CategoryLoading />
      </div>
    );
  }
  console.log("image files", imageFile);

  const totalCategories = categoryData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalCategories / 5);

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
  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  //   const updatedQueryParams = queryParams.filter(
  //     (param) => param.name !== "page"
  //   );

  //   updatedQueryParams.push({ name: "page", value: page });
  //   setParams(updatedQueryParams);
  // };
  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setParams(queryParams);
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

      const formData = new FormData();

      formData.append("data", JSON.stringify(categoryData));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await CreateCategory(formData).unwrap();

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
          <div className="flex justify-between mb-5">
            <SidebarButton
              isOpen={isOpen}
              role="admin"
              setIsOpen={setIsOpen}
              title={"Categories"}
              hasLeftButton={false}
            />
            <div className="flex justify-end mb-2">
              <button
                className="flex bg-primary text-sm items-center gap-1 rounded-md text-white px-4 py-2"
                onClick={onCategoryModalOpen}
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
              {categoryData?.data?.data?.map((category: any) => (
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
                    <Tooltip color="danger" content="Delete category">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => handleDeleteModalOpen(category?.id)}
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
              showControls
              page={page as number}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <EmptyState
            label="Add Category"
            message="Categories found empty!"
            onClick={onCategoryModalOpen}
          />
        </>
      )}

      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this category?"
        title="Delete Category"
        onOpenChange={onDeleteModalChange}
      />
      <CreateCategoryModal
        categoryLoadingName={categoryLoadingName}
        handleCreateCategory={handleCreateCategory}
        imageFile={imageFile}
        isLoading={categoryLoading}
        isOpen={isCategoryModalOpen}
        setImageFile={setImageFile}
        onOpenChange={onCategoryModalChange}
      />
    </>
  );
};

export default ProductReviews;

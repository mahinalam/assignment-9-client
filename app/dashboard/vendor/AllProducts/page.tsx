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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiOutlineDuplicate } from "react-icons/hi";

import ProductsLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { IProduct, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { useGetVendorShopQuery } from "@/app/redux/features/shop/shopApi";
import CreateProductModal from "@/app/components/modal/CreateProductModal";
import EditProductModal from "@/app/components/modal/EditProductModal";
import EmptyState from "@/app/components/dashboard/EmptyState";

const VendorProducts = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [page, setPage] = useState(1);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const {
    isOpen: isCreateProductModalOpen,
    onOpen: onCreateProductModalOpen,
    onOpenChange: onCreateProductModalChange,
  } = useDisclosure();

  const {
    isOpen: isEditProductModalOpen,
    onOpen: onEditProductModalOpen,
    onOpenChange: onEditProductModalOpenChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [updateProductLoadingName, setUpdateProductLoadingName] =
    useState("Update product");

  const {
    data: vendorShopProducts,
    isLoading: vendorShopProductsLoading,
    isFetching,
  } = useGetVendorShopQuery(params);

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();

  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editProductData, setEditProductData] = useState<any>(undefined);
  const [editProductImages, setEditProductImages] = useState<any>([]);
  const [editProductLoading, setEditProductLoading] = useState(false);
  const [createImageFiles, setCreateImageFiles] = useState<File[]>([]);
  const [createProductLoading, setCreateProductLoading] = useState(false);
  const [createProductLoadingName, setCreateProductLoadingName] =
    useState("Create Product");

  useEffect(() => {
    if (editProductData?.images?.length > 0) {
      const updatedImages: any = [];

      editProductData?.images?.map((image: string) =>
        updatedImages.push(image)
      );
      setEditProductImages(updatedImages);
    } else {
      setEditProductImages(undefined);
    }
  }, [editProductData]);

  if (vendorShopProductsLoading || isFetching) {
    return <ProductsLoading />;
  }

  const shop = vendorShopProducts?.data?.data?.vendor?.shop;

  console.log("shop", shop);

  const totalProducts = vendorShopProducts?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / 5);
  // pagination handler
  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setParams(queryParams);
  };
  const handleDeleteProduct = async () => {
    if (deleteModalId) {
      const res = await deleteProduct(deleteModalId);

      if (res?.data?.success) {
        toast.success("Product deleted successfully.");
      } else {
        toast.error("Failed to delete product.");
      }
      onDeleteModalChange(); //   }
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  const handleCreateProductMNodalOpen = () => {
    onCreateProductModalOpen();
  };

  // edit modal
  const handleEditProductModalOpen = (productData: any) => {
    console.log("product data", productData);
    setEditProductData(productData);

    onEditProductModalOpen();
  };

  // delete selected image for edit
  const handleDeleteNewProductImages = (imageToRemove: File) => {
    if (imageFiles.length > 0) {
      const updatedImage = imageFiles?.filter(
        (image: File) => image.name !== imageToRemove.name
      );

      setImageFiles(updatedImage);
    }
  };

  // update product handler
  const handleUpdateProduct = async (data: any) => {
    setEditProductLoading(true);
    setUpdateProductLoadingName("Updating product...");
    try {
      if (editProductData) {
        const formData = new FormData();

        const productData = {
          id: editProductData.id,
          ...data,
        };

        console.log("update", productData);

        formData.append("data", JSON.stringify(productData));
        if (imageFiles.length > 0) {
          imageFiles.forEach((image) =>
            formData.append("itemImages", image as File)
          );
        }

        const res = await updateProduct(formData).unwrap();

        if (res?.success) {
          setEditProductLoading(false);
          toast.success("Product updfated successfully!");
          setUpdateProductLoadingName("Update product...");
          onEditProductModalOpenChange();
        }
      }
    } catch (err: any) {
      setEditProductLoading(false);
      onEditProductModalOpenChange();
      setUpdateProductLoadingName("Update product...");
    }
  };
  console.log("vendo", vendorShopProducts);
  // delete selected image for create
  const handleDeleteCreateProducts = (imageToRemove: File) => {
    if (createImageFiles.length > 0) {
      const updatedImage = createImageFiles?.filter(
        (image: File) => image.name !== imageToRemove.name
      );

      setCreateImageFiles(updatedImage);
    }
  };

  // update product handler
  const handleCreateProduct = async (data: any) => {
    setCreateProductLoading(true);
    setCreateProductLoadingName("Creating product...");
    try {
      const formData = new FormData();

      // if (ownerId) {
      const productData = {
        ...data,
        shopId: shop?.id,
      };
      console.log("product", productData);
      // }

      formData.append("data", JSON.stringify(productData));
      if (createImageFiles.length > 0) {
        createImageFiles.forEach((image) =>
          formData.append("itemImages", image as File)
        );
      }

      const res = await createProduct(formData).unwrap();

      if (res?.success) {
        setCreateProductLoading(false);
        toast.success("Product created successfully!");
        setCreateProductLoadingName("Create product...");
        onCreateProductModalChange();
        // router.push("/dashboard/AddProducts");
      }
    } catch (err: any) {
      setEditProductLoading(false);
      onCreateProductModalChange();
      setCreateProductLoadingName("Create product...");
    }
  };

  const handleAddProduct = () => {
    onCreateProductModalOpen();
  };
  console.log({ shop });
  // TODO: fix update
  return (
    <>
      <SidebarButton
        isOpen={isOpen}
        role="vendor"
        setIsOpen={setIsOpen}
        title={"All Products"}
        hasLeftButton={false}
        hasRightButton={true}
        handleCreateProductMNodalOpen={handleCreateProductMNodalOpen}
      />
      {shop?.product?.length > 0 ? (
        <>
          {" "}
          <Table aria-label="Example static collection table" className="mt-4">
            <TableHeader>
              <TableColumn>PRODUCT</TableColumn>
              <TableColumn>SHOP NAME</TableColumn>
              <TableColumn>PRICE </TableColumn>
              <TableColumn>STOCK</TableColumn>
              <TableColumn>DISCOUNT</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {!vendorShopProductsLoading &&
                shop?.product?.length > 0 &&
                shop?.product?.map(
                  (item: IProduct & { brand: Record<string, any> }) => (
                    <TableRow key={item?.id}>
                      {/* <TableCell>{item?.name.slice(0, 15)}...</TableCell> */}
                      <TableCell>
                        <div className="flex gap-2">
                          <div>
                            <img
                              alt=""
                              className="size-12"
                              src={item?.images[0]}
                            />
                          </div>
                          <div>
                            <p>{item?.name.slice(0, 15)}...</p>
                            <p className="text-[#737682]">
                              {item.category.name}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{shop?.name}</TableCell>
                      <TableCell>{item?.price} ৳</TableCell>
                      <TableCell>{item?.stock}</TableCell>
                      <TableCell>{item?.discount} ৳</TableCell>
                      <TableCell>
                        <Dropdown placement="bottom-end">
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <BiDotsVerticalRounded size={20} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Product Actions">
                            <DropdownItem
                              onClick={() => handleEditProductModalOpen(item)}
                            >
                              {/* flash button */}
                              <span className="flex items-center gap-1">
                                <span>
                                  <AiTwotoneEdit size={20} />
                                </span>
                                <span>Edit</span>
                              </span>
                            </DropdownItem>

                            <DropdownItem
                              onClick={() => handleDeleteModalOpen(item.id)}
                            >
                              <span className="flex items-center gap-1">
                                <span>
                                  <RiDeleteBin5Line size={20} />
                                </span>
                                <span>Delete</span>
                              </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
          <div className="flex  justify-center mt-8">
            <Pagination
              showControls
              page={page}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <EmptyState
            onClick={handleAddProduct}
            label="Add Product"
            message="Products found empty."
            // address="/"
          />
        </>
      )}
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        title="Delete Product"
        subTitle="Are you sure want to delete this product?"
        onOpenChange={onDeleteModalChange}
      />
      <CreateProductModal
        createImageFiles={createImageFiles}
        createProductLoading={createProductLoading}
        createProductLoadingName={createProductLoadingName}
        handleCreateProduct={handleCreateProduct}
        handleDeleteCreateProducts={handleDeleteCreateProducts}
        isOpen={isCreateProductModalOpen}
        setCreateProductImageFiles={setCreateImageFiles}
        onOpenChange={onCreateProductModalChange}
      />
      <EditProductModal
        editProductImages={editProductImages}
        editProductLoading={editProductLoading}
        handleDeleteNewProductImages={handleDeleteNewProductImages}
        handleUpdateProduct={handleUpdateProduct}
        imageFiles={imageFiles}
        isOpen={isEditProductModalOpen}
        productData={editProductData}
        setImageFiles={setImageFiles}
        updateProductLoadingName={updateProductLoadingName}
        onOpenChange={onEditProductModalOpenChange}
      />
    </>
  );
};

export default VendorProducts;

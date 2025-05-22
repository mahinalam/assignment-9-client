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

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useGetUsersOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { IOrder, IProduct, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { useGetVendorShopQuery } from "@/app/redux/features/shop/shopApi";
import Loader from "@/app/components/sharred/Loader";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import { RiDeleteBin5Line, RiDeleteBinLine } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import { Tooltip } from "@nextui-org/tooltip";
import { EditIcon } from "@/app/components/dashboard/EditDeleteButton";
import CreateProductModal from "@/app/components/modal/CreateProductModal";
import { CgProfile } from "react-icons/cg";
import { toast } from "sonner";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiOutlineDuplicate } from "react-icons/hi";
import EditProductModal from "@/app/components/modal/EditProductModal";
import { image } from "@nextui-org/theme";
import ProductsLoading from "./Loading";

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
  console.log("vendor shop roduycts", vendorShopProducts);

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();

  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [isEditDeleteSecOpen, setIsDeleteEditSecOpen] = useState(false);
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

  console.log({ editProductData });
  //   console.log(isSuccess);
  const handleDeleteProduct = async () => {
    if (deleteModalId) {
      const res = await deleteProduct(deleteModalId);
      if (res?.data?.success) {
        toast.success("Product deleted successfully.");
      } else {
        toast.error("Failed to delete product.");
      }
      console.log("res from vendor product", res);
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

  // console.log("edit product data", editProductData);
  // edit modal
  const handleEditProductModalOpen = (productData: any) => {
    console.log("product frtom fn", productData);
    setEditProductData(productData);

    onEditProductModalOpen();
  };

  // delete selected image for edit
  const handleDeleteNewProductImages = (imageToRemove: File) => {
    console.log("image to remove", imageToRemove);
    if (imageFiles.length > 0) {
      const updatedImage = imageFiles?.filter(
        (image: File) => image.name !== imageToRemove.name
      );
      console.log({ updatedImage });
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

        // if (ownerId) {
        const productData = {
          id: editProductData.id,
          ...data,
        };
        console.log("imageFiles", imageFiles);

        // }

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
          // router.push("/dashboard/AddProducts");
        }
      }
    } catch (err: any) {
      setEditProductLoading(false);
      console.log(err.message);
      onEditProductModalOpenChange();
      setUpdateProductLoadingName("Update product...");
    }
  };

  console.log("create image files", createImageFiles);
  // delete selected image for create
  const handleDeleteCreateProducts = (imageToRemove: File) => {
    console.log("image to remove", imageToRemove);
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
      console.log("image files", createImageFiles);

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
      console.log(err.message);
      onCreateProductModalChange();
      setCreateProductLoadingName("Create product...");
    }
  };

  return (
    <>
      <SidebarButton
        title={"Products"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="vendor"
        hasRightButton={true}
        handleCreateProductMNodalOpen={handleCreateProductMNodalOpen}
      />

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
                        <img alt="" className="size-12" src={item?.images[0]} />
                      </div>
                      <div>
                        <p>{item?.name.slice(0, 15)}...</p>
                        <p className="text-[#737682]">{item.category.name}</p>
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
                          // onClick={() =>
                          //   makeFlashOrFeaturedProductModalOpen(
                          //     item.id,
                          //     "featured"
                          //   )
                          // }
                          className=""
                        >
                          {/* feature btn */}
                          <span className="flex items-center gap-1">
                            <span>
                              <HiOutlineDuplicate size={20} />
                            </span>
                            <span>Duplicate</span>
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
          page={page}
          total={totalPages}
          onChange={handlePageChange}
          showControls
        />
      </div>
      <DeleteModal
        title="Product"
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
      />
      <CreateProductModal
        handleCreateProduct={handleCreateProduct}
        isOpen={isCreateProductModalOpen}
        onOpenChange={onCreateProductModalChange}
        createImageFiles={createImageFiles}
        setCreateProductImageFiles={setCreateImageFiles}
        handleDeleteCreateProducts={handleDeleteCreateProducts}
        createProductLoading={createProductLoading}
        createProductLoadingName={createProductLoadingName}
      />
      <EditProductModal
        handleUpdateProduct={handleUpdateProduct}
        editProductImages={editProductImages}
        // handleDeleteProduct={handleDeleteProduct}
        isOpen={isEditProductModalOpen}
        onOpenChange={onEditProductModalOpenChange}
        productData={editProductData}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        updateProductLoadingName={updateProductLoadingName}
        handleDeleteNewProductImages={handleDeleteNewProductImages}
        editProductLoading={editProductLoading}
      />
      {/* <EditDeleteButton /> */}
    </>
  );
};

export default VendorProducts;

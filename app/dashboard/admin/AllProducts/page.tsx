"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Pagination,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteProductMutation,
  useGetAllFeaturedProductsQuery,
  useGetAllFlashProductsQuery,
  useGetAllProductsQuery,
  useUpdateProductStatusMutation,
} from "@/app/redux/features/product/productApi";
import { IProduct, TQueryParam } from "@/types";
import Loader from "@/app/components/sharred/Loader";
import { RootState } from "@/app/redux/store";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import EmptyState from "@/app/components/dashboard/EmptyState";
import CreateProductModal from "@/app/components/modal/CreateProductModal";
import { GoPlus } from "react-icons/go";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { Button } from "@nextui-org/button";
import { IoFlashOutline } from "react-icons/io5";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";
import RemoveOrChangeProductStatusModal from "@/app/components/modal/RemoveModal";
import LoadingSkeleton from "./Loading";
import CategoryLoading from "@/app/components/dashboard/CategoryLoading";
import AllProductsLoading from "./Loading";

const AllProducts = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo, isSuccess } = useGetSingleUserQuery(userId, {
    skip: !userId,
  });
  // console.log("shopOwnerInfo", shopOwnerInfo);
  // delete modal
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();
  // create modal
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onOpenChange: onCreateModalChange,
  } = useDisclosure();

  // remove flash product
  const {
    isOpen: isRemoveFlashProductOpen,
    onOpen: onRemoveFlashProductOpen,
    onOpenChange: onRemoveFlashProductOpenChange,
  } = useDisclosure();

  // remove featured products
  const {
    isOpen: isRemoveFeaturedProductOpen,
    onOpen: onRemoveFeaturedProductOpen,
    onOpenChange: onRemoveFeaturedProductOpenChange,
  } = useDisclosure();

  // make product flash/featured modal
  const {
    isOpen: isMakeFlashOrFeaturedProductOpen,
    onOpen: makeFlashOrFeaturedProductOnOpen,
    onOpenChange: makeFlashOrFeaturedProductOnOpenChange,
  } = useDisclosure();

  const [allProductParams, setAllProductParams] = useState<
    TQueryParam[] | undefined
  >([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [flashProductsParams, setFlashProductsParams] = useState<
    TQueryParam[] | undefined
  >([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [featuredProductsParams, setFeaturedProductsParams] = useState<
    TQueryParam[] | undefined
  >([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);
  const [allProductPage, setAllProductPage] = useState(1);
  const [flashProductsPage, setFlashProductsPage] = useState(1);
  const [featuredProductsPage, setAllFeaturedProductsPage] = useState(1);

  const { data: allProducts, isLoading } =
    useGetAllProductsQuery(allProductParams);
  const { data: allFeaturedProducts, isLoading: isAllFeaturedProductLoading } =
    useGetAllFeaturedProductsQuery(featuredProductsParams);
  const { data: allFlashProducts, isLoading: isAllFlashProductLoading } =
    useGetAllFlashProductsQuery(flashProductsParams);

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();

  console.log("allProducts", allProducts);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [removeFlashProductId, setRemoveFlashProductId] = useState<
    string | null
  >(null);
  const [removeFeaturedProductId, setRemoveFeaturtedProductId] = useState<
    string | null
  >(null);

  const [makeFlashOrFeaturedProduct, setMakeFlashOrFeaturedProduct] = useState<
    | {
        id: string;
        status: string;
      }
    | undefined
  >(undefined);

  const [isOpen, setIsOpen] = useState(false);

  // console.log(user);
  if (isLoading || isAllFlashProductLoading || isAllFeaturedProductLoading) {
    return (
      <>
        <AllProductsLoading />
        <AllProductsLoading />
        <AllProductsLoading />
      </>
    );
  }

  console.log("flash products", allFlashProducts?.data);
  // for all products
  const totalProducts = allProducts?.data?.meta?.total || 0;
  const totalProductPages = Math.ceil(totalProducts / 5);

  // for flash products
  const totalFlashProducts = allFlashProducts?.data?.meta?.total || 0;
  const totalFlashProductsPages = Math.ceil(totalFlashProducts / 5);

  // for featured products
  const totalFeaturedProducts = allFeaturedProducts?.data?.meta?.total || 0;
  const totalFeaturedProductsPages = Math.ceil(totalFeaturedProducts / 5);

  // pagination handler for all products
  const handleAllProductsPageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];
    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setAllProductParams(queryParams);
  };

  // pagination handler for flash products
  const handleAllFlashProductsPageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];
    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setFlashProductsParams(queryParams);
  };

  // pagination handler for featured products
  const handleAllFeaturedProductsPageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];
    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setFeaturedProductsParams(queryParams);
  };

  //   console.log(isSuccess);
  const handleDeleteProduct = async () => {
    try {
      if (deleteModalId) {
        const res = await deleteProduct(deleteModalId);
        if (res?.data?.success) {
          toast.success("Product deleted successfully.");
          setDeleteModalId("");
        }
        onDeleteModalChange(); //   }
      }
    } catch (err) {
      toast.error("Failed to delete product!");
      setDeleteModalId("");
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  // remove flash products fn
  const handleRemoveFlashProduct = async () => {
    try {
      if (removeFlashProductId) {
        const res = await updateProductStatus({
          id: removeFlashProductId,
          status: { isFlashed: false },
        });
        if (res?.data?.success) {
          toast.success("Product removed successfully.");
          setRemoveFlashProductId("");
        }
        onRemoveFlashProductOpenChange(); //   }
      }
    } catch (err) {
      toast.error("Failed to remove product!");
      setRemoveFlashProductId("");
      onRemoveFlashProductOpenChange();
    }
  };
  // remove flash products modal open
  const handleRemoveFlashProductModalOpen = (id: string) => {
    console.log("id", id);
    setRemoveFlashProductId(id);
    onRemoveFlashProductOpen();
  };

  // remove featured products fn
  const handleRemoveFeaturedProduct = async () => {
    console.log("removeFeaturedProductId", removeFeaturedProductId);
    try {
      if (removeFeaturedProductId) {
        const res = await updateProductStatus({
          id: removeFeaturedProductId,
          status: { isFeatured: false },
        });
        if (res?.data?.success) {
          toast.success("Product removed successfully.");
          setRemoveFeaturtedProductId("");
        }
        onRemoveFeaturedProductOpenChange(); //   }
      }
    } catch (err) {
      toast.error("Failed to remove product!");
      setRemoveFeaturtedProductId("");
      onRemoveFeaturedProductOpenChange();
    }
  };
  // remove flash products modal open
  const handleRemoveFeaturedProductModalOpen = (id: string) => {
    setRemoveFeaturtedProductId(id);
    onRemoveFeaturedProductOpen();
  };

  console.log("id make", makeFlashOrFeaturedProduct?.id);
  // make flash or featured product fn
  const handleMakeFlashOrSaleProduct = async () => {
    try {
      if ((makeFlashOrFeaturedProduct as any).id) {
        const updatedProductStatus =
          makeFlashOrFeaturedProduct?.status === "flash"
            ? { isFlashed: true }
            : { isFeatured: true };
        const res = await updateProductStatus({
          id: makeFlashOrFeaturedProduct?.id,
          status: updatedProductStatus,
        });
        if (res?.data?.success) {
          toast.success("Product marked successfully.");
          setMakeFlashOrFeaturedProduct({ id: "", status: "" });
        }
        makeFlashOrFeaturedProductOnOpenChange(); //   }
      }
    } catch (err) {
      toast.error("Failed to delete product!");
      setMakeFlashOrFeaturedProduct({ id: "", status: "" });
      makeFlashOrFeaturedProductOnOpenChange();
    }
  };
  const makeFlashOrFeaturedProductModalOpen = (id: string, status: string) => {
    setMakeFlashOrFeaturedProduct({ id, status });
    makeFlashOrFeaturedProductOnOpen();
  };

  return (
    <>
      <>
        <SidebarButton
          title={"Featured Products"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          role="admin"
          className="mt-8"
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
            {!isAllFeaturedProductLoading &&
              allFeaturedProducts?.data?.data?.length > 0 &&
              allFeaturedProducts?.data?.data?.map((item: IProduct) => (
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
                  <TableCell>{item?.shop?.name}</TableCell>
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
                          onClick={() =>
                            handleRemoveFeaturedProductModalOpen(item.id)
                          }
                        >
                          <span className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            <span>Remove</span>
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
              ))}
          </TableBody>
        </Table>
        <div className="flex  justify-center mt-8">
          <Pagination
            page={featuredProductsPage}
            total={totalFeaturedProductsPages}
            onChange={handleAllFeaturedProductsPageChange}
            showControls
          />
        </div>
      </>
      <>
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
            {!isAllFlashProductLoading &&
              allFlashProducts?.data?.data?.length > 0 &&
              allFlashProducts?.data?.data?.map(
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
                          <p className="text-[#737682]">{item.category.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item?.shop?.name}</TableCell>
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
                            onClick={() =>
                              handleRemoveFlashProductModalOpen(item.id)
                            }
                          >
                            <span className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              <span>Remove</span>
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
            page={flashProductsPage}
            total={totalFlashProductsPages}
            onChange={handleAllFlashProductsPageChange}
            showControls
          />
        </div>
      </>
      <>
        <SidebarButton
          title={"All Products"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          role="admin"
          className="mt-4"
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
            {!isLoading &&
              allProducts?.data?.data?.length > 0 &&
              allProducts?.data?.data?.map(
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
                          <p className="text-[#737682]">{item.category.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item?.shop?.name}</TableCell>
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
                            onClick={() =>
                              makeFlashOrFeaturedProductModalOpen(
                                item.id,
                                "flash"
                              )
                            }
                          >
                            {/* flash button */}
                            <span className="flex items-center gap-1">
                              <span>
                                <IoFlashOutline size={20} />
                              </span>
                              <span>Flash</span>
                            </span>
                          </DropdownItem>
                          <DropdownItem
                            onClick={() =>
                              makeFlashOrFeaturedProductModalOpen(
                                item.id,
                                "featured"
                              )
                            }
                            className=""
                          >
                            {/* feature btn */}
                            <span className="flex items-center gap-2">
                              <span>
                                <MdOutlineFeaturedPlayList size={18} />
                              </span>
                              <span>Feature</span>
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
            page={allProductPage}
            total={totalProductPages}
            onChange={handleAllProductsPageChange}
            showControls
          />
        </div>
      </>
      {/* // create product modal */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onOpenChange={onCreateModalChange}
      />
      {/* delete product modal */}
      <DeleteModal
        title="Product"
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
      />
      <RemoveOrChangeProductStatusModal
        title="Remove Product"
        description="Are you sure want to remove this product?"
        hanldeRemoveProduct={handleRemoveFlashProduct}
        isOpen={isRemoveFlashProductOpen}
        onOpenChange={onRemoveFlashProductOpenChange}
      />
      <RemoveOrChangeProductStatusModal
        title="Remove Product"
        description="Are you sure want to remove this product?"
        hanldeRemoveProduct={handleRemoveFeaturedProduct}
        isOpen={isRemoveFeaturedProductOpen}
        onOpenChange={onRemoveFeaturedProductOpenChange}
      />
      <RemoveOrChangeProductStatusModal
        title={
          makeFlashOrFeaturedProduct?.status === "flash"
            ? "Mark as Flash"
            : "Mark as Featured"
        }
        description={
          makeFlashOrFeaturedProduct?.status === "flash"
            ? "Are you sure want to mark this product as flash?"
            : "Are you sure want to mark this product as featured?"
        }
        hanldeRemoveProduct={handleMakeFlashOrSaleProduct}
        isOpen={isMakeFlashOrFeaturedProductOpen}
        onOpenChange={makeFlashOrFeaturedProductOnOpenChange}
      />
    </>
  );
};

export default AllProducts;

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
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Button } from "@nextui-org/button";
import { IoFlashOutline } from "react-icons/io5";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";

import AllProductsLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteProductMutation,
  useGetAllFeaturedProductsQuery,
  useGetAllFlashProductsQuery,
  useGetAllProductsQuery,
  useUpdateProductStatusMutation,
} from "@/app/redux/features/product/productApi";
import { IProduct, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import RemoveOrChangeProductStatusModal from "@/app/components/modal/RemoveModal";

const AllProducts = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
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

  const {
    data: allProducts,
    isLoading,
    isFetching: allProductsFetching,
  } = useGetAllProductsQuery(allProductParams);
  const {
    data: allFeaturedProducts,
    isLoading: isAllFeaturedProductLoading,
    isFetching: featuredProductsFetching,
  } = useGetAllFeaturedProductsQuery(featuredProductsParams);
  const {
    data: allFlashProducts,
    isLoading: isAllFlashProductLoading,
    isFetching: flashProductsFetching,
  } = useGetAllFlashProductsQuery(flashProductsParams);

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();
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

  if (
    isLoading ||
    isAllFlashProductLoading ||
    isAllFeaturedProductLoading ||
    featuredProductsFetching ||
    flashProductsFetching ||
    allProductsFetching
  ) {
    return (
      <>
        <AllProductsLoading />
        <AllProductsLoading />
        <AllProductsLoading />
      </>
    );
  }
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
      { name: "limit", value: 5 },
    );
    setAllProductParams(queryParams);
  };

  // pagination handler for flash products
  const handleAllFlashProductsPageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 },
    );
    setFlashProductsParams(queryParams);
  };

  // pagination handler for featured products
  const handleAllFeaturedProductsPageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 },
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
    setRemoveFlashProductId(id);
    onRemoveFlashProductOpen();
  };

  // remove featured products fn
  const handleRemoveFeaturedProduct = async () => {
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
          className="mt-8"
          hasLeftButton={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Featured Products"}
          userRole="admin"
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
                              className="size-6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
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
            showControls
            initialPage={featuredProductsParams?.[0].value as number}
            total={totalFeaturedProductsPages}
            onChange={handleAllFeaturedProductsPageChange}
          />
        </div>
      </>
      <>
        <SidebarButton
          className="mt-8"
          hasLeftButton={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Flash Products"}
          userRole="admin"
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
            {!isAllFlashProductLoading &&
              allFlashProducts?.data?.data?.length > 0 &&
              allFlashProducts?.data?.data?.map(
                (item: IProduct & { brand: Record<string, any> }) => (
                  <TableRow key={item?.id}>
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
                                className="size-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
                ),
              )}
          </TableBody>
        </Table>
        <div className="flex  justify-center mt-8">
          <Pagination
            showControls
            initialPage={flashProductsParams?.[0].value as number}
            total={totalFlashProductsPages}
            onChange={handleAllFlashProductsPageChange}
          />
        </div>
      </>
      <>
        <SidebarButton
          className="mt-4"
          hasLeftButton={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"All Products"}
          userRole="admin"
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
                                "flash",
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
                            className=""
                            onClick={() =>
                              makeFlashOrFeaturedProductModalOpen(
                                item.id,
                                "featured",
                              )
                            }
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
                ),
              )}
          </TableBody>
        </Table>
        <div className="flex  justify-center mt-8">
          <Pagination
            showControls
            initialPage={allProductParams?.[0].value as number}
            total={totalProductPages}
            onChange={handleAllProductsPageChange}
          />
        </div>
      </>
      {/* delete product modal */}
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this product?"
        title="Delete Product"
        onOpenChange={onDeleteModalChange}
      />
      <RemoveOrChangeProductStatusModal
        description="Are you sure want to remove this product?"
        hanldeRemoveProduct={handleRemoveFlashProduct}
        isOpen={isRemoveFlashProductOpen}
        title="Remove Product"
        onOpenChange={onRemoveFlashProductOpenChange}
      />
      <RemoveOrChangeProductStatusModal
        description="Are you sure want to remove this product?"
        hanldeRemoveProduct={handleRemoveFeaturedProduct}
        isOpen={isRemoveFeaturedProductOpen}
        title="Remove Product"
        onOpenChange={onRemoveFeaturedProductOpenChange}
      />
      <RemoveOrChangeProductStatusModal
        description={
          makeFlashOrFeaturedProduct?.status === "flash"
            ? "Are you sure want to mark this product as flash?"
            : "Are you sure want to mark this product as featured?"
        }
        hanldeRemoveProduct={handleMakeFlashOrSaleProduct}
        isOpen={isMakeFlashOrFeaturedProductOpen}
        title={
          makeFlashOrFeaturedProduct?.status === "flash"
            ? "Mark as Flash"
            : "Mark as Featured"
        }
        onOpenChange={makeFlashOrFeaturedProductOnOpenChange}
      />
    </>
  );
};

export default AllProducts;

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

import OrdersLoading from "./Loading";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useGetVendorOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { IOrder, TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import EmptyState from "@/app/components/dashboard/EmptyState";

const ProductReviews = () => {
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

  const [isOpen, setIsOpen] = useState(false);

  const {
    data: vendorOrderHistory,
    isLoading: vendorOrderHistoryLoading,
    isFetching,
  } = useGetVendorOrderHistoryQuery(params);

  const [deleteProduct] = useDeleteProductMutation();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (vendorOrderHistoryLoading || isFetching) {
    return (
      <div>
        <OrdersLoading />
      </div>
    );
  }

  const totalOrders = vendorOrderHistory?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalOrders / 5);
  // pagination handler
  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];

    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setParams(queryParams);
  };

  const handleDeleteProduct = () => {
    if (deleteModalId) {
      deleteProduct(deleteModalId);
      onDeleteModalChange(); //   }
    }
  };

  return (
    <>
      {vendorOrderHistory?.data?.data?.length > 0 ? (
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
            label="Go Home"
            message="Orders found empty!"
            address="/"
          />
        </>
      )}
      <DeleteModal
        title="Delete Order"
        subTitle="Are you sure want to delete this order?"
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default ProductReviews;

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
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useGetUsersOrderHistoryQuery } from "@/app/redux/features/order/orderApi";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { RootState } from "@/app/redux/store";
import { IOrder, IProduct } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { useGetVendorShopQuery } from "@/app/redux/features/shop/shopApi";
import Loader from "@/app/components/sharred/Loader";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import { RiDeleteBinLine } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import { Tooltip } from "@nextui-org/tooltip";
import { EditIcon } from "@/app/components/dashboard/EditDeleteButton";
import CreateProductModal from "@/app/components/modal/CreateProductModal";
import { CgProfile } from "react-icons/cg";
import { toast } from "sonner";

const VendorProducts = () => {
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

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  console.log("vendor", userId);
  // const { data: usersOrderHistory, isLoading: userOrderHistoryLoading } =
  //   useGetUsersOrderHistoryQuery(userId as string);

  const { data: vendorShopProducts, isLoading: vendorShopProductsLoading } =
    useGetVendorShopQuery(undefined);
  // console.log("vendor shop roduycts", vendorShopProducts);

  const [deleteProduct] = useDeleteProductMutation();

  const shop = vendorShopProducts?.data?.shop;

  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [isEditDeleteSecOpen, setIsDeleteEditSecOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (vendorShopProductsLoading) {
    return <Loader />;
  }
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
      {/* <div className="flex justify-end ">
        <button>Create New</button>
      </div> */}
      <Table
        aria-label="Example static collection table"
        className="overflow-x-auto"
      >
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>PRICE </TableColumn>
          <TableColumn>SHOP NAME</TableColumn>
          <TableColumn>DISCOUNT</TableColumn>
          {/* <TableColumn>TOTAL PRICE</TableColumn> */}
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {shop?.products?.map((product: IProduct) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={product?.images[0]}
                    alt=""
                    className="size-[40px]"
                  />
                  <p className="mr-12 lg:mr-0">{product.name}</p>
                </div>
              </TableCell>
              <TableCell>{product?.discountPrice}</TableCell>
              <TableCell>{shop?.name}</TableCell>
              <TableCell>{product?.disCounts}</TableCell>
              <TableCell>
                {/* <Button onClick={() => handleDeleteModalOpen(product?.id)}>
                  Delete
                </Button> */}

                {/* <div className="relative">
                  <button
                    type="button"
                    id="radix-:rs:"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-state="closed"
                    className="outline-none"
                  >
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-athens-gray-100 bg-white text-h-black shadow-none outline-0 hover:bg-athens-gray-50 focus:outline-0 active:bg-white size-9 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-ellipsis-vertical"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>
                  </button>
                  <div className="absolute inset-0 top-5   z-40"></div>
                  {isEditDeleteSecOpen && (
                    <div className="absolute  z-50  bg-white rounded-xl shadow-md w-[100px] md:w-[7vw]  overflow-hidden right-0 top-12 text-sm">
                      <div className="flex flex-col pl-4 cursor-pointer">
                        <EditDeleteButton
                          icon={<RiDeleteBinLine size={20} />}
                          title="Delete"
                        />
                        <EditDeleteButton
                          icon={<LiaEdit size={20} />}
                          title="Edit"
                        />
                      </div>
                    </div>
                  )}
                </div> */}
                <div className="flex items-center gap-4">
                  <Tooltip content="Edit product">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Delete product" color="danger">
                    <span
                      onClick={() => handleDeleteModalOpen(product?.id)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
      />
      <CreateProductModal
        // handleDeleteProduct={handleDeleteProduct}
        isOpen={isCreateProductModalOpen}
        onOpenChange={onCreateProductModalChange}
      />
      {/* <EditDeleteButton /> */}
    </>
  );
};

export default VendorProducts;

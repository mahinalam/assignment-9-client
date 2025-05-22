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
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteModal from "@/app/components/modal/DeleteModal";
import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
import { useGetUserProductReviewQuery } from "@/app/redux/features/review/reviewApi";
import { RootState } from "@/app/redux/store";
import SidebarButton from "../SidebarButton";
import { BiDotsVerticalRounded } from "react-icons/bi";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  console.log("vendor", userId);
  const { data: userProductReviews, isLoading: userProductReviewLoading } =
    useGetUserProductReviewQuery(userId as string);

  const [deleteProduct] = useDeleteProductMutation();
  const [isOpen, setIsOpen] = useState(false);

  console.log("userProductReviews", userProductReviews);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  if (userProductReviewLoading) {
    return <div>Loading...</div>;
  }
  //   console.log(isSuccess);
  const handleDeleteProduct = () => {
    if (deleteModalId) {
      deleteProduct(deleteModalId);
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
        title={"All Products"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="user"
      />
      {/* <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>PRODUCT IMAGE</TableColumn>
          <TableColumn>PRODUCT NAME</TableColumn>
          <TableColumn>REVIEW IMAGE</TableColumn>
          <TableColumn>RATING </TableColumn>
          <TableColumn>COMMENT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {userProductReviews?.data?.map(
            (review: any) => (
              // review.map((review: IReview) => (
              <TableRow key={review.id}>
                <TableCell>
                  <img
                    alt=""
                    className="size-12"
                    src={review?.product.images[0]}
                  />
                </TableCell>
                <TableCell>{review.product.name}</TableCell>
                <TableCell>
                  <img alt="" className="size-12" src={review?.images[0]} />
                </TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteModalOpen(review.id)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleDeleteModalOpen(review.id)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            )
            // ))
          )}
        </TableBody>
      </Table> */}
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
                        // onClick={() =>
                        //   makeFlashOrFeaturedProductModalOpen(
                        //     item.id,
                        //     "flash"
                        //   )
                        // }
                        >
                          {/* flash button */}
                          <span className="flex items-center gap-1">
                            <span>{/* <IoFlashOutline size={20} /> */}</span>
                            <span>Flash</span>
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
                          <span className="flex items-center gap-2">
                            <span>
                              {/* <MdOutlineFeaturedPlayList size={18} /> */}
                            </span>
                            <span>Feature</span>
                          </span>
                        </DropdownItem>
                        <DropdownItem
                        // onClick={() => handleDeleteModalOpen(item.id)}
                        >
                          <span className="flex items-center gap-1">
                            <span>{/* <RiDeleteBin5Line size={20} /> */}</span>
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
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default ProductReviews;

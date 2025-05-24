// "use client";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
//   useDisclosure,
// } from "@nextui-org/react";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// import DeleteModal from "@/app/components/modal/DeleteModal";
// import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
// import { useGetUserProductReviewQuery } from "@/app/redux/features/review/reviewApi";
// import { RootState } from "@/app/redux/store";

// const ProductReviews = () => {
//   const {
//     isOpen: isDeleteModalOpen,
//     onOpen: onDeleteModalOpen,
//     onOpenChange: onDeleteModalChange,
//   } = useDisclosure();

//   const userId = useSelector((state: RootState) => state.auth.user?.userId);

//   console.log("vendor", userId);
//   const { data: userProductReviews, isLoading: userProductReviewLoading } =
//     useGetUserProductReviewQuery(userId as string);

//   const [deleteProduct] = useDeleteProductMutation();

//   console.log("userProductReviews", userProductReviews);
//   const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

//   if (userProductReviewLoading) {
//     return <div>Loading...</div>;
//   }
//   //   console.log(isSuccess);
//   const handleDeleteProduct = () => {
//     if (deleteModalId) {
//       deleteProduct(deleteModalId);
//       onDeleteModalChange(); //   }
//     }
//   };
//   const handleDeleteModalOpen = (id: string) => {
//     // console.log("id", id);
//     setDeleteModalId(id);
//     onDeleteModalOpen();
//   };

//   return (
//     <>
//       <Table aria-label="Example static collection table">
//         <TableHeader>
//           <TableColumn>PRODUCT IMAGE</TableColumn>
//           <TableColumn>PRODUCT NAME</TableColumn>
//           <TableColumn>REVIEW IMAGE</TableColumn>
//           <TableColumn>RATING </TableColumn>
//           <TableColumn>COMMENT</TableColumn>
//           <TableColumn>ACTION</TableColumn>
//         </TableHeader>
//         <TableBody>
//           {userProductReviews?.data?.map(
//             (review: any) => (
//               // review.map((review: IReview) => (
//               <TableRow key={review.id}>
//                 <TableCell>
//                   <img
//                     alt=""
//                     className="size-12"
//                     src={review?.product.images[0]}
//                   />
//                 </TableCell>
//                 <TableCell>{review.product.name}</TableCell>
//                 <TableCell>
//                   <img alt="" className="size-12" src={review?.images[0]} />
//                 </TableCell>
//                 <TableCell>{review.rating}</TableCell>
//                 <TableCell>{review.comment}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleDeleteModalOpen(review.id)}>
//                     Delete
//                   </Button>
//                   <Button onClick={() => handleDeleteModalOpen(review.id)}>
//                     Update
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             )
//             // ))
//           )}
//         </TableBody>
//       </Table>
//       <DeleteModal
//         handleDeleteProduct={handleDeleteProduct}
//         isOpen={isDeleteModalOpen}
//         onOpenChange={onDeleteModalChange}
//       />
//     </>
//   );
// };

// export default ProductReviews;

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

import DeleteModal from "@/app/components/modal/DeleteModal";
import {
  useDeleteReviewMutation,
  useGetAllUsersReviewQuery,
  useGetVendorProductReviewsQuery,
} from "@/app/redux/features/review/reviewApi";
import { RootState } from "@/app/redux/store";
import { TQueryParam } from "@/types";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { DeleteIcon } from "@/app/components/dashboard/EditDeleteButton";
import { toast } from "sonner";
import { LuUser } from "react-icons/lu";
import Loading from "./Loading";
// import ReviewsLoading from "./Loading";

const ProductReviews = () => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const vendorId = useSelector((state: RootState) => state.auth.user?.userId);
  const [params, setParams] = useState<TQueryParam[] | undefined>([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);

  console.log("vendor", vendorId);
  const {
    data: userReviews,
    isLoading: userReviewsLoading,
    isFetching,
  } = useGetAllUsersReviewQuery(params);

  const [deleteReview] = useDeleteReviewMutation();

  // console.log("vendorProductsReviews", vendorProductsReviews);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  if (userReviewsLoading || isFetching) {
    return <Loading />;
  }

  const totalReviews = userReviews?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalReviews / 5);

  // pagination handler
  const handlePageChange = (page: number) => {
    const queryParams: TQueryParam[] = [];
    queryParams.push(
      { name: "page", value: page },
      { name: "limit", value: 5 }
    );
    setParams(queryParams);
  };

  //   console.log(isSuccess);
  const handleDeleteProduct = async () => {
    try {
      if (deleteModalId) {
        const res = await deleteReview(deleteModalId);
        console.log("res", res);
        if (res?.data?.success) {
          toast.success("Successfully deleted review!");
        }
        onDeleteModalChange(); //   }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    console.log("id", id);
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  return (
    <>
      <SidebarButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="vendor"
        title="Reviews"
      />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>REVIEW </TableColumn>
          <TableColumn>RATING </TableColumn>
          <TableColumn>CREATED DATE </TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {userReviews?.data?.data?.map((review: any) => (
            <TableRow key={review.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={review?.product?.images[0]}
                    alt=""
                    className="size-[40px]"
                  />
                  <p className="mr-12 lg:mr-0">
                    {review?.product?.name.length > 15
                      ? review?.product?.name.slice(0, 20) + "..."
                      : review?.product?.name}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <div className="flex items-center gap-2">
                  <img src={review?.images[0]} alt="" className="size-[40px]" />
                  <p className="mr-12 lg:mr-0">
                    {review?.comment?.length > 15
                      ? review.comment.slice(0, 15) + "..."
                      : review.comment}
                  </p>
                </div>
              </TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.createdAt}</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Tooltip content="Delete review" color="danger">
                    <span
                      onClick={() => handleDeleteModalOpen(review?.id)}
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
      <div className="flex  justify-center mt-8">
        <Pagination
          page={page}
          total={totalPages}
          onChange={handlePageChange}
          showControls
        />
      </div>
      <DeleteModal
        handleDeleteProduct={handleDeleteProduct}
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalChange}
        title="Review"
        subTitle="Are you sure want to delete this review?"
      />
    </>
  );
};

export default ProductReviews;

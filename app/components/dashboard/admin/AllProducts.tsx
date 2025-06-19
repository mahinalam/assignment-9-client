// "use client";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,\
//   Button,
//   useDisclosure,
//   Dropdown,
//   DropdownTrigger,
//   DropdownItem,
//   DropdownMenu,
// } from "@nextui-org/react";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { BiDotsVerticalRounded } from "react-icons/bi";

// import SidebarButton from "../SidebarButton";

// import DeleteModal from "@/app/components/modal/DeleteModal";
// import { useDeleteProductMutation } from "@/app/redux/features/product/productApi";
// import { RootState } from "@/app/redux/store";

// const ProductReviews = () => {
//   const {
//     isOpen: isDeleteModalOpen,
//     onOpen: onDeleteModalOpen,
//     onOpenChange: onDeleteModalChange,
//   } = useDisclosure();

//   const userId = useSelector((state: RootState) => state.auth.user?.userId);

//   console.log("vendor", userId);

//   const [deleteProduct] = useDeleteProductMutation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

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
//       <SidebarButton
//         isOpen={isOpen}
//         role="user"
//         setIsOpen={setIsOpen}
//         title={"All Products"}
//       />

//       <DeleteModal
//         handleDeleteProduct={handleDeleteProduct}
//         isOpen={isDeleteModalOpen}
//         onOpenChange={onDeleteModalChange}
//       />
//     </>
//   );
// };

// export default ProductReviews;

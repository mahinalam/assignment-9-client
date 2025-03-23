"use client"; // Ensures the component is client-side rendered

import type { MenuProps } from "antd";

import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { useSelector } from "react-redux";

import GlobalSidebar from "./GlobalSidebar";

import { RootState } from "@/app/redux/store";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";

// Helper function to create menu items
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    children,
    label,
  } as MenuItem;
}

// Sidebar menu items with Next.js Link
const items: MenuItem[] = [
  getItem(<Link href="/dashboard/vendor/Overview">Overview</Link>, "overView"),
  getItem("Product Management", "product-management", [
    getItem(
      <Link href="/dashboard/vendor/AddProducts">Add Product</Link>,
      "add-product",
    ),
    getItem(
      <Link href="/dashboard/vendor/AllProducts">All Products</Link>,
      "all-products",
    ),
  ]),
  getItem("Order Management", "order-management", [
    getItem(
      <Link href="/dashboard/vendor/OrderHistory">All Orders</Link>,
      "all-orders",
    ),
  ]),
  getItem("Review Management", "review-management", [
    getItem(
      <Link href="/dashboard/vendor/Reviews">Product Reviews</Link>,
      "review",
    ),
  ]),
];

const VendorSidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user?.userId);
  const { data: currentUserInfo, isLoading: currentUserInfoLoading } =
    useGetSingleUserQuery(user, {
      skip: !user,
    });

  return <GlobalSidebar items={items} userInfo={currentUserInfo?.data} />;
};

export default VendorSidebar;

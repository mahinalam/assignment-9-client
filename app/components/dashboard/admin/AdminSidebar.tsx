"use client"; // Ensures the component is client-side rendered

import type { MenuProps } from "antd";

import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { useDispatch, useSelector } from "react-redux";

import GlobalSidebar from "../GlobalSidebar";

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
  getItem(<Link href="/dashboard/admin/Overview">Overview</Link>, "overView"),
  getItem("Product Management", "product-management", [
    getItem(
      <Link href="/dashboard/admin/AllProducts">All Products</Link>,
      "add-product",
    ),
  ]),
  getItem("Brand Management", "brand-management", [
    getItem(
      <Link href="/dashboard/admin/AllBrands">All Brands</Link>,
      "all-brands",
    ),
    getItem(
      <Link href="/dashboard/admin/CreateBrand">Add Brand</Link>,
      "create-brand",
    ),
  ]),
  getItem("Category Management", "category-management", [
    getItem(
      <Link href="/dashboard/admin/AllCategory">All Categories</Link>,
      "all-categories",
    ),
    getItem(
      <Link href="/dashboard/admin/CreateCategory">Add Category</Link>,
      "create-category",
    ),
  ]),
  getItem("Coupon Management", "coupon-management", [
    getItem(
      <Link href="/dashboard/admin/AddCoupon">Add Coupon</Link>,
      "create-coupon",
    ),
    getItem(
      <Link href="/dashboard/admin/AllCoupon">All Coupon</Link>,
      "add-coupon",
    ),
  ]),
];

const AdminSidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user?.userId);
  const { data: currentUserInfo, isLoading: currentUserInfoLoading } =
    useGetSingleUserQuery(user, {
      skip: !user,
    });
  const dispatch = useDispatch();

  console.log({ currentUserInfo });
  if (currentUserInfoLoading) {
    // return <Loader />;
  }

  return <GlobalSidebar items={items} userInfo={currentUserInfo?.data} />;
};

export default AdminSidebar;

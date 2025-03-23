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
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    children,
    label,
  } as MenuItem;
}

// Sidebar menu items with Next.js Link
const items: MenuItem[] = [
  getItem(<Link href="/dashboard/user/Overview">Overview</Link>, "overView"),
  getItem(<Link href="/dashboard/user/MyOrder">My Order</Link>, "my-order"),
  getItem(
    <Link href="/dashboard/user/MyReviews">My Reviews</Link>,
    "my-review"
  ),
  getItem(
    <Link href="/dashboard/user/FollowedShops">Followed Shops</Link>,
    "followed-shops"
  ),
];

const UserSidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user?.userId);
  const { data: currentUserInfo, isLoading: currentUserInfoLoading } =
    useGetSingleUserQuery(user, {
      skip: !user,
    });

  return <GlobalSidebar items={items} userInfo={currentUserInfo?.data} />;
};

export default UserSidebar;

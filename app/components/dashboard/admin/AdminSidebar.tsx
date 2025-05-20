// "use client"; // Ensures the component is client-side rendered

// import type { MenuProps } from "antd";

// import React from "react";
// import Link from "next/link"; // Import Link from Next.js
// import { useDispatch, useSelector } from "react-redux";

// import GlobalSidebar from "../GlobalSidebar";

// import { RootState } from "@/app/redux/store";
// import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";

// // Helper function to create menu items
// type MenuItem = Required<MenuProps>["items"][number];
// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     children,
//     label,
//   } as MenuItem;
// }

// // Sidebar menu items with Next.js Link
// const items: MenuItem[] = [
//   getItem(<Link href="/dashboard/admin/Overview">Overview</Link>, "overView"),
//   getItem("Product Management", "product-management", [
//     getItem(
//       <Link href="/dashboard/admin/AllProducts">All Products</Link>,
//       "add-product",
//     ),
//   ]),
//   getItem("Brand Management", "brand-management", [
//     getItem(
//       <Link href="/dashboard/admin/AllBrands">All Brands</Link>,
//       "all-brands",
//     ),
//     getItem(
//       <Link href="/dashboard/admin/CreateBrand">Add Brand</Link>,
//       "create-brand",
//     ),
//   ]),
//   getItem("Category Management", "category-management", [
//     getItem(
//       <Link href="/dashboard/admin/AllCategory">All Categories</Link>,
//       "all-categories",
//     ),
//     getItem(
//       <Link href="/dashboard/admin/CreateCategory">Add Category</Link>,
//       "create-category",
//     ),
//   ]),
//   getItem("Coupon Management", "coupon-management", [
//     getItem(
//       <Link href="/dashboard/admin/AddCoupon">Add Coupon</Link>,
//       "create-coupon",
//     ),
//     getItem(
//       <Link href="/dashboard/admin/AllCoupon">All Coupon</Link>,
//       "add-coupon",
//     ),
//   ]),
// ];

// const AdminSidebar: React.FC = () => {
//   const user = useSelector((state: RootState) => state.auth.user?.userId);
//   const { data: currentUserInfo, isLoading: currentUserInfoLoading } =
//     useGetSingleUserQuery(user, {
//       skip: !user,
//     });
//   const dispatch = useDispatch();

//   console.log({ currentUserInfo });
//   if (currentUserInfoLoading) {
//     // return <Loader />;
//   }

//   return <GlobalSidebar items={items} userInfo={currentUserInfo?.data} />;
// };

// export default AdminSidebar;
"use client";
import React, { useState } from "react";
import SidebarComponent from "../SidebarComponent";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineProduct } from "react-icons/ai";
import { GoCodeReview } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { PiStorefrontBold } from "react-icons/pi";
import { logout } from "@/app/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import SidebarButton from "../SidebarButton";

const AdminSidebar = ({ currentUserInfo }: any) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="lg:block hidden">
      <Link
        href="/dashboard/admin/profile"
        className="hover:bg-gray-500 bg-red-500"
      >
        <SidebarComponent
          icon={<LuUserRoundPen />}
          title="Profile"
          link="/dashboard/admin/profile"
          pathname={pathname}
        />
      </Link>
      <Link href="/dashboard/admin/AllCategory">
        <SidebarComponent
          link="/dashboard/admin/AllCategory"
          pathname={pathname}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          }
          title="Categories"
        />
      </Link>
      <Link href="/dashboard/admin/AllProducts">
        {" "}
        <SidebarComponent
          link="/dashboard/admin/AllProducts"
          pathname={pathname}
          icon={<AiOutlineProduct />}
          title="Products"
        />
      </Link>
      <Link href="/dashboard/admin/AllOrders">
        {" "}
        <SidebarComponent
          pathname={pathname}
          link="/dashboard/admin/AllOrders"
          icon={<VscListOrdered />}
          title="Orders"
        />
      </Link>
      <Link href="/dashboard/admin/coupon">
        {" "}
        <SidebarComponent
          pathname={pathname}
          link="/dashboard/admin/coupon"
          icon={<RiCouponLine />}
          title="Coupons"
        />
      </Link>
      <Link href="/dashboard/admin/review">
        {" "}
        <SidebarComponent
          link="/dashboard/admin/review"
          pathname={pathname}
          icon={<GoCodeReview />}
          title="Reviews"
        />
      </Link>
      <Link href="/dashboard/admin/store">
        <SidebarComponent
          link="/dashboard/admin/store"
          pathname={pathname}
          icon={<PiStorefrontBold />}
          title="Stores"
        />
      </Link>
      <Link href="/dashboard/admin/user">
        <SidebarComponent
          link="/dashboard/admin/user"
          pathname={pathname}
          icon={<FiUsers />}
          title="Users"
        />
      </Link>
      <div onClick={handleLogout}>
        <SidebarComponent
          link=""
          pathname={pathname}
          isLogout={true}
          icon={<MdLogout />}
          title="Logout"
        />
      </div>
    </div>
  );
};

export default AdminSidebar;

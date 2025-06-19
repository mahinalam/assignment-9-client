"use client";
import React from "react";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineProduct } from "react-icons/ai";
import { GoCodeReview } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";
import { FiUser, FiUsers } from "react-icons/fi";
import { PiStorefrontBold } from "react-icons/pi";
import { useDispatch } from "react-redux";

import SidebarComponent from "../SidebarComponent";

import { logout } from "@/app/redux/features/auth/authSlice";

const AdminSidebar = ({ currentUserInfo }: any) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="lg:block hidden">
      <div className="lg:pl-1 lg:pb-4">
        <div className="mb-3">
          {currentUserInfo?.data?.profilePhoto ? (
            <img
              alt=""
              className="size-[100px]"
              src={currentUserInfo?.data?.profilePhoto}
            />
          ) : (
            <FiUser className="rounded-full" size={70} />
          )}
        </div>
        <p className="font-bold">{currentUserInfo?.data?.name}</p>
        <p>{currentUserInfo?.data?.email}</p>
      </div>
      <Link
        className="hover:bg-gray-500 bg-red-500"
        href="/dashboard/admin/Overview"
      >
        <SidebarComponent
          icon={<LuUserRoundPen />}
          link="/dashboard/admin/Overview"
          pathname={pathname}
          title="Overview"
        />
      </Link>
      <Link
        className="hover:bg-gray-500 bg-red-500"
        href="/dashboard/admin/profile"
      >
        <SidebarComponent
          icon={<LuUserRoundPen />}
          link="/dashboard/admin/profile"
          pathname={pathname}
          title="Profile"
        />
      </Link>
      <Link href="/dashboard/admin/AllCategory">
        <SidebarComponent
          icon={
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          link="/dashboard/admin/AllCategory"
          pathname={pathname}
          title="Categories"
        />
      </Link>
      <Link href="/dashboard/admin/AllProducts">
        {" "}
        <SidebarComponent
          icon={<AiOutlineProduct />}
          link="/dashboard/admin/AllProducts"
          pathname={pathname}
          title="Products"
        />
      </Link>
      <Link href="/dashboard/admin/AllOrders">
        {" "}
        <SidebarComponent
          icon={<VscListOrdered />}
          link="/dashboard/admin/AllOrders"
          pathname={pathname}
          title="Orders"
        />
      </Link>
      <Link href="/dashboard/admin/coupon">
        {" "}
        <SidebarComponent
          icon={<RiCouponLine />}
          link="/dashboard/admin/coupon"
          pathname={pathname}
          title="Coupons"
        />
      </Link>
      <Link href="/dashboard/admin/review">
        {" "}
        <SidebarComponent
          icon={<GoCodeReview />}
          link="/dashboard/admin/review"
          pathname={pathname}
          title="Reviews"
        />
      </Link>
      <Link href="/dashboard/admin/store">
        <SidebarComponent
          icon={<PiStorefrontBold />}
          link="/dashboard/admin/store"
          pathname={pathname}
          title="Shops"
        />
      </Link>
      <Link href="/dashboard/admin/user">
        <SidebarComponent
          icon={<FiUsers />}
          link="/dashboard/admin/user"
          pathname={pathname}
          title="Users"
        />
      </Link>
      <div onClick={handleLogout}>
        <SidebarComponent
          icon={<MdLogout />}
          isLogout={true}
          link=""
          pathname={pathname}
          title="Logout"
        />
      </div>
    </div>
  );
};

export default AdminSidebar;

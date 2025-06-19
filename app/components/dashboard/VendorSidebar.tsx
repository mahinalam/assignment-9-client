"use client";
import React from "react";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { GoCodeReview } from "react-icons/go";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { RiDashboardLine } from "react-icons/ri";

import SidebarComponent from "./SidebarComponent";

import { logout } from "@/app/redux/features/auth/authSlice";

const VendorSidebar = ({ currentUserInfo }: { currentUserInfo: any }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="space-y- lg:block hidden">
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
      <Link href="/dashboard/vendor/Overview">
        <SidebarComponent
          icon={<RiDashboardLine />}
          link="/dashboard/vendor/Overview"
          pathname={pathname}
          title="Overview"
        />
      </Link>
      <Link
        className="hover:bg-gray-500 bg-red-500"
        href="/dashboard/vendor/profile"
      >
        <SidebarComponent
          icon={<LuUserRoundPen />}
          link="/dashboard/vendor/profile"
          pathname={pathname}
          title="Profile"
        />
      </Link>
      <Link href="/dashboard/vendor/AllProducts">
        {" "}
        <SidebarComponent
          icon={<AiOutlineProduct />}
          link="/dashboard/vendor/AllProducts"
          pathname={pathname}
          title="Products"
        />
      </Link>
      <Link href="/dashboard/vendor/OrderHistory">
        {" "}
        <SidebarComponent
          icon={<VscListOrdered />}
          link="/dashboard/vendor/OrderHistory"
          pathname={pathname}
          title="Orders"
        />
      </Link>
      <Link href="/dashboard/vendor/Reviews">
        {" "}
        <SidebarComponent
          icon={<GoCodeReview />}
          link="/dashboard/vendor/Reviews"
          pathname={pathname}
          title="Reviews"
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

export default VendorSidebar;

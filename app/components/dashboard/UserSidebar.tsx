"use client";
import React from "react";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { RiDashboardLine } from "react-icons/ri";
import { AiTwotoneHeart } from "react-icons/ai";
import { RiShoppingBag4Line } from "react-icons/ri";

import SidebarComponent from "./SidebarComponent";

import { logout } from "@/app/redux/features/auth/authSlice";
const UserSidebar = ({ currentUserInfo }: { currentUserInfo: any }) => {
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
        <p className="font-bold">{currentUserInfo?.data?.customer?.name}</p>
        <p>{currentUserInfo?.data?.email}</p>
      </div>
      <div className="space-y-2">
        <Link href="/dashboard/user/Overview">
          <SidebarComponent
            icon={<RiDashboardLine />}
            link="/dashboard/user/Overview"
            pathname={pathname}
            title="Overview"
          />
        </Link>
        <Link href="/dashboard/user/profile">
          <SidebarComponent
            icon={<LuUserRoundPen />}
            link="/dashboard/user/profile"
            pathname={pathname}
            title="Profile"
          />
        </Link>
        <Link href="/dashboard/user/wishlist">
          <SidebarComponent
            icon={<AiTwotoneHeart />}
            link="/dashboard/user/wishlist"
            pathname={pathname}
            title="Wishlist"
          />
        </Link>

        <Link href="/dashboard/user/MyOrder">
          {" "}
          <SidebarComponent
            icon={<VscListOrdered />}
            link="/dashboard/user/MyOrder"
            pathname={pathname}
            title="Orders"
          />
        </Link>
        <Link href="/dashboard/user/MyReviews">
          {" "}
          <SidebarComponent
            icon={<VscListOrdered />}
            link="/dashboard/user/MyReviews"
            pathname={pathname}
            title="Reviews"
          />
        </Link>
        <Link href="/dashboard/user/FollowedShops">
          <SidebarComponent
            icon={<RiShoppingBag4Line />}
            link="/dashboard/user/FollowedShops"
            pathname={pathname}
            title="Following Shops"
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
    </div>
  );
};

export default UserSidebar;

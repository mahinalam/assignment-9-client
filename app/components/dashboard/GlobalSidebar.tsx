"use client";

import type { MenuProps } from "antd";

import React from "react";
import { Menu } from "antd";
import Link from "next/link";
import Sider from "antd/es/layout/Sider";
import { useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import './
import { logout } from "@/app/redux/features/auth/authSlice";

// Helper function to create menu items
export type TMenuItem = Required<MenuProps>["items"][number];

const GlobalSidebar = ({
  items,
  userInfo,
}: {
  items: TMenuItem[];
  userInfo: any;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/profile");
  };

  return (
    <Sider
      breakpoint="md"
      // collapsedWidth="1"
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
        background: "#E21B70",
      }}
      // zeroWidthTriggerStyle={{
      //   position: "fixed",
      //   zIndex: "30",
      //   top: 0,
      //   // color: "white",
      //   // background: "#E21B70",
      //   inset: 0,
      // }}
    >
      {/* Logo */}
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/" className="md:block hidden">
          <h1 className="text-white">Electromert</h1>
        </Link>
      </div>

      {/* Menu Items */}
      <Menu
        defaultSelectedKeys={["overView"]}
        items={items}
        mode="inline"
        theme="light"
        className="custom-menu"
      />

      {/* Profile Dropdown */}
      {/* <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
        }}
      >
        <div className="relative mb-6 cursor-pointer">
          <div className=" bottom-10 text-center text-gray-300">
            <section>
              <p className="">{userInfo?.name}</p>
            </section>
          </div>
        </div>
      </div> */}
    </Sider>
  );
};

export default GlobalSidebar;

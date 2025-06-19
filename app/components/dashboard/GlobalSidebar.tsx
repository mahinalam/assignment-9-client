"use client";

import type { MenuProps } from "antd";

import React from "react";
import { Menu } from "antd";
import Link from "next/link";
import Sider from "antd/es/layout/Sider";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

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
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
        background: "#E21B70",
      }}
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
        <Link className="md:block hidden" href="/">
          <h1 className="text-white">Electromert</h1>
        </Link>
      </div>

      {/* Menu Items */}
      <Menu
        className="custom-menu"
        defaultSelectedKeys={["overView"]}
        items={items}
        mode="inline"
        theme="light"
      />
    </Sider>
  );
};

export default GlobalSidebar;

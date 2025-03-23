"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import Sidebar from "../components/dashboard/VendorSidebar"; // Vendor Sidebar
import UserSidebar from "../components/dashboard/UserSidebar";
import { RootState } from "../redux/store";
import AdminSidebar from "../components/dashboard/admin/AdminSidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // State to detect if the component is mounted
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  useEffect(() => {
    // Mark the component as mounted
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    // Prevent rendering until the client is mounted
    return null;
  }

  if (!userRole) {
    return router.push("/login");
  }

  const renderSidebar = () => {
    if (userRole === "ADMIN") {
      return <AdminSidebar />;
    } else if (userRole === "VENDOR") {
      return <Sidebar />;
    } else if (userRole === "USER") {
      return <UserSidebar />;
    } else {
      return null; // Fallback for unrecognized roles
    }
  };

  return (
    <div className="flex">
      {renderSidebar()}
      <div className="w-full ">{children}</div>
    </div>
  );
};

export default Layout;

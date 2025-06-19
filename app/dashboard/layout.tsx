"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../redux/store";
import AdminSidebar from "../components/dashboard/admin/AdminSidebar";
import UserSidebar from "../components/dashboard/UserSidebar";
import VendorSidebar from "../components/dashboard/VendorSidebar";
import Navbar from "../components/sharred/navbar/Navbar";
import { useGetSingleUserQuery } from "../redux/features/user/userApi";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import DashboardNavbar from "./DashboardNavbar";

const layout = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role;
  const { data: currentUserInfo, isLoading: currentUserLoading } =
    useGetSingleUserQuery(user?.userId);

  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const renderSidebar = () => {
    if (userRole === "ADMIN") {
      return <AdminSidebar currentUserInfo={currentUserInfo} />;
    } else if (userRole === "VENDOR") {
      return <VendorSidebar currentUserInfo={currentUserInfo} />;
    } else if (userRole === "CUSTOMER") {
      return <UserSidebar currentUserInfo={currentUserInfo} />;
    } else {
      return null;
    }
  };

  const renderNavbar = () => {
    if (userRole === "ADMIN" || "VENDOR") {
      return <DashboardNavbar currentUserInfo={currentUserInfo} />;
    } else {
      <Navbar isHaveNavSection={false} />;
    }
  };

  return (
    <>
      <div className=" ">
        {renderNavbar()}
        <DashboardContainer>
          <div className="lg:grid lg:grid-cols-12 lg:pt-8 pt-5">
            <div className="lg:col-span-3 lg:mr-6 bg-white">
              {renderSidebar()}
            </div>
            <div className="lg:col-span-9  ">{children}</div>
          </div>
        </DashboardContainer>
      </div>
    </>
  );
};

export default layout;

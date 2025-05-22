// "use client";

// import React, { ReactNode, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";

// import Sidebar from "../components/dashboard/VendorSidebar"; // Vendor Sidebar
// import UserSidebar from "../components/dashboard/UserSidebar";
// import { RootState } from "../redux/store";
// import AdminSidebar from "../components/dashboard/admin/AdminSidebar";

// const Layout = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const [isMounted, setIsMounted] = useState(false); // State to detect if the component is mounted
//   const userRole = useSelector((state: RootState) => state.auth.user?.role);

//   if (!userRole) {
//     return router.push("/login");
//   }

//   return (
//     <div className="flex">
//       {renderSidebar()}
//       <div className="w-full ">{children}</div>
//     </div>
//   );
// };

// export default Layout;

"use client";

import React, { ReactNode, useEffect, useState } from "react";
import SidebarComponent from "../components/dashboard/SidebarComponent";
import { RiDashboardLine } from "react-icons/ri";
import { LuUserRoundPen } from "react-icons/lu";
import Container from "../components/sharred/Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AdminSidebar from "../components/dashboard/admin/AdminSidebar";
import UserSidebar from "../components/dashboard/UserSidebar";
import VendorSidebar from "../components/dashboard/VendorSidebar";
import Navbar from "../components/sharred/navbar/Navbar";
import DashboardNabar from "../components/dashboard/DashboardNavbar";
import Footer from "../components/sharred/Footer";
import { useGetSingleUserQuery } from "../redux/features/user/userApi";
import DrawerSlide from "../components/dashboard/DrawerForUser";
import DrawerUserSlide from "../components/dashboard/DrawerForUser";
import DrawerVendorSlide from "../components/dashboard/DrawerVendorSlide";
import { useRouter } from "next/navigation";
import DashboardContainer from "../components/dashboard/DashboardContainer";

const layout = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false); // State to detect if the component is mounted

  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role;
  const { data: currentUserInfo, isLoading: currentUserLoading } =
    useGetSingleUserQuery(user?.userId);

  const [isUserDrawerOpen, setUserDrawerOpen] = useState(false);
  const [isVendorDrawerOpen, setVendorDrawerOpen] = useState(false);
  const [isAdminDrawerOpen, setAdminDrawerOpen] = useState(false);

  const router = useRouter();
  if (!user) {
    router.push("/login");
  }

  useEffect(() => {
    // Mark the component as mounted
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    // Prevent rendering until the client is mounted
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
      return null; // Fallback for unrecognized roles
    }
  };

  // const renderSidebarForSmallScreen = () => {
  //   if (userRole === "ADMIN") {
  //     return (
  //       <AdminSidebar
  //         isOpen={isAdminDrawerOpen}
  //         setIsOpen={setAdminDrawerOpen}
  //       />
  //     );
  //   } else if (userRole === "VENDOR") {
  //     return (
  //       <DrawerVendorSlide
  //         isOpen={isVendorDrawerOpen}
  //         setIsOpen={setVendorDrawerOpen}
  //       />
  //     );
  //   } else if (userRole === "USER") {
  //     return (
  //       <DrawerSlide isOpen={isUserDrawerOpen} setIsOpen={setUserDrawerOpen} />
  //     );
  //   } else {
  //     return null; // Fallback for unrecognized roles
  //   }
  // };

  return (
    <DashboardContainer>
      <div className="lg:mt-[100px] md:mt-[72px] mt-[62px] ">
        <Navbar isHaveNavSection={false} />
        {/* <div className="lg:grid lg:grid-cols-12 bg-[#F6F7F8]"> */}
        <div className="lg:grid lg:grid-cols-12">
          {/* sidebar */}
          <div className="lg:col-span-3 lg:mr-6 bg-white">
            {/* <SidebarComponent icon={<RiDashboardLine />} title="Dashboard" /> */}
            {renderSidebar()}
          </div>
          {/* children*/}
          <div className="lg:col-span-9  ">{children}</div>
        </div>
        {/* <Footer /> */}
      </div>
    </DashboardContainer>
  );
};

export default layout;

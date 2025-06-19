"use client";
import React, { useState } from "react";
import { LuUser, LuUserRoundPen } from "react-icons/lu";
import Link from "next/link";
import SidebarComponent from "../components/dashboard/SidebarComponent";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import DrawerVendorSlide from "../components/dashboard/DrawerVendorSlide";
import DrawerAdminSlide from "../components/dashboard/DrawerAdminSlide";

const DashboardNavbar = ({ currentUserInfo }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderSidebar = () => {
    if (currentUserInfo?.role === "VENDOR") {
      return (
        <DrawerVendorSlide isOpen={isSideOpen} setIsOpen={setIsSideOpen} />
      );
    } else {
      return <DrawerAdminSlide isOpen={isSideOpen} setIsOpen={setIsSideOpen} />;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-3 lg:p-5 border-b-border border-b">
        <div>
          <Link
            href="/"
            className="md:text-xl text-base text-primary font-semibold "
          >
            Electromert
          </Link>
        </div>

        <div className="flex items-center">
          <div className="lg:hidden block pr-2">
            <button
              onClick={() => setIsSideOpen(true)}
              className="sm:hidden text-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="relative cursor-pointer"
          >
            {currentUserInfo?.data?.profilePhoto ? (
              <div className="size-14 rounded-full">
                <img
                  alt=""
                  className="w-full h-full rounded-full"
                  src={currentUserInfo?.data?.profilePhoto}
                />
              </div>
            ) : (
              <>
                <LuUser className="rounded-full" size={40} />
              </>
            )}
            {isOpen && (
              <div className="absolute  z-50  bg-white rounded-xl shadow-md w-[40vw] md:w-[8vw]  overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col ">
                  <Link
                    href={`/dashboard/${currentUserInfo?.data?.role.toLowerCase()}/profile`}
                  >
                    <div
                      className={
                        " flex cursor-pointer items-center  gap-2 mb-1 p-2 ease-in-out rounded-lg text-gray-700 hover:text-gray-800 "
                      }
                    >
                      <span>
                        <LuUserRoundPen />
                      </span>
                      <span>Profile</span>
                    </div>
                  </Link>
                  <div onClick={handleLogout}>
                    <div
                      className={
                        " flex cursor-pointer items-center  gap-2 mb-1 p-2 ease-in-out rounded-lg text-red-500 hover:text-red-600  "
                      }
                    >
                      <span>
                        <MdLogout />
                      </span>
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {renderSidebar()}
    </>
  );
};

export default DashboardNavbar;

"use client";

import React from "react";
import DrawerUserSlide from "./DrawerForUser";
import DrawerVendorSlide from "./DrawerVendorSlide";
import DrawerAdminSlide from "./DrawerAdminSlide";

const SidebarButton = ({
  isOpen,
  setIsOpen,
  title,
  role,
  hasRightButton = false,
  handleCreateProductMNodalOpen,
  className = "",
}: {
  isOpen: boolean;
  setIsOpen: any;
  title: string;
  role: string;
  hasRightButton?: boolean;
  handleCreateProductMNodalOpen?: any;
  className?: any;
}) => {
  //   const slide = () => {
  //     if (role === "user") {
  //       return <DrawerUserSlide isOpen={isOpen} setIsOpen={setIsOpen} />;
  //     }
  //      else if (role === "vendor") {

  // } else {
  //   return <DrawerVendorSlide isOpen={isOpen} setIsOpen={setIsOpen} />;
  // }
  //   };
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* {slide()} */}
      {role === "admin" && (
        <DrawerAdminSlide isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {role === "vendor" && (
        <DrawerVendorSlide isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {role === "user" && (
        <DrawerUserSlide isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {/* {role === "vendor" && (
        <DrawerVendorSlide isOpen={isOpen} setIsOpen={setIsOpen} />
      )} */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-athens-gray-100 bg-white text-h-black shadow-none outline-0 hover:bg-athens-gray-50 focus:outline-0 active:bg-white size-9 rounded-md lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-panel-left"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M9 3v18"></path>
        </svg>
      </button>
      <div className="flex justify-between w-full">
        <h3 className="lg:text-[22px] text-xl  ">{title}</h3>
        {hasRightButton && (
          <div className="text-right w-full">
            <button
              onClick={handleCreateProductMNodalOpen}
              className="bg-primary text-sm text-white font-bold px-3 py-2 rounded-md"
            >
              Create New +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarButton;

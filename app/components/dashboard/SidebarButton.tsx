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
  hasLeftButton = true,
}: {
  isOpen: boolean;
  setIsOpen: any;
  title: string;
  role: string;
  hasRightButton?: boolean;
  handleCreateProductMNodalOpen?: any;
  className?: any;
  hasLeftButton?: boolean;
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {role === "admin" && (
        <DrawerAdminSlide isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {role === "vendor" && (
        <DrawerVendorSlide isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {role === "user" && (
        <DrawerUserSlide isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {hasLeftButton && (
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-athens-gray-100 bg-white text-h-black shadow-none outline-0 hover:bg-athens-gray-50 focus:outline-0 active:bg-white size-9 rounded-md lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <svg
            className="lucide lucide-panel-left"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="18" rx="2" width="18" x="3" y="3" />
            <path d="M9 3v18" />
          </svg>
        </button>
      )}
      <div className="flex justify-between w-full">
        <h3 className="lg:text-[22px] text-xl font-bold w-full">{title}</h3>
        {hasRightButton && (
          <div className="text-right w-full">
            <button
              className="bg-primary text-sm text-white font-bold px-3 py-2 rounded-md"
              onClick={handleCreateProductMNodalOpen}
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

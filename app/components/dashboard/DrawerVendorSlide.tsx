import Link from "next/link";
import { useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { RiSettings2Line } from "react-icons/ri";

export default function DrawerVendorSlide({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <>
      {/* Trigger button */}
      {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Open Drawer
      </button> */}
      {/* <button
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
      </button> */}

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50  transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 space-y-4">
          <Link
            href="/dashboard/vendor/profile"
            className="hover:bg-gray-500 bg-red-500"
          >
            <SidebarComponent icon={<LuUserRoundPen />} title="Dashboard" />
          </Link>
          <Link href="/dashboard/user/orders">
            {" "}
            <SidebarComponent icon={<VscListOrdered />} title="Orders" />
          </Link>
          <Link href="/dashboard/user/settings">
            {" "}
            <SidebarComponent icon={<RiSettings2Line />} title="Settings" />
          </Link>
        </div>
      </div>
    </>
  );
}

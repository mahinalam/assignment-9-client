import React from "react";

const SidebarComponent = ({
  icon,
  title,
  isLogout = false,
  pathname,
  link,
}: {
  icon: any;
  title: string;
  isLogout?: boolean;
  pathname?: string;
  link?: string;
}) => {
  return (
    <div
      className={` ${pathname === link ? "bg-gray-100" : ""} flex cursor-pointer items-center text-[#808390] gap-2 mb-2 p-3 ease-in-out rounded-lg hover:text-gray-700 ${isLogout ? "hover:bg-red-100 hover:text-red-500" : "hover:bg-gray-100"}`}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  );
};

export default SidebarComponent;

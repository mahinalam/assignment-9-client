// "use client"; // Ensures the component is client-side rendered

// import type { MenuProps } from "antd";

// import React from "react";
// import Link from "next/link"; // Import Link from Next.js
// import { useSelector } from "react-redux";

// import GlobalSidebar from "./GlobalSidebar";

// import { RootState } from "@/app/redux/store";
// import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";

// // Helper function to create menu items
// type MenuItem = Required<MenuProps>["items"][number];
// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   children?: MenuItem[]
// ): MenuItem {
//   return {
//     key,
//     children,
//     label,
//   } as MenuItem;
// }

// // Sidebar menu items with Next.js Link
// const items: MenuItem[] = [
//   getItem(<Link href="/dashboard/user/Overview">Overview</Link>, "overView"),
//   getItem(<Link href="/dashboard/user/MyOrder">My Order</Link>, "my-order"),
//   getItem(
//     <Link href="/dashboard/user/MyReviews">My Reviews</Link>,
//     "my-review"
//   ),
//   getItem(
//     <Link href="/dashboard/user/FollowedShops">Followed Shops</Link>,
//     "followed-shops"
//   ),
// ];

// const UserSidebar: React.FC = () => {
//   const user = useSelector((state: RootState) => state.auth.user?.userId);
//   const { data: currentUserInfo, isLoading: currentUserInfoLoading } =
//     useGetSingleUserQuery(user, {
//       skip: !user,
//     });

//   return <GlobalSidebar items={items} userInfo={currentUserInfo?.data} />;
// };

// export default UserSidebar;

"use client";
import React from "react";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import SidebarComponent from "./SidebarComponent";
import { RiSettings2Line } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/app/redux/features/auth/authSlice";

const UserSidebar = ({ currentUserInfo }: { currentUserInfo: any }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const handleLogout = () => {
    dispatch(logout());
  };
  console.log({ pathname });
  return (
    <div className="space-y- lg:block hidden">
      <div className="lg:pl-1 lg:pb-4">
        <div className="mb-3">
          {currentUserInfo?.data?.profilePhoto ? (
            <img
              className="size-[100px]"
              src={currentUserInfo?.data?.profilePhoto}
              alt=""
            />
          ) : (
            <FiUser size={70} className="rounded-full" />
          )}
        </div>
        <p className="font-bold">{currentUserInfo?.data?.name}</p>
        <p>{currentUserInfo?.data?.email}</p>
      </div>
      <div className="space-y-2">
        <Link
          href="/dashboard/user/profile"

          // className={` ${pathname === "//dashboard/user/profile" ? "text-black" : ""}`}
          // className={`${pathname === "/dashboard/user/profile" ? "bg-gray-100" : ""}`}
        >
          <SidebarComponent
            pathname={pathname}
            link="/dashboard/user/profile"
            icon={<LuUserRoundPen />}
            title="Profile"
          />
        </Link>
        <Link href="/dashboard/user/MyOrder">
          {" "}
          <SidebarComponent
            link="/dashboard/user/MyOrder"
            pathname={pathname}
            icon={<VscListOrdered />}
            title="Orders"
          />
        </Link>
        <Link href="/dashboard/user/settings">
          {" "}
          <SidebarComponent
            link="/dashboard/user/settings"
            pathname={pathname}
            icon={<RiSettings2Line />}
            title="Settings"
          />
        </Link>
        <div onClick={handleLogout}>
          <SidebarComponent
            pathname={pathname}
            link=""
            isLogout={true}
            icon={<MdLogout />}
            title="Logout"
          />
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;

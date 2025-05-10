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
import { AiOutlineProduct } from "react-icons/ai";
import { GoCodeReview } from "react-icons/go";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/app/redux/features/auth/authSlice";

const VendorSidebar = ({ currentUserInfo }: { currentUserInfo: any }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const handleLogout = () => {
    dispatch(logout());
  };

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
      <Link
        href="/dashboard/vendor/profile"
        className="hover:bg-gray-500 bg-red-500"
      >
        <SidebarComponent
          icon={<LuUserRoundPen />}
          title="Profile"
          link="/dashboard/vendor/profile"
          pathname={pathname}
        />
      </Link>
      <Link href="/dashboard/vendor/AllProducts">
        {" "}
        <SidebarComponent
          link="/dashboard/vendor/AllProducts"
          pathname={pathname}
          icon={<AiOutlineProduct />}
          title="Products"
        />
      </Link>
      <Link href="/dashboard/vendor/OrderHistory">
        {" "}
        <SidebarComponent
          pathname={pathname}
          link="/dashboard/vendor/OrderHistory"
          icon={<VscListOrdered />}
          title="Orders"
        />
      </Link>
      <Link href="/dashboard/vendor/Reviews">
        {" "}
        <SidebarComponent
          link="/dashboard/vendor/Reviews"
          pathname={pathname}
          icon={<GoCodeReview />}
          title="Reviews"
        />
      </Link>
      <div onClick={handleLogout}>
        <SidebarComponent
          link=""
          pathname={pathname}
          isLogout={true}
          icon={<MdLogout />}
          title="Logout"
        />
      </div>
    </div>
  );
};

export default VendorSidebar;

"use client";

import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import Loader from "../sharred/Loader";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo, isLoading } = useGetSingleUserQuery(userId);
  console.log("s", currentUserInfo);

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6">
      <Link href="/">
        {" "}
        <h2 className="text-lg font-bold mb-6">Electromert</h2>
      </Link>
      {currentUserInfo?.data?.shop?.id && (
        <Link href="/dashboard/AddShop">
          <button
            className={`block w-full text-left p-2 rounded-md mb-2 ${isActive("/dashboard/AddShop") && "bg-primary text-white font-bold"}`}
          >
            My Shop
          </button>
        </Link>
      )}
      <Link href="/dashboard/AddProducts">
        <button
          className={`block w-full text-left p-2 rounded-md mb-2 ${isActive("/dashboard/AddProducts") && "bg-primary text-white font-bold"}`}
        >
          Add Products
        </button>
      </Link>
      <Link href="/dashboard/AllProducts">
        <button
          className={`block w-full text-left p-2 rounded-md mb-2 ${isActive("/dashboard/AllProducts") && "bg-primary text-white font-bold"}`}
        >
          All Products
        </button>
      </Link>
      <Link href="/dashboard/Reviews">
        <button
          className={`block w-full text-left p-2 rounded-md mb-2 ${isActive("/dashboard/Reviews") && "bg-primary text-white font-bold"}`}
        >
          Reviews & Ratings
        </button>
      </Link>
      <Link href="/dashboard/OrderHistory">
        <button
          className={`block w-full text-left p-2 rounded-md mb-2 ${isActive("/dashboard/OrderHistory") && "bg-primary text-white font-bold"}`}
        >
          Order History
        </button>
      </Link>
    </div>
  );
};

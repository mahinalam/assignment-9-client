import Link from "next/link";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { RiDashboardLine, RiShoppingBag4Line } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { AiTwotoneHeart } from "react-icons/ai";

import SidebarComponent from "./SidebarComponent";

export default function DrawerUserSlide({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

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
            className="text-gray-500 text-xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 space-y-4">
          <Link href="/dashboard/user/Overview">
            <SidebarComponent
              icon={<RiDashboardLine />}
              link="/dashboard/user/Overview"
              pathname={pathname}
              title="Overview"
            />
          </Link>
          <Link href="/dashboard/user/profile">
            <SidebarComponent
              icon={<LuUserRoundPen />}
              link="/dashboard/user/profile"
              pathname={pathname}
              title="Profile"
            />
          </Link>
          <Link href="/dashboard/user/wishlist">
            <SidebarComponent
              icon={<AiTwotoneHeart />}
              link="/dashboard/user/wishlist"
              pathname={pathname}
              title="Wishlist"
            />
          </Link>

          <Link href="/dashboard/user/MyOrder">
            {" "}
            <SidebarComponent
              icon={<VscListOrdered />}
              link="/dashboard/user/MyOrder"
              pathname={pathname}
              title="Orders"
            />
          </Link>
          <Link href="/dashboard/user/MyReviews">
            {" "}
            <SidebarComponent
              icon={<VscListOrdered />}
              link="/dashboard/user/MyReviews"
              pathname={pathname}
              title="Reviews"
            />
          </Link>
          <Link href="/dashboard/user/FollowedShops">
            <SidebarComponent
              icon={<RiShoppingBag4Line />}
              link="/dashboard/user/FollowedShops"
              pathname={pathname}
              title="Following Shops"
            />
          </Link>

          <div className="!mt-0">
            <SidebarComponent
              icon={<MdLogout />}
              isLogout={true}
              link="/"
              pathname={pathname}
              title="Logout"
            />
          </div>
        </div>
      </div>
    </>
  );
}

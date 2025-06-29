import Link from "next/link";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import { GoCodeReview } from "react-icons/go";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";

import SidebarComponent from "./SidebarComponent";

import { logout } from "@/app/redux/features/auth/authSlice";

export default function DrawerVendorSlide({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Overlay */}
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
          <Link className="text-lg text-primary  font-semibold" href="/">
            Electromert
          </Link>
          <button
            className="text-gray-500 text-xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 space-y-4">
          <Link href="/dashboard/vendor/Overview">
            <SidebarComponent
              icon={<RiDashboardLine />}
              link="/dashboard/vendor/Overview"
              pathname={pathname}
              title="Overview"
            />
          </Link>
          <Link
            className="hover:bg-gray-500 bg-red-500"
            href="/dashboard/vendor/profile"
          >
            <SidebarComponent
              icon={<LuUserRoundPen />}
              link="/dashboard/vendor/profile"
              pathname={pathname}
              title="Profile"
            />
          </Link>
          <Link href="/dashboard/vendor/AllProducts">
            {" "}
            <SidebarComponent
              icon={<AiOutlineProduct />}
              link="/dashboard/vendor/AllProducts"
              pathname={pathname}
              title="Products"
            />
          </Link>
          <Link href="/dashboard/vendor/OrderHistory">
            {" "}
            <SidebarComponent
              icon={<VscListOrdered />}
              link="/dashboard/vendor/OrderHistory"
              pathname={pathname}
              title="Orders"
            />
          </Link>
          <Link href="/dashboard/vendor/Reviews">
            {" "}
            <SidebarComponent
              icon={<GoCodeReview />}
              link="/dashboard/vendor/Reviews"
              pathname={pathname}
              title="Reviews"
            />
          </Link>
          <div onClick={handleLogout}>
            <SidebarComponent
              icon={<MdLogout />}
              isLogout={true}
              link=""
              pathname={pathname}
              title="Logout"
            />
          </div>
        </div>
      </div>
    </>
  );
}

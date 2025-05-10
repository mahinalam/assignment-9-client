import Link from "next/link";
import SidebarComponent from "./SidebarComponent";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import { AiOutlineProduct } from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { GoCodeReview } from "react-icons/go";
import { PiStorefrontBold } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "@/app/redux/features/auth/authSlice";

export default function DrawerAdminSlide({
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
            <SidebarComponent
              icon={<LuUserRoundPen />}
              title="Profile"
              link="/dashboard/vendor/profile"
              pathname={pathname}
            />
          </Link>
          <Link href="/dashboard/admin/AllCategory">
            <SidebarComponent
              link="/dashboard/admin/AllCategory"
              pathname={pathname}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              }
              title="Categories"
            />
          </Link>
          <Link href="/dashboard/admin/AllProducts">
            {" "}
            <SidebarComponent
              link="/dashboard/vendor/AllProducts"
              pathname={pathname}
              icon={<AiOutlineProduct />}
              title="Products"
            />
          </Link>
          <Link href="/dashboard/admin/OrderHistory">
            {" "}
            <SidebarComponent
              pathname={pathname}
              link="/dashboard/vendor/OrderHistory"
              icon={<VscListOrdered />}
              title="Orders"
            />
          </Link>
          <Link href="/dashboard/admin/coupon">
            {" "}
            <SidebarComponent
              pathname={pathname}
              link="/dashboard/admin/coupon"
              icon={<RiCouponLine />}
              title="Coupons"
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
          <Link href="/dashboard/vendor/Reviews">
            {" "}
            <SidebarComponent
              link="/dashboard/vendor/Reviews"
              pathname={pathname}
              icon={<PiStorefrontBold />}
              title="Stores"
            />
          </Link>
          <Link href="/dashboard/vendor/Reviews">
            <SidebarComponent
              link="/dashboard/vendor/Reviews"
              pathname={pathname}
              icon={<FiUsers />}
              title="Users"
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
      </div>
    </>
  );
}

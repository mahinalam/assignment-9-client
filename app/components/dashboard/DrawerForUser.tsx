import Link from "next/link";
import SidebarComponent from "./SidebarComponent";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { RiSettings2Line } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";

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
            href="/dashboard/user/profile"
            className="hover:bg-gray-500 bg-red-500"
          >
            <SidebarComponent
              link="/dashboard/user/profile"
              pathname={pathname}
              icon={<LuUserRoundPen />}
              title="Profile"
            />
          </Link>
          <Link href="/dashboard/user/MyOrder">
            <SidebarComponent
              link="/dashboard/user/MyOrder"
              pathname={pathname}
              icon={<VscListOrdered />}
              title="Orders"
            />
          </Link>
          <Link href="/dashboard/user/settings">
            <SidebarComponent
              link="/dashboard/user/settings"
              pathname={pathname}
              icon={<RiSettings2Line />}
              title="Settings"
            />
          </Link>

          <div className="!mt-0">
            <SidebarComponent
              link="/"
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

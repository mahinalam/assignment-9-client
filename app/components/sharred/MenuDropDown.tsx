"use client";

import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import Avatar from "./Avatar";

import { RootState } from "@/app/redux/store";
import { logout } from "@/app/redux/features/auth/authSlice";

const MenuDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        {/* {!role && <button disabled={!user} onClick={() => setIsModalOpen(true)} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer '>
                    AirCNC your home
                </button>} */}

        <div className="hidden md:block text-sm font-semibold" />
        <div
          className="p-4 md:py-1 md:px-2 md:border-[1px] md:border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <button className="btn btn-square btn-ghost">
            <svg
              className="inline-block w-5 h-5 stroke-current text-white"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {/* <Link
                            to='/'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                            Home
                        </Link> */}
            {/* {user ? user.role === "VENDOR" && (
              <>
                <Link
                  href="/dashboard/my-bookings"
                  className="px-4  py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Dashboard
                </Link>
                <div
                  //   onClick={logOut}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )} */}

            {!user ? (
              <>
                <Link
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  href="/signup"
                >
                  Signup
                </Link>
              </>
            ) : user.role === "VENDOR" ? (
              <>
                <Link
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  href="/dashboard/AllProducts"
                >
                  Dashboard
                </Link>
                <span
                  onClick={handleLogout}
                  //   href="/dashboard/AllProducts"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <Link
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  href="/signup"
                >
                  My Profile
                </Link>
                <span
                  onClick={handleLogout}
                  //   href="/dashboard/AllProducts"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Logout
                </span>
              </>
            )}
          </div>
        </div>
      )}
      {/* <HostRequestModal
        modalHandler={modalHandler}
        email={user?.email}
        isOpen={isModalOpen}
        closeModal={closeModal}
      ></HostRequestModal> */}
    </div>
  );
};

export default MenuDropDown;

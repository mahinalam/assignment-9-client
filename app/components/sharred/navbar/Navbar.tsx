"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { Badge } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LuUser } from "react-icons/lu";

import Container from "../Container";

import { RootState } from "@/app/redux/store";
import { logout } from "@/app/redux/features/auth/authSlice";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { useGetCartQuantityQuery } from "@/app/redux/features/cart/cartApi";

const Navbar = ({
  isHaveNavSection = true,
}: {
  isHaveNavSection?: boolean;
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isSmallProfileOpen, setIsSmallProfileOpen] = useState(false); // Mobile menu state
  const [query, setQuery] = useState("");
  const [smallSearchIcon, setSmallSearchIcon] = useState(false);

  const { data: categoryData } = useGetAllCategoriesQuery(null);
  const { data: cartData } = useGetCartQuantityQuery(null);

  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role;

  const { data: currentUserInfo } = useGetSingleUserQuery(user?.userId, {
    skip: !user?.userId,
  });

  const dispatch = useDispatch();

  const pathname = usePathname();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const searchValue = (form as any).search.value;

    router.push(`/products?search=${searchValue}`);
  };

  const handleSearchForSmall = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const searchValue = (form as any).search.value;

    router.push(`/products?search=${searchValue}`);
    setSmallSearchIcon(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCategory = (categoryName: string) => {
    router.push(`/products?category=${categoryName}`);
  };

  const handleNavigateForSmallDevice = (link: string) => {
    setIsOpen(false);
    router.push(link);
  };

  return (
    <div
      className={`bg-primary text-white py-3 md:py-6 fixed top-0 right-0 left-0 z-10  px-3 sm:px-0 ${isHaveNavSection ? "lg:h-[160px]" : "lg:h-[100px]"}`}
    >
      <Container>
        <div className="hidden lg:block">
          <div className="flex items-center justify-between">
            {/* home button */}
            <section className="font-bold text-2xl">
              <Link href="/">
                <span className="md:text-xl text-base">Electromert</span>
              </Link>
            </section>

            {/* Search form */}
            <form className="flex items-center w-1/2" onSubmit={handleSearch}>
              <Input
                className="w-full  text-black"
                name="search"
                placeholder="Search in Electromert"
                radius="none"
                size="lg"
                type="text"
              />
              <Button
                className="bg-pink-200 border-0.5 border-pink-200"
                radius="none"
                size="lg"
                type="submit"
              >
                <svg
                  className="size-6 text-primary font-bold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </form>

            {/* Cart */}
            <section className="pl-10">
              <Link href="/cart">
                <Badge
                  className="bg-white text-primary text-xs font-bold"
                  content={user ? cartData?.data?.totalQuantity || 0 : 0}
                  placement="top-right"
                >
                  <svg
                    className="size-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Badge>
              </Link>
            </section>

            {/* Mobile Hamburger Menu */}
            <button
              className="sm:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Dropdown & Navbar Links */}
        {isHaveNavSection && (
          <div
            className={`lg:flex hidden justify-between items-center gap-4 mt-6`}
          >
            <div
              className="relative inline-block"
              onMouseEnter={() => setIsDropdownVisible(true)}
              onMouseLeave={() => setIsDropdownVisible(false)}
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <p className="m-0">All Categories</p>
                <button>
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              {isDropdownVisible && (
                <div className="absolute left-0 z-10 w-60 bg-white rounded-lg shadow-lg border">
                  <ul className="py-2">
                    {categoryData?.data?.data?.map(
                      (category: any, index: any) => (
                        <li
                          key={index}
                          className="px-4 py-2 text-sm text-left text-gray-700 hover:text-primary cursor-pointer"
                        >
                          <button onClick={() => handleCategory(category.id)}>
                            {category.name}
                          </button>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className={` ${pathname === "/" ? "text-black" : ""}`}
                // href="/"
              >
                <p>Home</p>
              </Link>
              <Link
                className={` ${pathname === "/products" ? "text-black" : ""}`}
                href="/products"
              >
                <p>Products</p>
              </Link>
              <Link
                className={` ${pathname === "/flash" ? "text-black" : ""}`}
                href="/flash"
              >
                <p>Flash</p>
              </Link>
              <Link
                className={` ${pathname === "/store" ? "text-black" : ""}`}
                href="/store"
              >
                <p>Shops</p>
              </Link>
              <Link
                className={` ${pathname === "/compare" ? "text-black" : ""}`}
                href="/compare"
              >
                <p>Compare</p>
              </Link>
              <Link
                className={` ${pathname === "/contact" ? "text-black" : ""}`}
                href="/contact"
              >
                <p>Contact</p>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {/* <button>Become a Seller</button> */}
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                {user && currentUserInfo?.data?.profilePhoto ? (
                  <>
                    <div className="size-14 rounded-full">
                      <img
                        alt=""
                        className="w-full h-full rounded-full"
                        src={currentUserInfo?.data?.profilePhoto}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <LuUser size={50} />
                  </>
                )}
                {/* bsolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-black overflow-hidden right-0 top-12 text-sm */}
                {isOpen && (
                  <div className="absolute  z-50  bg-white rounded-xl shadow-md w-[40vw] md:w-[10vw]  overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col pl-4 cursor-pointer">
                      {!user ? (
                        <>
                          <Link
                            className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                            href="/login"
                          >
                            Login
                          </Link>
                          <Link
                            className=" text-black  py-2 hover:bg-neutral-100 transition font-semibold"
                            href="/signup"
                          >
                            Signup
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                            href={`/dashboard/${userRole?.toLowerCase() === "customer" ? "user" : userRole?.toLowerCase()}/profile`}
                          >
                            Profile
                          </Link>
                          <Link
                            className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                            href={`/dashboard/${userRole?.toLowerCase() === "customer" ? "user" : userRole?.toLowerCase()}/Overview`}
                          >
                            Dashboard
                          </Link>
                          <span
                            className=" text-red-500  py-2 hover:bg-neutral-100 transition font-semibold"
                            onClick={handleLogout}
                          >
                            Logout
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden md:text-base text-sm absolute top-14 left-0 right-0 bg-white text-black shadow-md rounded-md p-4">
            {/* <Link href="/"> */}
            <p
              className={`py-2 border-b-1 hover:text-primary ${pathname === "/" ? "text-primary" : ""}`}
              onClick={() => handleNavigateForSmallDevice("/")}
            >
              Home
            </p>
            {/* </Link> */}
            <p
              className={`py-2 border-b-1 hover:text-primary ${pathname === "/products" ? "text-primary" : ""}`}
              onClick={() => handleNavigateForSmallDevice("/products")}
            >
              Products
            </p>
            <p
              className={`py-2 border-b-1 hover:text-primary ${pathname === "/flash" ? "text-primary" : ""}`}
              onClick={() => handleNavigateForSmallDevice("/flash")}
            >
              Flash
            </p>

            <p
              className={`py-2 border-b-1 hover:text-primary ${pathname === "/store" ? "text-primary" : ""}`}
              onClick={() => handleNavigateForSmallDevice("/store")}
            >
              Shops
            </p>
            <p
              className={`py-2 border-b-1 hover:text-primary ${pathname === "/compare" ? "text-primary" : ""}`}
              onClick={() => handleNavigateForSmallDevice("/compare")}
            >
              Compare
            </p>
            <p
              className={`py-2 border-b-1 hover:text-primary ${pathname === "/contact" ? "text-primary" : ""}`}
              onClick={() => handleNavigateForSmallDevice("/contact")}
            >
              Contact
            </p>
          </div>
        )}

        <div className="block lg:hidden relative">
          {smallSearchIcon && (
            <form
              className=" flex sm:hidden items-center fixed top-[55px] left-0 right-0 w-full"
              onSubmit={handleSearchForSmall}
            >
              {/* search button for small sc */}
              <Input
                className="w-full !bg-white"
                name="search"
                placeholder="Search in Electromert"
                radius="none"
                size="md"
                type="text"
              />
              <Button
                className="bg-white "
                radius="none"
                size="md"
                type="submit"
              >
                <svg
                  className="size-6 text-primary font-bold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </form>
          )}
          <div className="flex items-center justify-between ">
            <div className="">
              <button
                className=" text-white md:pl-5"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12h18M3 6h18M3 18h18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            {/* logo section */}
            <section className="w-1/3 sm:hidden block">
              <Link href="/">Electromert</Link>
            </section>
            <form
              className="sm:flex items-center hidden lg:hidden"
              onSubmit={handleSearch}
            >
              <Input
                className="w-full  text-black"
                name="search"
                placeholder="Search in Electromert"
                radius="none"
                size="lg"
                type="text"
              />
              <Button
                className="bg-pink-200 border-0.5 border-pink-200"
                radius="none"
                size="lg"
                type="submit"
              >
                <svg
                  className="size-6 text-primary font-bold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </form>
            {/* <Button
              className="bg-pink-200 border-0.5 border-pink-200 hidden sm:block  lg:hidden xl:hidden 2xl:hidden "
              radius="none"
              size="lg"
              type="submit"
            >
              <svg
                className="size-6 text-primary font-bold"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button> */}
            {/* cart & search icon */}
            <section className=" ">
              <div className="flex items-center justify-end gap-2">
                {/* search icon */}
                <svg
                  className={
                    smallSearchIcon
                      ? "text-slate-300 size-6 block sm:hidden"
                      : "size-6 block sm:hidden"
                  }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setSmallSearchIcon((val) => !val)}
                >
                  <path
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* cart icon*/}
                {/* <Link className="mt-2 md:pr-5" href="/cart">
                  <Badge
                    className="bg-white text-primary text-xs font-bold"
                    content={user ? cartData?.data?.totalQuantity || 0 : 0}
                    placement="top-right"
                    size="sm"
                  >
                    <svg
                      className="size-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Badge>
                </Link> */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => setIsSmallProfileOpen((state) => !state)}
                >
                  {user && currentUserInfo?.data?.profilePhoto ? (
                    <>
                      <div className="size-14 rounded-full">
                        <img
                          alt=""
                          className="w-full h-full rounded-full"
                          src={currentUserInfo?.data?.profilePhoto}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <LuUser size={24} />
                    </>
                  )}
                  {/* bsolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-black overflow-hidden right-0 top-12 text-sm */}
                  {isSmallProfileOpen && (
                    <div className="absolute  z-50  bg-white rounded-xl shadow-md w-[40vw] md:w-[10vw]  overflow-hidden right-0 top-12 text-sm">
                      <div className="flex flex-col pl-4 cursor-pointer">
                        {!user ? (
                          <>
                            <Link
                              className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                              href="/login"
                            >
                              Login
                            </Link>
                            <Link
                              className=" text-black  py-2 hover:bg-neutral-100 transition font-semibold"
                              href="/signup"
                            >
                              Signup
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                              href={`/dashboard/${userRole?.toLowerCase() === "customer" ? "user" : userRole?.toLowerCase()}/profile`}
                            >
                              Profile
                            </Link>
                            <Link
                              className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                              href={`/dashboard/${userRole?.toLowerCase() === "customer" ? "user" : userRole?.toLowerCase()}/Overview`}
                            >
                              Dashboard
                            </Link>
                            <span
                              className=" text-red-500  py-2 hover:bg-neutral-100 transition font-semibold"
                              onClick={handleLogout}
                            >
                              Logout
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

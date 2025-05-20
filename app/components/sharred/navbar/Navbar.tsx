"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { Badge } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

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
  const [query, setQuery] = useState("");
  const [smallSearchIcon, setSmallSearchIcon] = useState(false);

  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetAllCategoriesQuery(null);
  const { data: cartData, isLoading: cartDataLoading } =
    useGetCartQuantityQuery(null);

  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role;

  const { data: currentUserInfo, isLoading: curentUserInfoLoading } =
    useGetSingleUserQuery(user?.userId, { skip: !user?.userId });

  const dispatch = useDispatch();

  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${query}`);
      setSmallSearchIcon(false);
    }
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
            <form
              className="hidden sm:flex items-center w-1/2"
              onSubmit={handleSearch}
            >
              <Input
                className="w-full"
                placeholder="Search in Electromert"
                radius="none"
                size="lg"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                className="bg-pink-200 border-0.5 border-pink-200"
                radius="none"
                type="submit"
                size="lg"
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
                      )
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
                className={` ${pathname === "/store" ? "text-black" : ""}`}
                href="/store"
              >
                <p>Shops</p>
              </Link>
              <Link
                className={` ${pathname === "/contact" ? "text-black" : ""}`}
                href="/contact"
              >
                <p>Contact</p>
              </Link>
              {user && (
                <Link href={`/dashboard/${userRole?.toLowerCase()}/Overview`}>
                  <p>Dashboard</p>
                </Link>
              )}
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
                    {" "}
                    <svg
                      className="size-14  w-full text-center "
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
                            href="/profile"
                          >
                            Profile
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
              onClick={() => handleNavigateForSmallDevice("/")}
              className="py-2 border-b-1 hover:text-primary"
            >
              Home
            </p>
            {/* </Link> */}
            <p
              onClick={() => handleNavigateForSmallDevice("/products")}
              className="py-2 border-b-1"
            >
              Products
            </p>
            <p
              onClick={() => handleNavigateForSmallDevice("/store")}
              className="py-2 border-b-1"
            >
              Shops
            </p>
            <p
              onClick={() => handleNavigateForSmallDevice("/contact")}
              className="py-2 border-b-1"
            >
              Contact
            </p>
            {user && (
              <Link href={`/dashboard/${userRole?.toLowerCase()}/Overview`}>
                <p className="py-2 border-b-1">Dashboard</p>
              </Link>
            )}
          </div>
        )}

        <div className="block lg:hidden relative">
          {smallSearchIcon && (
            <form
              className=" flex items-center fixed top-[62px]  w-full"
              onSubmit={handleSearch}
            >
              <Input
                className="w-full !bg-white"
                placeholder="Search in Electromert"
                radius="none"
                size="md"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                className="bg-white"
                radius="none"
                type="submit"
                size="md"
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
          <div className="flex items-center justify-between">
            <div className="w-1/3">
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
            {/* <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden "> */}
            <Input
              className="w-full hidden sm:block lg:hidden xl:hidden 2xl:hidden "
              placeholder="Search in Electromert"
              radius="none"
              size="lg"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className="bg-pink-200 border-0.5 border-pink-200 hidden sm:block  lg:hidden xl:hidden 2xl:hidden "
              radius="none"
              type="submit"
              size="lg"
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
            {/* </div> */}
            {/* cart & search icon */}
            <section className="w-1/3">
              <div className="flex items-center justify-end gap-2">
                {/* search icon */}
                <svg
                  onClick={() => setSmallSearchIcon((val) => !val)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={
                    smallSearchIcon
                      ? "text-slate-300 size-6 block sm:hidden"
                      : "size-6 block sm:hidden"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                {/* cart icon*/}
                <Link href="/cart" className="mt-2 md:pr-5">
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
                </Link>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

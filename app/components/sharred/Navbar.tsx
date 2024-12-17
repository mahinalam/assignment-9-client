// // "use client";

// // // import { increment } from "@/app/redux/features/counter/counterSlice";
// // import { RootState } from "@/app/redux/store";
// // import { Input } from "@nextui-org/input";
// // import { useDispatch, useSelector } from "react-redux";

// // const Navbar = () => {
// //   // const count = useSelector((state: RootState) => state.counter.value);
// //   const dispatch = useDispatch();
// //   return (
// //     <>
// //       <div className="bg-[#F85606] flex py-5 text-white justify-center">
// //         <section>Daraz</section>
// //         <section>Home</section>
// //         <section>Icon #F85606</section>
// //       </div>
// //     </>
// //   );
// // };

// // export default Navbar;

// "use client";

// import {
//   Navbar as NextUINavbar,
//   NavbarContent,
//   NavbarMenu,
//   NavbarMenuToggle,
//   NavbarBrand,
//   NavbarItem,
//   NavbarMenuItem,
// } from "@nextui-org/navbar";
// import { Link } from "@nextui-org/link";
// import { link as linkStyles } from "@nextui-org/theme";
// import NextLink from "next/link";
// import clsx from "clsx";
// import { Button } from "@nextui-org/button";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";
// import { siteConfig } from "@/config/site";
// // import NavbarDropdown from "./NavbarDropDown";
// import { logout } from "@/app/redux/features/auth/authSlice";
// import { useEffect, useState } from "react";

// // import NavbarDropdown from "./NavbarDropdown";

// // import NavbarDropdown from "./NavbarDropDown";

// // import { siteConfig } from "@/src/config/site";
// // import { ThemeSwitch } from "@/src/components/UI/theme-switch";
// // import { useUser } from "@/src/context/user.provider";
// // import { Logo } from "@/src/assests/icons";
// // import { Logo } from "@/src/assets/icons";
// export const Navbar = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   // Ensure client-side rendering
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return null; // Prevent server rendering mismatch
//   }

//   const handleLogout = () => {
//     console.log("logout clicked");
//     dispatch(logout());
//   };

//   return (
//     <NextUINavbar className="w-full">
//       <NavbarContent className="basis-1/5 sm:basis-full">
//         <NavbarBrand as="li" className="gap-3 ">
//           <NextLink className="flex justify-start items-center gap-1" href="/">
//             {/* <Logo /> */}
//             <p className="font-bold text-inherit">Daraz</p>
//           </NextLink>
//         </NavbarBrand>
//         <ul className="hidden lg:flex gap-4 justify-start ml-2">
//           {siteConfig.navItems.map((item) => (
//             <NavbarItem key={item.href}>
//               <NextLink
//                 className={clsx(
//                   linkStyles({ color: "foreground" }),
//                   "data-[active=true]:text-primary data-[active=true]:font-medium"
//                 )}
//                 color="foreground"
//                 href={item.href}
//               >
//                 {item.label}
//               </NextLink>
//             </NavbarItem>
//           ))}
//         </ul>
//       </NavbarContent>

//       <NavbarContent
//         className="hidden sm:flex basis-1/5 sm:basis-full"
//         justify="end"
//       >
//         {/* <NavbarItem className="hidden sm:flex gap-2">
//         </NavbarItem> */}
//         {user?.email ? (
//           <NavbarItem className="hidden sm:flex gap-2">
//             <p>{user.email}</p>
//             <button onClick={handleLogout}>Logout</button>
//           </NavbarItem>
//         ) : (
//           <NavbarItem className="hidden sm:flex gap-2">
//             <Link href="/login">
//               <Button>Login</Button>
//             </Link>
//           </NavbarItem>
//         )}

//         <NavbarItem className="hidden sm:flex gap-2">
//           <NextLink href="/cart" className="cursor-ponter">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke-width="1.5"
//               stroke="currentColor"
//               className="size-6"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//               />
//             </svg>
//           </NextLink>
//         </NavbarItem>
//       </NavbarContent>

//       <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
//         {/* <ThemeSwitch /> */}
//         <NavbarMenuToggle />
//       </NavbarContent>

//       <NavbarMenu>
//         <div className="mx-4 mt-2 flex flex-col gap-2">
//           {siteConfig.navMenuItems.map((item, index) => (
//             <NavbarMenuItem key={`${item}-${index}`}>
//               <Link
//                 color={
//                   index === 2
//                     ? "primary"
//                     : index === siteConfig.navMenuItems.length - 1
//                       ? "danger"
//                       : "foreground"
//                 }
//                 href="#"
//                 size="lg"
//               >
//                 {item.label}
//               </Link>
//             </NavbarMenuItem>
//           ))}
//         </div>
//       </NavbarMenu>
//     </NextUINavbar>
//   );
// };

"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "@/app/redux/store";
import { siteConfig } from "@/config/site";
import { logout } from "@/app/redux/features/auth/authSlice";
import { Button } from "@nextui-org/react";

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const totalCartQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // console.log(carts);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleLogout = () => {
    console.log("logout clicked");
    dispatch(logout());
  };

  return (
    <NextUINavbar className="w-full bg-[#F85606]">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <NavbarContent>
          <NavbarBrand as="li" className="gap-3">
            <NextLink className="flex items-center gap-1" href="/">
              <p className="font-bold text-white">Daraz</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "text-white hover:text-gray-300"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent className="hidden sm:flex items-center gap-4">
          {user?.email ? (
            <NavbarItem className="flex gap-2">
              <p className="text-white">{user.email}</p>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Link href="/login">
                <Button className="bg-white text-[#F85606]">Login</Button>
              </Link>
            </NavbarItem>
          )}
          {/* 
          <NavbarItem>
            <NextLink href="/cart" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </NextLink>
          </NavbarItem> */}

          <NavbarItem>
            <NextLink className="relative cursor-pointer" href="/cart">
              {/* Cart Icon */}
              <svg
                className="size-7 text-white"
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

              {/* Badge for Total Items */}
              <span className="absolute -top-2 -right-2 bg-white text-[#F57224]  text-xs font-bold rounded-full px-2 py-0.5">
                {totalCartQuantity || 0}
                {/* Replace with dynamic cart item count */}
              </span>
            </NextLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenuToggle className="sm:hidden text-white" />

        <NavbarMenu>
          <div className="flex flex-col gap-2 px-4">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="text-white"
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </div>
    </NextUINavbar>
  );
};

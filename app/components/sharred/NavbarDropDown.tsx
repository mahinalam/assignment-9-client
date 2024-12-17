// "use client";

// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@nextui-org/dropdown";
// import { usePathname, useRouter } from "next/navigation";
// import { Avatar } from "@nextui-org/avatar";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";
// import { logout } from "@/app/redux/features/auth/authSlice";

// // import { protectedRoutes } from "@/src/constant";

// export default function NavbarDropdown() {
//   const user = useSelector((state: RootState) => state.auth.user);

//   const router = useRouter();
//   const pathname = usePathname();

//   const handleNavigation = (pathname: string) => {
//     router.push(pathname);
//   };

//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Avatar className="cursor-pointer" src={""} />
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Static Actions">
//         <DropdownItem>Profile</DropdownItem>
//         <DropdownItem>Settings</DropdownItem>
//         <DropdownItem>Create Post</DropdownItem>
//         <DropdownItem
//           key="delete"
//           className="text-danger"
//           color="danger"
//           onClick={() => handleLogout()}
//         >
//           Logout
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }

"use client";

import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import Loader from "@/app/components/sharred/Loader";
import { AiOutlineMail } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { TbUserEdit } from "react-icons/tb";
import DrawerSlide from "@/app/components/dashboard/DrawerForUser";
import SidebarComponent from "@/app/components/dashboard/SidebarComponent";
import { LuUserRoundPen } from "react-icons/lu";
import { VscListOrdered } from "react-icons/vsc";
import { RiSettings2Line } from "react-icons/ri";
import SidebarButton from "@/app/components/dashboard/SidebarButton";

const AdminProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: userInfo, isLoading: userDataLoading } = useGetSingleUserQuery(
    user?.userId
  );
  const [isOpen, setIsOpen] = useState(false);

  console.log("user info from profile", userInfo);
  if (userDataLoading) {
    return <Loader />;
  }
  // const { id, email, name, role, address } = userInfo;

  //   <Link
  //   href="/"
  //   className="hover:bg-gray-500 bg-red-500"
  // >
  //   <SidebarComponent icon={<LuUserRoundPen />} title="Profile" />
  // </Link>
  // <Link href="/dashboard/user/orders">
  //   {" "}
  //   <SidebarComponent icon={<VscListOrdered />} title="Orders" />
  // </Link>
  // <Link href="/dashboard/user/settings">
  //   {" "}
  //   <SidebarComponent icon={<RiSettings2Line />} title="Settings" />
  // </Link>

  return (
    <div>
      <SidebarButton
        title={"My Profile"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="user"
      />
      {/* image section */}
      <div>
        {userInfo?.data?.profilePhoto ? (
          <img
            className="size-[300px]"
            src={userInfo?.data?.profilePhoto}
            alt=""
          />
        ) : (
          <FiUser size={90} />
        )}
      </div>
      {/* text section */}
      <div>
        <p className="lg:text-xl font-bold mb-3">{userInfo?.data?.name}</p>
        <div className="flex items-center gap-5 ">
          <section className="flex items-center gap-2 text-[#808390]">
            <span>
              <AiOutlineMail size={20} />
            </span>
            <span>{userInfo?.data?.email}</span>
          </section>
          <section className="flex items-center gap-2 text-[#808390] !mt-0">
            <span>
              <BiUserPlus size={20} />
            </span>
            <span className="text-primary">{userInfo?.data?.role}</span>
          </section>
          <section className="flex items-center gap-2 text-[#808390] !mt-0">
            <span>
              <GrLocation size={20} />
            </span>
            <span className="">{userInfo?.data?.address}</span>
          </section>
        </div>
        <p className="text-[#808390] mt-3">
          Passionate about discovering the latest trends in fashion,
          electronics, and home decor. Abdul Khaled loves sharing honest reviews
          and recommendations for products that add value to everyday life. A
          savvy shopper with a knack for finding great deals and unique items.
          Interests: Gadgets, Lifestyle Products, Sustainable Living, and
          Minimalist Design.
        </p>
        {/* btn  */}
        <button className="text-[#808390] mt-8 flex gap-2 items-center rounded-[6px] font-medium px-4 py-2 border-[1px] text-sm border-[#eaebed] hover:bg-gray-100 hover:ease-in-out">
          <TbUserEdit size={20} /> <span>Edit Profile</span>
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;

"use client";

import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import Loader from "@/app/components/sharred/Loader";
import { AiOutlineMail } from "react-icons/ai";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import ProfileInput from "./ProfileInput";
import GTSelect from "@/app/components/form/GTSelect";
import { GoMultiSelect } from "react-icons/go";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: userInfo, isLoading: userDataLoading } = useGetSingleUserQuery(
    user?.userId
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  console.log("user info from profile", userInfo);
  if (userDataLoading) {
    return <Loader />;
  }

  const { name, email, address, phoneNumber, profilePhoto } = userInfo?.data;
  const genderOption = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "other", label: "other" },
  ];

  return (
    <div className="bg-white ">
      <SidebarButton
        title={"My Profile"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="user"
      />
      {/* image section */}
      <div className="my-4">
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
      {/* <div>
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
        <button className="text-[#808390] mt-8 flex gap-2 items-center rounded-[6px] font-medium px-4 py-2 border-[1px] text-sm border-[#eaebed] hover:bg-gray-100 hover:ease-in-out">
          <TbUserEdit size={20} /> <span>Edit Profile</span>
        </button>
      </div> */}
      {/* <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 sm:gap-0">

        <div>
          <p className="text-[#424242] mb-3 text-sm font-medium">Full Name</p>
          <p>Mahin Alam</p>
        </div>
        <div>
          <p className="text-[#424242] mb-3 text-sm">Email Address</p>
          <p>Mahin Alam</p>
          <div className="hidden lg:block">
            <div className="flex mt-3 ">
              <Checkbox defaultChecked size="sm" />
              <p className="text-xs ">Receive marketing emails</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[#424242] mb-3 text-sm">Mobile</p>
          <p>+8801644955769</p>
          <div className="hidden lg:block">
            <div className="flex mt-3 ">
              <Checkbox defaultChecked size="sm" />
              <p className="text-xs ">Receive marketing SMS</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[#424242] mb-3 text-sm ">Birthday</p>
          <p>Please enter your birthday</p>
        </div>
        <div>
          <p className="text-[#424242] mb-3 text-sm ">Gender</p>
          <p>male</p>
        </div>
      </div> */}
      <section>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <ProfileInput
            title="Name"
            id="name"
            name="name"
            placeholder="John Doe"
            defaultValue={name}
            isEditProfileOpen={isEditProfileOpen}
          />
          <ProfileInput
            title="Email Address"
            id="email"
            name="email"
            placeholder="abc@gmail.com"
            defaultValue={email}
            isEditProfileOpen={isEditProfileOpen}
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <ProfileInput
            title="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+8801234567890"
            defaultValue={phoneNumber}
            isEditProfileOpen={isEditProfileOpen}
          />
          <ProfileInput
            title="Address"
            id="address"
            name="address"
            placeholder="Dhaka, Bangladesh"
            defaultValue={address}
            isEditProfileOpen={isEditProfileOpen}
          />
        </div>
        <div className="">
          {" "}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="" className="font-medium text-sm ">
                Select Gender
              </label>
              <Select
                defaultSelectedKeys={["male"]}
                className="mt-2"
                // label="Select Gender"
              >
                {genderOption.map((animal) => (
                  <SelectItem
                    className="!bg-transparent"
                    variant="bordered"
                    key={animal.key}
                  >
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <p className="mb-2 lg:mt-0 mt-6 text-sm font-medium">
                Upload Profile
              </p>
              <label
                htmlFor="image"
                className="flex cursor-pointer items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all hover:bg-athens-gray-50/10"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-athens-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-folder-open-dot size-5 text-athens-gray-500"
                  >
                    <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"></path>
                    <circle cx="14" cy="15" r="1"></circle>
                  </svg>
                </div>
                <div>
                  <h5 className="font-semibold text-athens-gray-600">
                    Upload Your Files
                  </h5>
                  <small className="text-sm text-athens-gray-400">
                    Click to browse JPG or PNG formats.
                  </small>
                </div>
              </label>
              <input
                type="file"
                className="w-full hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                name="image"
                id="image"
                placeholder="Jhon Deo"
              ></input>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditProfileOpen && (
            <button
              onClick={() => setEditProfileOpen(false)}
              className="bg-gray-200 px-[60px] py-[10px] rounded-[2px] "
            >
              Cancel
            </button>
          )}
          {!isEditProfileOpen ? (
            <>
              <button
                onClick={() => setEditProfileOpen(true)}
                className="bg-[#1A9CB7] px-[60px] py-[10px] rounded-[2px] text-white"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={() => setEditProfileOpen(true)}
                className="bg-[#1A9CB7] px-[60px] py-[10px] rounded-[2px] text-white"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;

"use client";

import {
  useGetSingleUserQuery,
  useUpdateMyProfileMutation,
} from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import Loader from "@/app/components/sharred/Loader";
import { AiOutlineMail } from "react-icons/ai";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import ProfileInput from "./ProfileInput";
import GTSelect from "@/app/components/form/GTSelect";
import { GoMultiSelect } from "react-icons/go";
import { image } from "@nextui-org/theme";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: userInfo, isLoading: userDataLoading } = useGetSingleUserQuery(
    user?.userId
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const [updatedProfileData, setUpdatedProfileData] = useState({
    ...userInfo?.data,
  });

  const [updateProfile] = useUpdateMyProfileMutation();

  useEffect(() => {
    if (userInfo?.data) {
      setUpdatedProfileData(userInfo.data);
    }
  }, [userInfo]);
  //
  // console.log("user info from profile", updatedProfileData);
  if (userDataLoading) {
    return <Loader />;
  }

  console.log("user info", userInfo);
  // console.log("selected value", selectedValue);
  // const { name, email, address, phoneNumber, profilePhoto } = userInfo?.data;
  const genderOption = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "other", label: "other" },
  ];

  const handleUpdateProfile = async () => {
    const toastId = toast.loading("Updating profile...");
    try {
      const updatedProfileInfo = {
        name: updatedProfileData.name,
        email: updatedProfileData.email,
        phoneNumber: updatedProfileData.phoneNumber,
        address: updatedProfileData.address,
        gender: updatedProfileData.gender,
      };
      console.log("updatedProfileInfo", updatedProfileInfo);
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedProfileInfo));
      formData.append("profilePhoto", imageFile as File);
      const res = await updateProfile(formData).unwrap();

      if (res?.success) {
        toast.success("Profile updated successfully!", { id: toastId });
        setEditProfileOpen(false);
      }
    } catch (err: any) {
      toast.error("Failed to update profile", { id: toastId });
    }
  };

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
            className="size-[200px]"
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
      <div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <ProfileInput
            title="Name"
            id="name"
            name="name"
            placeholder="John Doe"
            defaultValue={userInfo?.data?.name}
            isEditProfileOpen={isEditProfileOpen}
            setUpdatedProfileData={setUpdatedProfileData}
            updatedProfileData={updatedProfileData}
          />
          <ProfileInput
            title="Email Address"
            id="email"
            name="email"
            placeholder="abc@gmail.com"
            defaultValue={userInfo?.data?.email}
            isEditProfileOpen={isEditProfileOpen}
            setUpdatedProfileData={setUpdatedProfileData}
            updatedProfileData={updatedProfileData}
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6 md:mt-0">
          <ProfileInput
            title="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+8801234567890"
            defaultValue={userInfo?.data?.phoneNumber}
            isEditProfileOpen={isEditProfileOpen}
            setUpdatedProfileData={setUpdatedProfileData}
            updatedProfileData={updatedProfileData}
          />
          <ProfileInput
            title="Address"
            id="address"
            name="address"
            placeholder="Dhaka, Bangladesh"
            defaultValue={userInfo?.data?.address}
            isEditProfileOpen={isEditProfileOpen}
            setUpdatedProfileData={setUpdatedProfileData}
            updatedProfileData={updatedProfileData}
          />
        </div>
        <div className="">
          {" "}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:mt-0 mt-6">
            <div>
              <label htmlFor="" className="font-medium text-sm ">
                Select Gender
              </label>
              <Select
                onChange={(e) =>
                  setUpdatedProfileData({
                    ...updatedProfileData,
                    gender: e.target.value,
                  })
                }
                isDisabled={!isEditProfileOpen}
                defaultSelectedKeys={
                  userInfo?.data?.gender ? [userInfo?.data?.gender] : undefined
                }
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
              <p className="mb-2 lg:mt-0  text-sm font-medium">
                Upload Profile
              </p>
              <label
                htmlFor="image"
                className={`flex ${isEditProfileOpen ? "cursor-pointer hover:bg-athens-gray-50/10" : "cursor-not-allowed"} items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all`}
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
                    Click to browse JPG,JPEG or PNG formats.
                  </small>
                </div>
              </label>
              <input
                disabled={!isEditProfileOpen}
                onChange={(e) => setImageFile(e.target?.files?.[0])}
                type="file"
                className="w-full  hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                name="image"
                id="image"
                placeholder="Jhon Deo"
              ></input>
              {imageFile && (
                <div className="relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-athens-gray-100">
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
                      className="lucide lucide-image size-4 text-athens-gray-800"
                    >
                      <rect
                        width="18"
                        height="18"
                        x="3"
                        y="3"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                  </div>
                  <div>
                    <h6 className="!text-sm">{imageFile?.name}</h6>
                    <p className="!text-xs !text-athens-gray-500">{`${imageFile ? Number(imageFile?.size) / 1000 : 0.0} KB`}</p>
                  </div>
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <button onClick={() => setImageFile(undefined)}>
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
                        className="lucide lucide-trash2 size-4 text-athens-gray-500 transition-all hover:text-athens-gray-800"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" x2="10" y1="11" y2="17"></line>
                        <line x1="14" x2="14" y1="11" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-2 md:mt-2 mt-10 ">
          {isEditProfileOpen && (
            <button
              onClick={() => setEditProfileOpen(false)}
              className="bg-gray-200 md:px-[60px] md:py-[10px] py-3 w-full md:w-auto  rounded-[2px] "
            >
              Cancel
            </button>
          )}
          {!isEditProfileOpen ? (
            <>
              <button
                onClick={() => setEditProfileOpen(true)}
                className="bg-[#1A9CB7] md:px-[60px] md:py-[10px] py-3 w-full md:w-auto rounded-[2px] text-white"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  handleUpdateProfile();
                }}
                className="bg-[#1A9CB7] md:px-[60px] md:py-[10px] py-3 w-full md:w-auto rounded-[2px] text-white"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

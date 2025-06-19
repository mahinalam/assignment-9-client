"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { Select, SelectItem } from "@nextui-org/react";
import { toast } from "sonner";

import ProfileInput from "./ProfileInput";

import SidebarButton from "@/app/components/dashboard/SidebarButton";
import Loader from "@/app/components/sharred/Loader";
import { RootState } from "@/app/redux/store";
import {
  useGetSingleUserQuery,
  useUpdateMyProfileMutation,
} from "@/app/redux/features/user/userApi";
import Loading from "./Loading";

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
  if (userDataLoading) {
    return <Loading />;
  }
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
      <div className="mb-5">
        <SidebarButton
          isOpen={isOpen}
          role="user"
          setIsOpen={setIsOpen}
          title={"My Profile"}
        />
      </div>
      {/* image section */}
      <div className="my-4">
        {userInfo?.data?.profilePhoto ? (
          <img
            alt=""
            className="size-[200px]"
            src={userInfo?.data?.profilePhoto}
          />
        ) : (
          <FiUser size={90} />
        )}
      </div>
      <div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <ProfileInput
            defaultValue={userInfo?.data?.name}
            id="name"
            isEditProfileOpen={isEditProfileOpen}
            name="name"
            placeholder="John Doe"
            setUpdatedProfileData={setUpdatedProfileData}
            title="Name"
            updatedProfileData={updatedProfileData}
          />
          <ProfileInput
            defaultValue={userInfo?.data?.email}
            id="email"
            isEditProfileOpen={isEditProfileOpen}
            name="email"
            placeholder="abc@gmail.com"
            setUpdatedProfileData={setUpdatedProfileData}
            title="Email Address"
            updatedProfileData={updatedProfileData}
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6 md:mt-0">
          <ProfileInput
            defaultValue={userInfo?.data?.phoneNumber}
            id="phoneNumber"
            isEditProfileOpen={isEditProfileOpen}
            name="phoneNumber"
            placeholder="+8801234567890"
            setUpdatedProfileData={setUpdatedProfileData}
            title="Phone Number"
            updatedProfileData={updatedProfileData}
          />
          <ProfileInput
            defaultValue={userInfo?.data?.address}
            id="address"
            isEditProfileOpen={isEditProfileOpen}
            name="address"
            placeholder="Dhaka, Bangladesh"
            setUpdatedProfileData={setUpdatedProfileData}
            title="Address"
            updatedProfileData={updatedProfileData}
          />
        </div>
        <div className="">
          {" "}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:mt-0 mt-6">
            <div>
              <label className="font-medium text-sm " htmlFor="">
                Select Gender
              </label>
              <Select
                defaultSelectedKeys={
                  userInfo?.data?.gender ? [userInfo?.data?.gender] : undefined
                }
                isDisabled={!isEditProfileOpen}
                onChange={(e) =>
                  setUpdatedProfileData({
                    ...updatedProfileData,
                    gender: e.target.value,
                  })
                }
                className="mt-2"
                // label="Select Gender"
              >
                {genderOption.map((animal) => (
                  <SelectItem
                    key={animal.key}
                    className="!bg-transparent"
                    variant="bordered"
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
                className={`flex ${isEditProfileOpen ? "cursor-pointer hover:bg-athens-gray-50/10" : "cursor-not-allowed"} items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all`}
                htmlFor="image"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-athens-gray-50">
                  <svg
                    className="lucide lucide-folder-open-dot size-5 text-athens-gray-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                    <circle cx="14" cy="15" r="1" />
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
                className="w-full  hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                disabled={!isEditProfileOpen}
                id="image"
                name="image"
                placeholder="Jhon Deo"
                type="file"
                onChange={(e) => setImageFile(e.target?.files?.[0])}
              />
              {imageFile && (
                <div className="relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-athens-gray-100">
                    <svg
                      className="lucide lucide-image size-4 text-athens-gray-800"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <div>
                    <h6 className="!text-sm">{imageFile?.name}</h6>
                    <p className="!text-xs !text-athens-gray-500">{`${imageFile ? Number(imageFile?.size) / 1000 : 0.0} KB`}</p>
                  </div>
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <button onClick={() => setImageFile(undefined)}>
                      <svg
                        className="lucide lucide-trash2 size-4 text-athens-gray-500 transition-all hover:text-athens-gray-800"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
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
              className="bg-secondary md:px-[60px] md:py-[10px] py-3 w-full md:w-auto  rounded-[2px] "
              onClick={() => setEditProfileOpen(false)}
            >
              Cancel
            </button>
          )}
          {!isEditProfileOpen ? (
            <>
              <button
                className="bg-primary text-white md:px-[60px] md:py-[10px] py-3 w-full md:w-auto rounded-[2px]"
                onClick={() => setEditProfileOpen(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-primary text-white md:px-[60px] md:py-[10px] py-3 w-full md:w-auto rounded-[2px] "
                onClick={() => {
                  handleUpdateProfile();
                }}
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

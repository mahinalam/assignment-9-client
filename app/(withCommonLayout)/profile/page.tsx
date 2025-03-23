"use client";

import { Button } from "@nextui-org/button";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import Loader from "@/app/components/sharred/Loader";
import {
  useGetSingleUserQuery,
  useUpdateMyProfileMutation,
} from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";

const ProfilePage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const [updateProfile] = useUpdateMyProfileMutation();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { data: currentUserInfo, isLoading: currentUserInfoLoading } =
    useGetSingleUserQuery(currentUser?.userId, { skip: !currentUser?.userId });

  if (!currentUser) {
    return router.push("/login");
  }

  if (currentUserInfoLoading) {
    return <Loader />;
  }

  console.log("current user", currentUserInfo);
  const onSubmit = async (data: any) => {
    // check if the new and confirm password matched

    // console.log("form data", data);
    try {
      const updatedProfileInfo = {
        email: currentUser?.email,
        ...data,
      };

      console.log("updatedProfileInfo", updatedProfileInfo);
      const formData = new FormData();

      formData.append("data", JSON.stringify(updatedProfileInfo));

      formData.append("profilePhoto", imageFile as File);
      console.log("form data", formData);
      const res = await updateProfile(formData).unwrap();

      if (res?.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    console.log({ file });
    setImageFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full mt-36">
      <>
        <h1>Personal Info</h1>
        <div className="flex items-center justify-center  w-full">
          <div className=" w-full  bg-white">
            <GTForm onSubmit={onSubmit}>
              <div className="py-3">
                <GTInput
                  defaultValue={currentUserInfo?.data?.name}
                  label="Name *"
                  name="name"
                  type="text"
                />
              </div>
              <div className="py-3">
                <GTInput
                  readonly
                  defaultValue={currentUserInfo?.data?.email}
                  label="Email address *"
                  name="email"
                  type="email"
                />
              </div>
              <div className="py-3">
                <GTInput
                  defaultValue={currentUserInfo?.data?.phoneNumber}
                  label="Phone number *"
                  name="phoneNumber"
                  type="text"
                />
              </div>
              <div className="py-3">
                <GTInput
                  defaultValue={currentUserInfo?.data?.address}
                  label="Address *"
                  name="address"
                  type="text"
                />
              </div>
              <div className="min-w-fit flex-1 ">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200  shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  <span className=""> Upload Profile Image</span>
                </label>
                <input
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
                {imagePreviews.length > 0 && (
                  <div className="flex gap-5 my-5 flex-wrap">
                    {imagePreviews.map((imageDataUrl) => (
                      <div
                        key={imageDataUrl}
                        className="relative size-36 rounded-xl border-2 border-dashed border-default-300 p-2"
                      >
                        <img
                          alt="item"
                          className="h-full w-full object-cover object-center rounded-md"
                          src={imageDataUrl}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* 
              <div>
                <h1>Password Change</h1>
                <div className="py-3">
                  <GTInput
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                  />
                </div>
                <div className="py-3">
                  <GTInput
                    label="New Password"
                    name="newPassword"
                    type="password"
                  />
                </div>
                <div className="py-3">
                  <GTInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                </div>
              </div> */}

              <Button
                className="my-3  rounded-md bg-primary  font-semibold text-white"
                size="lg"
                type="submit"
              >
                Save Changes
              </Button>
            </GTForm>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProfilePage;

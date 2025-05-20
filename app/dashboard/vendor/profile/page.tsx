"use client";
import {
  useGetSingleUserQuery,
  useUpdateMyProfileMutation,
} from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import Button from "./Button";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import ShopInfo from "@/app/components/dashboard/ShopInfo";
import {
  useGetVendorShopQuery,
  useUpdateShopMutation,
} from "@/app/redux/features/shop/shopApi";
import Loader from "@/app/components/sharred/Loader";
import ProfileInput from "../../user/profile/ProfileInput";
import { toast } from "sonner";

const VendorProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: userInfo, isLoading: userDataLoading } = useGetSingleUserQuery(
    user?.userId
  );
  const [updatedProfileData, setUpdatedProfileData] = useState({
    ...userInfo?.data,
  });

  const { data: vendorShopProducts, isLoading: vendorShopProductsLoading } =
    useGetVendorShopQuery(undefined);
  const [updatedShopData, setUpdatedShopdata] = useState({
    ...vendorShopProducts?.data,
  });

  console.log("vendor shop", vendorShopProducts);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditShopButtonOpen, setIsEditShopButtonOpen] = useState(false);
  // const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"personal" | "shop">("personal");
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [shopImage, setShopImage] = useState<File | undefined>(undefined);

  const [updateProfile] = useUpdateMyProfileMutation();
  const [updateShopData] = useUpdateShopMutation();

  // for user info
  useEffect(() => {
    if (userInfo?.data) {
      setUpdatedProfileData(userInfo.data?.admin);
    }
  }, [userInfo]);

  // for shop info
  useEffect(() => {
    if (vendorShopProducts?.data) {
      setUpdatedShopdata(vendorShopProducts.data);
    }
  }, [vendorShopProducts]);

  if (vendorShopProductsLoading) {
    return <Loader />;
  }

  console.log("vendor shop product", vendorShopProducts);

  const genderOption = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "other", label: "other" },
  ];

  // fn for update user profile
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

  const shopInfo = vendorShopProducts?.data?.vendor?.shop;

  // fn for update shop info
  const hanldeUpdateShopInfo = async () => {
    const toastId = toast.loading("Updating shop info...");
    try {
      const updatedShopInfo = {
        name: updatedShopData.name,
        description: updatedShopData.description,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedShopInfo));
      if (shopImage) {
        formData.append("logoImage", shopImage);
      }
      const res = await updateShopData(formData).unwrap();

      if (res?.success) {
        toast.success("Shop updated successfully!", { id: toastId });
        setIsEditShopButtonOpen(false);
      }
    } catch (err: any) {
      toast.error("Failed to update shop", { id: toastId });
    }
  };

  console.log({ shopImage });
  return (
    <div className="pt-8">
      <SidebarButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="vendor"
        title="My Profile"
      />
      <section className="flex justify-between">
        <div>
          {" "}
          {/* image */}
          <div className="mb-6 flex lg:block mt-4">
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
            <div className="lg:hidden block gap-2 pt-6 lg:pt-0">
              <p className="font-bold lg:text-xl text-lg">
                {userInfo?.data?.name}
              </p>
            </div>
          </div>
          {/* text section */}
          {/* <div>
            <div className="lg:block hidden">
              <div className="flex gap-2 ">
                <p className="font-bold lg:text-xl">{userInfo?.data?.name}</p>
                <p className="text-gray-600 lg:text-base">
                  Owner of Alam's Tech
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 mt-3 ">
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
                electronics, and home decor. Abdul Khaled loves sharing honest
                reviews and recommendations for products that add value to
                everyday life. A savvy shopper with a knack for finding great
                deals and unique items. Interests: Gadgets, Lifestyle Products,
                Sustainable Living, and Minimalist Design.
              </p>
            </div>
          </div> */}
        </div>
        {/* <div className="inline-flex items-start lg:mt-4 gap-1 text-[#61626C] ">
          <button>1</button>
          <button>Followers</button>
        </div> */}
      </section>

      <section className="pb-6  pt-5">
        <div className="flex items-center justify-end gap-2">
          <div onClick={() => setActiveTab("personal")}>
            <Button isActive={activeTab === "personal"} title="Personal Info" />
          </div>
          <div onClick={() => setActiveTab("shop")}>
            <Button isActive={activeTab === "shop"} title="Shop Info" />
          </div>
        </div>
      </section>

      {/* personal info */}
      {activeTab === "personal" ? (
        <>
          <div className="bg-white md:mt-5">
            <div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <ProfileInput
                  title="Name"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  defaultValue={userInfo?.data?.vendor?.name}
                  isEditProfileOpen={isEditProfileOpen}
                  setUpdatedProfileData={setUpdatedProfileData}
                  updatedProfileData={updatedProfileData}
                />
                <ProfileInput
                  title="Email Address"
                  id="email"
                  name="email"
                  placeholder="abc@gmail.com"
                  defaultValue={userInfo?.data?.vendor?.email}
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
                  defaultValue={userInfo?.data?.vendor?.phoneNumber}
                  isEditProfileOpen={isEditProfileOpen}
                  setUpdatedProfileData={setUpdatedProfileData}
                  updatedProfileData={updatedProfileData}
                />
                <ProfileInput
                  title="Address"
                  id="address"
                  name="address"
                  placeholder="Dhaka, Bangladesh"
                  defaultValue={userInfo?.data?.vendor?.address}
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
                        userInfo?.data?.vendor?.gender
                          ? [userInfo?.data?.vendor?.gender]
                          : undefined
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
        </>
      ) : (
        <>
          <section>
            <ShopInfo
              isEditShopButtonOpen={isEditShopButtonOpen}
              setIsEditShopButtonOpen={setIsEditShopButtonOpen}
              shopInfo={shopInfo}
              hanldeUpdateShopInfo={hanldeUpdateShopInfo}
              shopImage={shopImage}
              setShopImage={setShopImage}
            />
          </section>
        </>
      )}

      {/* btn */}
    </div>
  );
};

export default VendorProfilePage;

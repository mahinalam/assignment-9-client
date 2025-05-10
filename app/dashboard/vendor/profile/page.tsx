"use client";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { TbUserEdit } from "react-icons/tb";
import { useSelector } from "react-redux";
import Button from "./Button";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import ShopInfo from "@/app/components/dashboard/ShopInfo";
import { useGetVendorShopQuery } from "@/app/redux/features/shop/shopApi";
import Loader from "@/app/components/sharred/Loader";
const VendorProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: userInfo, isLoading: userDataLoading } = useGetSingleUserQuery(
    user?.userId
  );

  const { data: vendorShopProducts, isLoading: vendorShopProductsLoading } =
    useGetVendorShopQuery(undefined);
  console.log("vendor shop products from profile", vendorShopProducts);

  const [isOpen, setIsOpen] = useState(false);
  // const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"personal" | "shop">("personal");

  if (vendorShopProductsLoading) {
    return <Loader />;
  }

  const shopInfo = vendorShopProducts?.data?.shop;

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
          <div className="mb-6 flex lg:block">
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
              <p className="text-gray-600 lg:text-base text-sm">
                Owner of Alam's Tech
              </p>
            </div>
          </div>
          {/* text section */}
          <div>
            <div className="lg:block hidden">
              <div className="flex gap-2 ">
                <p className="font-bold lg:text-xl">{userInfo?.data?.name}</p>
                <p className="text-gray-600 lg:text-base">
                  Owner of Alam's Tech
                </p>
              </div>
            </div>
            <div>
              {/* <p className="lg:text-xl font-bold mb-3">{userInfo?.data?.name}</p> */}
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
              {/* btn  */}
              {/* <button className="text-[#808390] mt-8 flex gap-2 items-center rounded-[6px] font-medium px-4 py-2 border-[1px] text-sm border-[#eaebed] hover:bg-gray-100 hover:ease-in-out">
                <TbUserEdit size={20} /> <span>Edit Profile</span>
              </button> */}
            </div>
          </div>
        </div>
        {/* <div className="inline-flex items-start lg:mt-4 gap-1 text-[#61626C] ">
          <button>1</button>
          <button>Followers</button>
        </div> */}
      </section>

      <section className="flex justify-between border-b-1 pb-6 lg:pt-10 pt-8">
        <div>
          <p className="lg:text-xl text-lg font-semibold">Customize Profile</p>
        </div>
        {/* <div className="flex w-full flex-col">
          <Tabs aria-label="Options">
            <Tab key="photos" title="Photos">
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="music" title="Music">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title="Videos">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div> */}
        <div className="flex items-center gap-2">
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
          <div>
            <section className="grid  grid-cols-1 lg:grid-cols-2 border-b-1 lg:pt-16 pt-8">
              <div>
                <p className="lg:text-xl font-semibold">Profile Info</p>
                <p className="text-[#737682] mt-1">
                  Change profile picture it must be 1mb
                </p>
              </div>
              <div>
                <p className="mb-2 lg:mt-0 mt-6">Upload Profile</p>
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
                <div className="lg:mt-4 mt-5 mb-6 lg:mb-0">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                    name="name"
                    id="name"
                    placeholder="Jhon Deo"
                  ></input>
                </div>
              </div>
            </section>
            {/* 
      contact info */}
            <section className="grid grid-cols-1 lg:grid-cols-2 mt-8 border-b-1 ">
              <div>
                <p className="lg:text-xl font-semibold">Contact Info</p>
                <p className="text-[#737682] mt-1">
                  Change your email address and phone number
                </p>
              </div>
              <div>
                <div className="lg:mt-4 mt-5  ">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-1"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="w-full mt-1 hover:cursor-not-allowed rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                    name="email"
                    id="email"
                    placeholder="abc@gmail.com"
                  ></input>
                </div>
                <div className="mb-6 lg:mb-0 lg:mt-4 mt-5">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-1"
                    htmlFor="email"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="w-full mt-1 hover:cursor-not-allowed rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                    name="address"
                    id="address"
                    placeholder="abc@gmail.com"
                  ></input>
                </div>
              </div>
            </section>

            {/* others section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 mt-8 ">
              <div>
                <p className="lg:text-xl font-semibold">Others</p>
                <p className="text-[#737682] mt-1">Change your bio</p>
              </div>
              <div>
                <div className="lg:mt-4 mt-5  ">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-1"
                    htmlFor="email"
                  >
                    Bio
                  </label>
                  <textarea
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                    name="bio"
                    id="bio"
                    placeholder="Write about yourself."
                    rows={7}
                  ></textarea>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <>
          <section>
            <ShopInfo shopInfo={shopInfo} />
          </section>
        </>
      )}

      {/* btn */}
      <div className="mt-4 flex justify-end">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-white transition-all hover:bg-rose-500 active:bg-rose-700 h-9 px-4 py-2 min-w-24">
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
            className="lucide lucide-save"
          >
            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
            <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
          </svg>
          Save
        </button>
      </div>
    </div>
  );
};

export default VendorProfilePage;

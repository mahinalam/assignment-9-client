"use client";
import DrawerUserSlide from "@/app/components/dashboard/DrawerForUser";
import SidebarButton from "@/app/components/dashboard/SidebarButton";
import Container from "@/app/components/sharred/Container";
import React, { useState } from "react";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="">
        <SidebarButton
          title={"Settings"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          role="user"
        />
        {/* profile info */}
        <section className="grid  grid-cols-1 lg:grid-cols-2 border-b-1 ">
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
    </>
  );
};

export default Settings;

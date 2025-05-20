import React from "react";

const ProfileInput = ({
  title,
  id,
  name,
  placeholder,
  defaultValue,
  isEditProfileOpen = false,
  setUpdatedProfileData,
  updatedProfileData,
}: {
  title: string;
  id: string;
  name: string;
  placeholder?: string;
  defaultValue: string;
  isEditProfileOpen: boolean;
  setUpdatedProfileData: any;
  updatedProfileData: any;
}) => {
  return (
    <div className="">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="name"
      >
        {title}
      </label>
      <input
        onChange={(e) =>
          setUpdatedProfileData({
            ...updatedProfileData,
            [name]: e.target.value,
          })
        }
        type="text"
        className="w-full mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={name === "email" || !isEditProfileOpen}
      ></input>
    </div>
  );
};

export default ProfileInput;

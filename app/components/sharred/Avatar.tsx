"use client";

import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import { RootState } from "@/app/redux/store";
import avatarImg from "@/public/images/avatar.jpg";

const Avatar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Image
      alt=""
      className=" rounded-full"
      height={30}
      referrerPolicy="no-referrer"
      src={avatarImg}
      width={30}
    />
  );
};

export default Avatar;

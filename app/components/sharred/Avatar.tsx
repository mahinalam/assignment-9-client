"use client";

import React from "react";
import avatarImg from "@/public/images/avatar.jpg";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Image from "next/image";

const Avatar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Image
      src={avatarImg}
      alt=""
      referrerPolicy="no-referrer"
      className=" rounded-full"
      height={30}
      width={30}
    />
  );
};

export default Avatar;

"use client";

import React from "react";
import Image from "next/image";

import avatarImg from "@/public/images/avatar.jpg";

const Avatar = () => {
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

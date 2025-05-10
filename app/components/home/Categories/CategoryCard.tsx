import React from "react";

import { ICategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const { id, imageUrl, name } = category;
  console.log("image ur", imageUrl);

  return (
    <div className=" flex flex-col justify-center items-center  rounded-lg bg-white hover:shadow- transition-all duration-300 ease-in-out">
      <div className="md:h-[100px] h-[80px] w-auto">
        <img
          alt={name}
          className="w-full h-full object-cover rounded-md"
          src={imageUrl}
        />
      </div>
      {/* <div className="w-full">
        <Image
          alt="ff"
          height={100}
          src={imageUrl}
          width={100}
          className="w-full"
        />
      </div> */}
      <div>
        <p className=" md:text-[14px] text-[12px] text-center">{name}</p>
      </div>
    </div>
  );
};

export default CategoryCard;

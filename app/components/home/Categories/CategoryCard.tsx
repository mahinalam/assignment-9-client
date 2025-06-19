import React from "react";

import { ICategory } from "@/types";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const { id, imageUrl, name } = category;

  console.log("image ur", imageUrl);

  return (
    <div className="lg:p-0 flex flex-col justify-center items-center  rounded-lg bg-white hover:shadow- transition-all duration-300 ease-in-out">
      <div className="size-[150px] ">
        <img
          alt={name}
          className="w-full h-full object-cover rounded-md"
          src={imageUrl}
        />
      </div>
      <div>
        <p className="pb-3 md:text-[14px] text-[12px] text-center">{name}</p>
      </div>
    </div>
  );
};

export default CategoryCard;

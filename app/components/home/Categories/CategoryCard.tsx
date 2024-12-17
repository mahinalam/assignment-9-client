// import React from "react";
// import { ICategory } from "@/types";

// const CategoryCard = ({ category }: { category: ICategory }) => {
//   const { id, image, name } = category;

//   return (
//     <div className=" border-r flex flex-col justify-center items-center">
//       <div className="md:h-[100px] h-[80px]">
//         <img src={image} alt="" className="w-full h-full object-cover" />
//       </div>
//       <div>
//         <p className="mt-5 md:text-[14px] text-[12px]">{name}</p>
//       </div>
//     </div>
//   );
// };

// export default CategoryCard;

import React from "react";

import { ICategory } from "@/types";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const { id, image, name } = category;

  return (
    <div className="border-r flex flex-col justify-center items-center p-3 rounded-lg bg-white hover:shadow- transition-all duration-300 ease-in-out">
      <div className="md:h-[100px] h-[80px] w-auto">
        <img
          alt={name}
          className="w-full h-full object-cover rounded-md"
          src={image}
        />
      </div>
      <div>
        <p className="mt-5 md:text-[14px] text-[12px] text-center">{name}</p>
      </div>
    </div>
  );
};

export default CategoryCard;

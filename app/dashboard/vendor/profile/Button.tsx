import React from "react";

const Button = ({ title, isActive }: { title: string; isActive: boolean }) => {
  return (
    <div>
      <button
        className={`${isActive ? "bg-gray-200 !text-black" : " text-gray-700"}  hover:text-black hover:font-medium'
         text-xs border border-[#dbe2f0] px-3 py-2 rounded-full`}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;

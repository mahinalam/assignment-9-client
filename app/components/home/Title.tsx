import React from "react";

const Title = ({ title }: { title: any }) => {
  return (
    <div>
      <h1 className="lg:text-2xl text-xl  lg:font-medium font-bold md:leading-[38px] leading-[30px]">
        {title}
      </h1>
    </div>
  );
};

export default Title;

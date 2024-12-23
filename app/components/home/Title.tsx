import React from "react";

const Title = ({ title }: { title: any }) => {
  return (
    <div>
      <h1 className="md:text-2xl sm:text-xl text-lg md:leading-[38px] leading-[30px]">
        {title}
      </h1>
    </div>
  );
};

export default Title;

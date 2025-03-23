"use client";

import { Checkbox } from "@nextui-org/react";

const CheckBox = ({ title }: { title: string }) => {
  return (
    <div className="">
      <Checkbox
        defaultSelected
        className="bg-transparent"
        color="danger"
        size="sm"
      >
        <span className="ml-2 text-[13px] text-[#757575]">{title}</span>
      </Checkbox>
    </div>
  );
};

export default CheckBox;

"use client";
import { Checkbox } from "@nextui-org/react";
import React from "react";

const CheckboxComponent = ({
  title,
  id,
  handleChecked,
}: {
  title: string;
  id: number;
  handleChecked: any;
}) => {
  console.log("from"), title;

  return (
    <div>
      <Checkbox size="sm" onClick={() => handleChecked(id)}>
        <span className="ml-3 text-[13px] text-[#757575]">{title}</span>
      </Checkbox>
    </div>
  );
};

export default CheckboxComponent;

import React from "react";
import { Link } from "@nextui-org/link";

import Button from "./Button";
const EmptyState = ({
  message,
  address,
  label,
}: {
  message: string;
  address: string;
  label: string;
}) => {
  return (
    <div className="h-screen gap-5 flex flex-col justify-center items-center pb-16 ">
      <p className="text-gray-600 text-xl lg:text-3xl">{message}</p>
      <Link href={address}>
        <Button label={label} />
      </Link>
    </div>
  );
};

export default EmptyState;

import React from "react";
import { Link } from "@nextui-org/link";

import Button from "./Button";
const EmptyState = ({
  message,
  address = "",
  label,
  onClick,
}: {
  message: string;
  address?: string;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <div className="h-[70vh] gap-5 flex flex-col justify-center items-center pb-16 ">
      <p className="text-gray-600 text-xl lg:text-3xl">{message}</p>
      {!address ? (
        <span>
          <Button onClick={onClick} label={label} />
        </span>
      ) : (
        <Link href={address}>
          <Button onClick={onClick} label={label} />
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
